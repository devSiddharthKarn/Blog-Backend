import type { NextFunction } from "express";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import { z } from "zod";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  refreshToken: string;

  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
}

// Zod schema for validation
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(255),
});

export const registerSchema = loginSchema.extend({
  username: z.string().min(3).max(255),
});

// Mongoose schema for database
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  refreshToken: {
    type: String,
  },
});

// index is necessary taki when db me search kara prtai ta halka fast hetai searching , as index pta rahtai ta jaldi search hetai instead of ki pura db me search krtai for username or email
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
