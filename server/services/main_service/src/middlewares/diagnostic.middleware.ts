import { NextFunction, Request, Response } from "express";

export const diagnostic = (req:Request, res:Response, next:NextFunction) => {
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    next();
}