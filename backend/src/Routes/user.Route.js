import express from "express"
import { signup,login,logout,checkauth } from "../Controllers/user.Controller.js"
import { protectRoute } from "../middleware/middleWare.js"

export const Router = express.Router()

Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/logout",logout)
Router.get("/check",protectRoute,checkauth);


