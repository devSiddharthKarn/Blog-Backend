import type { Request, Response } from "express";
import { z } from "zod";
import {
  loginSchema,
  registerSchema,
  type IUser,
} from "../models/user.model.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../token/generatetoken.js";
const getAllUserHandler = async (req: Request, res: Response) => {
  return res.json({
    message: "All user served",
  });
};

const FindUserById = async (req: Request, res: Response) => {
  return res.json({
    message: "user with id served",
  });
  //tst
};

const SignUpUser = async (req: Request, res: Response) => {
  const registerData = registerSchema.safeParse(req.body);

  if (!registerData.success) {
    return res.status(400).json({
      status: false,
      message: "Please provide valid data",
    });
  }

  const { username, email, password } = registerData.data;
  if ([username, email, password].some((value) => value.trim() === "")) {
    return res.status(404).json({ message: "Please enter all fields" });
  }

  const aleradyExistingUser = await User.find({
    $or: [{ username }, { email }],
  });

  if (aleradyExistingUser.length > 0) {
    return res.status(300).json({
      status: false,
      message: "User from such email already exists",
    });
  }

  const createdUser = await User.create({
    username: username,
    email: email,
    password: password,
  });
  if (!createdUser) {
    return res.json({ message: "Failed to create Post" });
  }

  const { accessToken } = await generateAccessToken(createdUser);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    status: true,
    createdUser,
    message: "User successfully signed in",
  });
};

const loginUser = async (req: Request, res: Response) => {
  const loginData = loginSchema.safeParse(req.body);
  if (!loginData.success) {
    return res.json({
      status: false,
      message: "please provide valid data for login",
    });
  }
  const { password, email } = loginData.data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new Error("Incorrect Password");
  }
  const { accessToken } = await generateAccessToken(user as IUser);
  const { refreshToken } = await generateRefreshToken(user as IUser);

  // Save refreshToken to database
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // added some options for cookie security, to make sure ki frontend sa cookies change nai hos,
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "User Login Successful" });
};
export { getAllUserHandler, FindUserById, SignUpUser, loginUser };
