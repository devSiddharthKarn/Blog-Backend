import express from "express";
import type { Request, Response } from "express";
import { connectDB } from "./db/db.js";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true, limit:"20kb"}))
app.use(cors());

const port = 4000;


await connectDB().catch((error)=>console.error(error))


app.get("/health", (req : Request, res :Response)=>{
    res.json({message : "Server is good"})
})


// user routes 
import { userRoutes } from "./routes/user.routes.js";
app.use("/api/user" , userRoutes)

import { postRoutes } from "./routes/post.routes.js";
app.use("/api/post",postRoutes);
app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${port}`)
})