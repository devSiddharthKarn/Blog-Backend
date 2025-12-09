import type { Request, Response } from "express"


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

export {getAllUserHandler,FindUserById}