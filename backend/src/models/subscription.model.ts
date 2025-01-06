import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    stripeSubscriptionId: {
      type: String,
      required: false,
      default: "",
    },

    stripeCustomerId: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    status: {
      type: String,
      enum: ["active", "canceled", "incomplete", "past_due", "unpaid"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    currentCredit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
