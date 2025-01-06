import mongoose from "mongoose";
import app from "./app";
import planUtils from "./utils/plan.utils";

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    await planUtils.planSeed();
    console.log("Connection Created to Mongodb");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();
