import { Server } from "socket.io";
import http from "http"
import express from "express"
import { Socket } from "dgram";

const app =express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
     origin: ["http://localhost:5173","https://chatapp2-ca9y.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
    },
});

 export const getReciverSOcketId=(userId)=>{
    return user_SocketId[userId]
 }


//Map
const user_SocketId={}
const socket_UserId={}

io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;
    console.log("User is connected",socket.id,"userId",userId)

    if(userId){
        user_SocketId[userId]=socket.id;
        socket_UserId[socket.id]=userId;
    }
    io.emit("X",Object.keys(user_SocketId));

    socket.on("message", (payload) => {
        console.log("Backend received message:", payload);
        });

    socket.on("disconnect",()=>{

        const userId=socket_UserId[socket.id];
        console.log("user is Disconnected",socket.id,"userId",userId);

        if(userId) {

            delete user_SocketId[userId];
            delete socket_UserId[userId];
        }
        io.emit("X",Object.keys(user_SocketId))
    })


});


export { io, app, server };

