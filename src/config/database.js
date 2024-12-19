import mongoose from "mongoose";
import init from "./genData.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/final");
    console.log("Connect to database successfully !");
    // init();
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
