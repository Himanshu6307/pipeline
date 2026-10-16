import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "../../../shared/config/db.config.js"
import { connectRedis } from "./config/redis.config.js";
dotenv.config();

const app = express();

app.use(cors({

}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

const PORT = Number(process.env.PORT) || 8000;

(async()=>{

    try {
        await connectRedis()
        await connectDB();
    
    
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    } catch (error) {
        console.log("internal server error ",error)
    }
})()
