import jwt from "jsonwebtoken"
import type { Request, Response,NextFunction } from "express"

const checkAuthMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers.authorization;

    if(!header || !header.startsWith("Bearer ")){
        return  res.status(401).json({
            message:"No token exists"
        });
    }

    const token = header.split(" ")[1];

    try{
        const decoded = jwt.verify(token!,process.env.ACCESS_TOKEN_SECRET!);
        if(decoded){
            next();
        }else{
            return res.json({
                message:"token not matched"
            })
        }
    }catch(error){
        return res.json({
            message:"Invalid token"
        })
    }
}


export {checkAuthMiddleware};