import express from "express";
import cookieParser from "cookie-parser";
import dotenv, { config } from "dotenv";
import { connectDb } from "./configs/db.connect.js";
import { server, app } from "./configs/Socket.js";
import {Router} from "./Routes/user.Route.js";
import{ Router2 }from "./Routes/message.Route.js";
import cors from "cors"

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: ["http://localhost:5173","https://chatapp2-ca9y.onrender.com"],
    credentials:true
  }
))

const port = 3000

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", Router);
app.use("/api/message", Router2);

server.listen(port, () => {
  console.log(`listening on ${port}`);

  connectDb();
});
