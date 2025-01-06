"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeBox from "./StripeBox";
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const PlanPurchaseModal = ({ planId }: { planId: string }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeBox planId={planId} />
    </Elements>
  );
};

export default PlanPurchaseModal;
