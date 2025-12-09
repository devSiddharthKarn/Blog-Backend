import mongoose, { Document } from "mongoose";
import { z } from "zod";

interface IUser extends Document {
    username: string;
    password: string;
    email: string;
}

// Zod schema for validation
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(255)
});

export const registerSchema = loginSchema.extend({
    username : z.string().min(3).max(255)
})

// Mongoose schema for database
const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255
    }
});

export const User = mongoose.model<IUser>("User", userSchema);