import { createClient } from "redis";
import { AppError } from "../middlewares/error.middleware.js";

const REDIS_URL = process.env.REDIS_URL;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

if (!REDIS_URL) {
    throw new AppError("REDIS_URL is missing in .env", 500);
}

const client = createClient({
    url: REDIS_URL,
    ...(REDIS_PASSWORD ? { password: REDIS_PASSWORD } : {})
});

// Redis errors
client.on("error", (err: Error) => {
    console.error("Redis connection error:", err.message);
});

client.on("connect", () => {
    console.log("Connecting to Redis...");
});

client.on("ready", () => {
    console.log("Redis is ready to use");
});

client.on("reconnecting", () => {
    console.log("Redis reconnecting...");
});

client.on("end", () => {
    console.log("Redis connection closed");
});

// Connect to Redis
export const connectRedis = async (): Promise<void> => {
    try {
        if (!client.isOpen) {
            await client.connect();
        }
    } catch (error) {
        console.error("Failed to connect Redis:", error);

        throw new AppError("Failed to connect to Redis", 500);
    }
};

export const getRedisClient = () => {
    if (!client.isReady) {
        throw new AppError("Redis client is not ready", 503);
    }

    return client;
};