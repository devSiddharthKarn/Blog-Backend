import jwt from "jsonwebtoken";
import type { IUser } from "../models/user.model.js";

// made functions async kathila ki they make access and refresh tokens with jwt.sign and jwt.sign might take some time to create token , so wait kara pair ske xai
async function generateAccessToken(user: IUser): Promise<object> {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessSecret) {
    throw new Error("ACCESS_TOKEN_SECRET IS NOT VALID");
  }
  const accessToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    accessSecret,
    {
      expiresIn: "1h",
    }
  );

  return { accessToken };
}

// Refresh tokens also generate krwau badme kaam aetai while rotating the refresh token when acessToken expires
async function generateRefreshToken(user: IUser): Promise<object> {
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshSecret) {
    throw new Error("REFRESH_TOKEN_SECRET is not valid");
  }
  const refreshToken = jwt.sign({ _id: user._id }, refreshSecret, {
    expiresIn: "1d",
  });
  return { refreshToken };
}

export { generateAccessToken, generateRefreshToken };
