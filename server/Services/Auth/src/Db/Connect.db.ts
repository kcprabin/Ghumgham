import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}` as string);
        console.log("MongoDB connected successfully", response.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;