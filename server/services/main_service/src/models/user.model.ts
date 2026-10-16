import mongoose, { Document } from "mongoose";

console.log("DB mongoose path:", import.meta.resolve("mongoose"));
console.log("DB mongoose instance:", mongoose.version);

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
