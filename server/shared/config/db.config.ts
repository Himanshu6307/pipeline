import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {

    console.log("DB mongoose path:", import.meta.resolve("mongoose"));
console.log("DB mongoose instance:", mongoose.version);


    const MONGO_URL = process.env.MONGO_URL;

    if (!MONGO_URL) {
        throw new Error("MONGO_URL is missing in .env file");
    }

    try {
        const connection = await mongoose.connect(MONGO_URL);

        console.log("MongoDB connected:", connection.connection.readyState);

        console.log("Database name:", connection.connection.name);

        console.log("Host:", connection.connection.host);

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};

export default connectDB;