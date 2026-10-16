import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
    const MONGO_URL = process.env.MONGO_URL;

    if (!MONGO_URL) {
        throw new Error("MONGO_URL is missing in .env file");
    }

    try {
        const connection = await mongoose.connect(MONGO_URL);

        console.log(
            `MongoDB connected successfully: ${connection.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};

export default connectDB;