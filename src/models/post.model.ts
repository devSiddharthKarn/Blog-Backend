import mongoose, { Document } from "mongoose";
import {z} from "zod"
export interface IPost extends Document{
    title:string,
    subtitle?:string,
    content:string,
    imageurl?:string,
    ownerId : mongoose.Types.ObjectId
}; 

export const ZodPost = z.object({
    title:z.string().max(255),
    subtitle:z.string().max(255).optional(),
    content:z.string(),
    imageurl:z.string().optional(),
});

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true,
    },
    subtitle:{
        type:String
    },
    content:{
        type:String,
        required:true,
    },
    imageurl:{
        type:String  ,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Post = mongoose.model<IPost>("Post",postSchema)

export default Post;