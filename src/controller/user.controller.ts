import type { Request, Response } from "express"
import { z } from "zod"
import { loginSchema, registerSchema } from "../models/user.model.js"
import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
const getAllUserHandler = async(req : Request, res : Response)=>{
    return res.json({
        message : "All user served"
    })
}

const FindUserById = async(req:Request,res:Response )=>{
    return res.json({
        message:"user with id served"
    })
}


const SignUpUser=async (req:Request,res:Response)=>{
    const result= registerSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            status:false,
            message:"Please provide valid data"
        })
    }

    const {username,email,password} = result.data;
    if([username, email,password].some((value)=> value.trim() ==="")){
        return res.status(404).json({message : "Please enter all fields"})
    }

    const users = await User.find({
        email:email
    });

    if(users.length>0){
        return res.status(300).json({
            status:false,
            message:"User from such email already exists"
        })
    }
    const saltingRound =await  bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password,saltingRound);

    const createdPost = await User.create({
        username:username,
        email:email,
        password:hashedPassword
    });
    if(!createdPost){
        return res.json({message : "Failed to create Post"})
    }

    return res.status(200).json({
        status:true,
        createdPost ,
        message:"User successfully signed in"
    })
    
}


const loginUser=async(req:Request,res:Response)=>{
    const success = loginSchema.safeParse(req.body);

    if(!success.success){
        return res.json({
            status:false,
            message:"please provide valid data for login"
        })
    }

    const {email,password} = req.body;

    const user =await User.findOne({email:email});

    const isEqual = await bcrypt.compare(password,user?.password?user.password:"");
    
    if(!isEqual){
        return res.status(300).json({
            status:false,
            message:"Password not matched"
        })
    }

    return res.json({
        status:true,
        message:"logged in success"
    })
    
}

export {getAllUserHandler,FindUserById,SignUpUser,loginUser}