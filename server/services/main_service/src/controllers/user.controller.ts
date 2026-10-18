import { Request, Response } from "express"
import { AppError } from "../middlewares/error.middleware.js";
import User from "../models/user.model.js";
import { getRedisClient } from "../config/redis.config.js";
import { IResponse } from "../utils/response.util.js";

export const getCurrentUser = async (req: Request, res: Response) => {

    try {1

        if (!req.user) {
            throw new AppError("User not Authenticated", 400);
        }

        const { email, id } = req.user;

        const key = `curruser-${id}`;

        const client = getRedisClient();

        const currUser = await client.get(key);


        if (currUser != null) {
            res.status(200).json({
                success: true,
                message: "User Find Successfully",
                result: JSON.parse(currUser)
            } satisfies IResponse<typeof currUser>)
        }

        const dbCurrUser = await User.findById(id);

        if (!dbCurrUser) {
            throw new AppError("User Not Find", 400);
        }

        await client.set(key, JSON.stringify(dbCurrUser));

        res.status(200).json({
            success: true,
            message: "User Find Successfully",
            result: dbCurrUser
        } satisfies IResponse<typeof dbCurrUser>)


    } catch (error) {

        console.log("Error From Send Otp", error)
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new AppError(
                error instanceof Error ? error.message : "Internal Server Error",
                500
            );
        }
    }
}

