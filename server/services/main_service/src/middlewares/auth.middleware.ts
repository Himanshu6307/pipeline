import { NextFunction, Request, Response } from "express";
import { AppError } from "./error.middleware.js";
import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new AppError("User Not Authenticated", 400);
        }

        const decryptToken = jwt.verify(token, process.env.JWT_SECRET as string)

        if (!decryptToken) {
            throw new AppError("User Not Authenticated", 400);
        }


        req.user = decryptToken as JwtPayload;

        next();


    } catch (error) {
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