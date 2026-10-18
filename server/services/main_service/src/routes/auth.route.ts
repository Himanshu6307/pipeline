import express from "express";
import { Login, Logout, sendOtp, SignUp, verifyOtp } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const authRouter = express.Router();

authRouter.post("/send-otp",sendOtp);
authRouter.post("/verify-otp",verifyOtp);
authRouter.post("/sign-up",SignUp);
authRouter.post("/login",Login);
authRouter.get("/logout",Logout);
authRouter.get("/get-curr-user",authMiddleware,getCurrentUser);

export default authRouter;
