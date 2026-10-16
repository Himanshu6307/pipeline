import type { Request, Response } from "express";
import User from "../models/user.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { generateOtp } from "../utils/generateOtp.util.js";
import { getRedisClient } from "../config/redis.config.js";
import { sendMail } from "../utils/mail.util.js";
import { IResponse } from "../utils/response.util.js";

interface ISendOtp {
    email:string
}

export const sendOtp = async(req:Request,res:Response)=>{
  try {
    const {email}:ISendOtp = req.body; 

    const existUser = await User.findOne({email});
    if(existUser){
        return new AppError("User Already Exist",400);
    }

    const otp = generateOtp() 
    const client  = getRedisClient();
    const key = `otp-${email}`;
    await client.set(key,otp,{EX:80});

    await sendMail({email,otp});

    res.status(200).json({
       success:true,
       message:"otp sent successfully" 
    }satisfies IResponse<void>)


  } catch (error) {
    console.log("Error fron send otp", error)
        if (error instanceof Error) {
            return new AppError(error.message, 500)
        } else {
            return new AppError("Internal Server Error", 500)
        }
  }
}