import mongoose from "mongoose";
import "dotenv/config";


async function connectDB(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDB COnnection SUcccessfullllll")
        // console.log("The connection link is : ",connectionLink);
    } catch (error) {
        console.error("MongoDB COnnection Error : ",  error)
    }
}

export {connectDB}