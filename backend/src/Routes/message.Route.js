import express from "express"
import { protectRoute } from "../middleware/middleWare.js";
import { getUsers,sendMessages,getMessages } from "../Controllers/message.Controller.js";

export const Router2 = express.Router();

Router2.get("/user",protectRoute,getUsers)
Router2.get("/:id",protectRoute,getMessages);
Router2.post("/send/:id",protectRoute,sendMessages);