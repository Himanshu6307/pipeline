import type { Request, Response } from "express";
import User from "../models/user.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { generateOtp } from "../utils/generateOtp.util.js";
import { getRedisClient } from "../config/redis.config.js";
import { sendMail } from "../utils/mail.util.js";
import { IResponse } from "../utils/response.util.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface ISendOtp {
    email: string
}
interface IVerifyOtp {
    email: string,
    otp: string
}
interface ILogin {
    email: string,
    password: string,
    username: string
}

export const sendOtp = async (req: Request, res: Response) => {

    try {
        const { email }: ISendOtp = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            throw new AppError("User Already Exist", 400);
        }

        const otp = generateOtp()
        const client = getRedisClient();
        const key = `otp-${email}`;
        await client.set(key, otp, { EX: 300 });

        await sendMail({ email, otp });

        res.status(200).json({
            success: true,
            message: "Otp Sent Successfully"
        } satisfies IResponse<void>)


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


export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { otp, email }: IVerifyOtp = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            throw new AppError("User Already Exist", 400);
        }

        const client = getRedisClient();
        const key = `otp-${email}`;
        const savedOtp = await client.get(key);

        if (!savedOtp) {
            throw new AppError("Otp Expired", 400);
        }

        if (savedOtp !== otp) {
            throw new AppError("Wrong Otp", 400);
        }

        await client.del(key);

        res.status(200).json({
            success: true,
            message: "Email Verified Successfully"
        } satisfies IResponse<void>)

    } catch (error) {
        console.log("Error From Verify Otp", error)
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


export const SignUp = async (req: Request, res: Response) => {

    try {
        const { email, password, username }: ILogin = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            throw new AppError("User Already Exist", 400);
        }

        const hashPassword = bcrypt.hashSync(password, 10)

        const user = await User.create({
            email,
            password: hashPassword,
            username
        })

        if (!user) {
            throw new AppError("User Not Created", 400);
        }

        const tokenData = { email, id: user._id };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        }).status(201).json({
            success: true,
            message: "User Created Successfully"
        } satisfies IResponse<void>)

    } catch (error) {
        console.log("Error From Login", error)
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
