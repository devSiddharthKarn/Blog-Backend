import { Router } from "express";
import { getAllUserHandler,FindUserById, SignUpUser, loginUser } from "../controller/user.controller.js";
import { checkAuthMiddleware } from "../middleware/auth.middleware.js";

const userRoutes:Router = Router();

// this is just a comment to show the use of git ext
// perfix : /api/user
userRoutes.get("/getAllUser", getAllUserHandler)

userRoutes.get("/findUserById/:id",FindUserById);

userRoutes.post("/signup",SignUpUser);

userRoutes.post("/login",checkAuthMiddleware,loginUser);



export {userRoutes};