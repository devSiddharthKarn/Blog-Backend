import { Router } from "express";
import {
  getAllUserHandler,
  FindUserById,
  SignUpUser,
  loginUser,
} from "../controller/user.controller.js";
import { checkAuthMiddleware } from "../middleware/auth.middleware.js";

const userRoutes: Router = Router();

// this is just a comment to show the use of git ext
// perfix : /api/user
userRoutes.get("/getAllUser", getAllUserHandler);

userRoutes.get("/findUserById/:id", FindUserById);

userRoutes.post("/signup", SignUpUser);

// login me auth middleare k jrurat nai xai as auth middleware check kre xai user login xai ki nai and if we are going to login then how could we be already logged in
userRoutes.post("/login", loginUser);

export { userRoutes };
