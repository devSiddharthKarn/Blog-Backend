import express, { Router } from "express";
import uploadPost from "../controller/post.controller.js";

const postRoutes:Router = express.Router();

postRoutes.post("/upload",uploadPost);

export {postRoutes};