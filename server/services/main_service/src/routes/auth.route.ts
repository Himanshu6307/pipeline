import express from "express";
import { sendOtp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/send-otp",sendOtp);

export default authRouter;
