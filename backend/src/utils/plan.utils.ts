import Plan from "../models/plan.model";

const planSeed = async () => {
  const isExist = await Plan.findOne({ price: 0 });

  if (!isExist) {
    const plan = await Plan.create({
      name: "Free Trial",
      description: "",
      duration: 1, // 1 month
      credit: 5,
      price: 0,
    });
    return plan;
  }

  return isExist;
};

const planUtils = {
  planSeed,
};

export default planUtils;
