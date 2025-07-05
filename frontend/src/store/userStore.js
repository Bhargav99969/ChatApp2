import { create } from "zustand";
import { axiosInstance } from "../configs/axios";

import toast from "react-hot-toast";
import { io } from "socket.io-client";



export const userStore=create((set,get)=>({
    user:null,
    isLogged:false,
    isSigned:false,
    isChecking:true,
    onlineusers:[],
    socket:null,

checkauth:async()=>{
    try {
        const res=await axiosInstance.get("/auth/check");
        set({user:res.data})
        get().connectsocket();
    } catch (error) {
        console.log("error in checking user")
         set({user:null})
    }finally{
        set({ isChecking: false });
    }
},

signup:async(data)=>{
      set({ isSigned: true });
      try {
        const res=await axiosInstance.post("/auth/signup",data);
        set({ user: res.data });
         get().connectsocket();
         toast.success("Accoutn created succsefully");
      } catch (error) {
        console.log("error in signup")
        toast.error("error");
      }finally{
          set({ isSigned: false });
      }
},
login:async(data)=>{
    set({ isLogged: true });
    try {
        const res= await axiosInstance.post("/auth/login",data)
        set({user:res.data})
        toast.success("Welcome Back");
        get().connectsocket();
    } catch (error) {
          toast.error("error");
    }finally{
         set({ isLogged: false });
    }
},
logout: async()=>{
    try {
        await axiosInstance.post("/auth/logout")
        set({ user: null });
        toast.success("Logout Succefully");
    } catch (error) {
        console.log("error in logout")
        
    }
},
connectsocket:async()=>{
    const {user}=get();
    if(!user || !user._id || get().socket?.connected) return;

    const newSocket = io("http://localhost:3000",{
        query:{
            userId:user?._id,
           
        },
         withCredentials: true 
    });
    set({socket:newSocket})

    newSocket.on("X",(userIds)=>{
        set({onlineusers:userIds})
        
    })
    
  console.log("User connected to socket");

},


disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
    console.log("userDisconeected");
  },
}));

