import { Router } from "express";
import subscriptionController from "../controllers/subscription.controller";
import { isAuthenticatedUser } from "../middlewares/auth";
const router = Router();
router.post(
  "/create",
  isAuthenticatedUser,
  subscriptionController.createSubscription
);

router.patch(
  "/update",
  isAuthenticatedUser,

  subscriptionController.updateSubscription
);

router.get(
  "/cancel",
  isAuthenticatedUser,
  subscriptionController.subscriptionPaymentCancel
);
router.get("/confirm", subscriptionController.confirmSubscription);
router.get("/cancel", subscriptionController.subscriptionPaymentCancel);
const subscriptionRoute = router;
export default subscriptionRoute;
