import express from "express";
import { Login, Logout, sendOtp, SignUp, verifyOtp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/send-otp",sendOtp);
authRouter.post("/verify-otp",verifyOtp);
authRouter.post("/sign-up",SignUp);
authRouter.post("/login",Login);
authRouter.get("/logout",Logout);

export default authRouter;
