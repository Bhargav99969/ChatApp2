import { Router } from "express";
import mongoose from "mongoose";

export const connectDb= async()=>{
    try {

        const connect=await mongoose.connect("mongodb://localhost:27017/chat");
        
    console.log("db Connected")
}
    catch (error) {
        console.log("DB not COnnected",error)
    }
}

