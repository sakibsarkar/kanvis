import { stripe } from "../app";
import AppError from "../errors/AppError";
import Authentication from "../models/auth.model";
import Plan from "../models/plan.model";
import Subscription from "../models/subscription.model";
import planUtils from "./plan.utils";

interface IProps {
  durationInMonths: number;
  createdAt: string;
}

export const isDurationOver = (payload: IProps): boolean => {
  const { createdAt, durationInMonths } = payload;
  const createdDate = new Date(createdAt);

  const expirationDate = new Date(createdDate);
  expirationDate.setMonth(expirationDate.getMonth() + durationInMonths);

  // Reset time to midnight for an accurate date comparison
  const resetTime = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

  const currentDate = resetTime(new Date());
  const adjustedExpirationDate = resetTime(expirationDate);

  return currentDate > adjustedExpirationDate;
};

// create a free trial subscription
export const createFreeTrial = async (customerId: string, userId: string) => {
  const userInfo = await Authentication.findById(userId);

  if (!userInfo) {
    throw new AppError(404, "User not found");
  }

  if (userInfo && userInfo.subscription) {
    return userInfo.subscription;
  }

  let plan = await Plan.findOne({
    price: 0,
  });

  if (!plan) {
    plan = await planUtils.planSeed();
  }

  const subscription = await Subscription.create({
    user: userId,
    plan: plan.id,
    stripeSubscriptionId: "",
    currentCredit: 5,
    isActive: true,
    startDate: new Date(),
    stripeCustomerId: customerId,
  });

  userInfo.subscription = subscription._id;

  await userInfo.save();

  return subscription._id;
};

export const isActiveSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Check the subscription status
  const status = subscription.status;

  return status === "active";
};

export const checkUserSubscription = async (currentSubscriptionId: string) => {
  const subscription = await Subscription.findById(currentSubscriptionId);

  if (!subscription) {
    throw new AppError(404, "Subscription not found");
  }

  if (!subscription.stripeSubscriptionId) {
    throw new AppError(400, "Subscription not valid");
  }
  const isActive = await isActiveSubscription(
    subscription.stripeSubscriptionId
  );
  if (!isActive) {
    throw new AppError(400, "Subscription not active");
  }

  return subscription;
};
