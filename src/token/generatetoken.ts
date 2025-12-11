import jwt from "jsonwebtoken";
import type { IUser } from "../models/user.model.js"; 

function generateAccessToken(user:IUser){
    const token = jwt.sign({
        username:user.username
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
        expiresIn:"1h"
    }
    )

    return token;
}

export {generateAccessToken};