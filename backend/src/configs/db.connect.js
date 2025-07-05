import { Router } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const connectDb= async()=>{
    try {

        const connect=await mongoose.connect(process.env.MONGO);
        
    console.log("db Connected")
}
    catch (error) {
        console.log("DB not COnnected",error)
    }
}

