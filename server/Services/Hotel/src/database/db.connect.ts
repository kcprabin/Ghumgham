import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const response =await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ghumgham");
    console.log("MongoDB connected successfully", response.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;