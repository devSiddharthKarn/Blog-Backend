import Post from "../models/post.model.js";
import type { Request,Response } from "express";
import { ZodPost } from "../models/post.model.js";
import type {IPost} from "../models/post.model.js"


const uploadPost = async (req:Request,res:Response)=>{
    const validation = ZodPost.safeParse(req.body);
    if(!validation.success){
        return res.json({
            status:false,
            message:"Error please fill the required details for post correctly"
        });
    }
    const postToBeMade = validation.data;

    const createdPost = await Post.insertMany(postToBeMade)
    if(!createdPost){
        return res.status(404).json({
            message : "Post not created"
        })
    }

    return res.json({
        status:true,
        message:"Post created",
        createdPost
    })

}

export default uploadPost;