import { Router } from "express";
import { getAllUserHandler,FindUserById } from "../controller/user.controller.js";

const userRoutes:Router = Router();


// perfix : /api/user
userRoutes.get("/getAllUser", getAllUserHandler)

userRoutes.get("/findUserById/:id",FindUserById);


export {userRoutes};