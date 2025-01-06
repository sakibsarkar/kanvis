import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import { join } from "path";
import { stripe } from "../app";
import config from "../config";
import AppError from "../errors/AppError";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import Authentication from "../models/auth.model";
import Plan from "../models/plan.model";
import Subscription from "../models/subscription.model";
import sendResponse from "../utils/sendResponse";
const createSubscription = catchAsyncError(async (req, res) => {
  const userId = req.user!.id;
  const planId = req.body.planId;
  const plan = await Plan.findById(planId);

  if (!plan) {
    throw new AppError(404, "Plan not found");
  }
  const productsList = await stripe.products.list({
    limit: 100,
  });

  const priceId = productsList.data.find(
    (product) => product.id === plan.stripepProductId
  );

  if (!priceId || !priceId?.default_price) {
    throw new AppError(404, "Plan not found");
  }

  const user = await Authentication.findOne({
    where: { id: userId },
  });

  if (!user || !user.stripeCustomerId) {
    throw new AppError(404, "User not found or Stripe customer ID is missing");
  }

  const ulrs = {
    success: config.SERVER_URL + "/api/v1/subscription/confirm",
    cancel: config.SERVER_URL + "/api/v1/subscription/cancel",
  };
  const newSubscription = await Subscription.create({
    data: {
      customDomain: "",
      status: "incomplete",
      user: userId,
      stripeSubscriptionId: "",
      stripeCustomerId: user.stripeCustomerId,
      plan: plan.id as string,
      startDate: new Date(),
      price: plan.price,
    },
  });
  const payloadData = {
    subscriptionId: newSubscription._id,
  };

  const token = jwt.sign(payloadData, config.JWT_ACCESS_SECRET as string, {
    expiresIn: "5m",
  });
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId.default_price as string,
        quantity: 1,
      },
    ],
    customer: user.stripeCustomerId,
    success_url: ulrs.success + `?sub_token=${token}`,
    cancel_url: ulrs.cancel + `?sub_token=${token}`,
  });

  sendResponse(res, {
    data: session.url,
    message: "Subscription created successfully",
    success: true,
    statusCode: 200,
  });
});

const updateSubscription = catchAsyncError(async (req, res) => {
  const user = req.user!;
  const planId = req.body.planId;
  const plan = await Plan.findById(planId);

  if (!plan) {
    throw new AppError(404, "Plan not found");
  }
  const productsList = await stripe.products.list({
    limit: 100,
  });

  const priceId = productsList.data.find(
    (product) => product.id === plan.stripepProductId
  );

  if (!priceId || !priceId?.default_price) {
    throw new AppError(404, "Plan not found");
  }
  const userInfo = await Authentication.findById({
    where: { id: user.id },
  });

  if (!userInfo) {
    throw new AppError(404, "User not found");
  }

  const subscription = await Subscription.findById(userInfo.subscription);

  if (!subscription) {
    throw new AppError(404, "Subscription not found");
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (subscription.price > 0) {
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription?.stripeSubscriptionId || ""
    );

    await stripe.subscriptions.update(subscription.stripeSubscriptionId || "", {
      items: [
        {
          id: stripeSubscription.items.data[0].id,
          price: priceId.default_price as string,
        },
      ],
      proration_behavior: "create_prorations",
    });
    await Subscription.findByIdAndUpdate(subscription._id, {
      plan: plan.id,
      price: plan.price,
      startDate: new Date(),
    });

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      data: subscription,
      message: "Subscription updated successfully",
    });
  } else {
    const ulrs = {
      success: config.SERVER_URL + "/api/v1/subscription/confirm",
      cancel: config.SERVER_URL + "/api/v1/subscription/cancel",
    };
    const updatedSubscriptionModel = await Subscription.create({
      status: "incomplete",
      user: user.id,
      stripeSubscriptionId: "",
      currentCredit: 0,
      stripeCustomerId: userInfo.stripeCustomerId as string,
      plan: plan.id as string,
      startDate: new Date(),
      price: plan.price,
    });
    const payloadData = {
      subscriptionId: updatedSubscriptionModel._id,
    };

    const token = jwt.sign(payloadData, config.JWT_ACCESS_SECRET as string, {
      expiresIn: "5m",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId.default_price as string,
          quantity: 1,
        },
      ],
      customer: userInfo.stripeCustomerId!,
      success_url: ulrs.success + `?sub_token=${token}`,
      cancel_url: ulrs.cancel + `?sub_token=${token}`,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      data: { redirect: true, sessionId: session.url },
      message: "Subscription created successfully",
    });
  }
});
const confirmSubscription = catchAsyncError(async (req, res) => {
  const token = req.query.sub_token;
  let decoded: undefined | { subscriptionId: string } = undefined;
  try {
    decoded = jwt.verify(
      token as string,
      config.JWT_ACCESS_SECRET as string
    ) as { subscriptionId: string };
  } catch {
    sendResponse(res, {
      data: null,
      success: false,
      message: "invalid payment info",
      statusCode: 400,
    });
  }

  if (!decoded) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "invalid payment info",
      statusCode: 400,
    });
  }

  const isExistSubscription = await Subscription.findById(
    decoded.subscriptionId as string
  );

  if (!isExistSubscription) {
    throw new AppError(404, "error");
  }

  const user = await Authentication.findById(isExistSubscription.user);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const subscriptionsInfo = await stripe.subscriptions.list({
    customer: user?.stripeCustomerId || "",
    status: "all",
    limit: 1,
  });

  if (subscriptionsInfo.data.length <= 0) {
    throw new AppError(404, "error");
  }

  // stripeSubscriptionId: subscriptionsInfo.data[0] || ""
  const subId = subscriptionsInfo.data[0].id || "N/A";

  await Subscription.findByIdAndUpdate(decoded.subscriptionId, {
    data: {
      status: "active",
      stripeSubscriptionId: subId,
    },
  });

  await Authentication.findByIdAndUpdate(user?._id, {
    where: { id: user?._id },
    data: {
      currentSubscriptionId: decoded.subscriptionId,
    },
  });

  const filePath = join(__dirname, "../templates/success.html");
  let file = readFileSync(filePath, "utf-8");
  file = file.replace("{{link}}", config.FRONTEND_BASE_URL!);
  res.send(file);
});

const subscriptionPaymentCancel = catchAsyncError(async (req, res) => {
  const token = req.query.sub_token;
  let decoded: undefined | { subscriptionId: string } = undefined;
  try {
    decoded = jwt.verify(
      token as string,
      config.JWT_ACCESS_SECRET as string
    ) as { subscriptionId: string };
  } catch {
    sendResponse(res, {
      data: null,
      success: false,
      message: "invalid payment info",
      statusCode: 400,
    });
  }

  if (!decoded) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "invalid payment info",
      statusCode: 400,
    });
  }

  await Subscription.findByIdAndDelete(decoded.subscriptionId);

  const filePath = join(__dirname, "../templates/error.html");
  let file = readFileSync(filePath, "utf-8");
  file = file.replace("{{link}}", config.FRONTEND_BASE_URL!);
  res.send(file);
});
const subscriptionController = {
  createSubscription,
  updateSubscription,
  confirmSubscription,
  subscriptionPaymentCancel,
};

export default subscriptionController;
