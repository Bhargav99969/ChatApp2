import { useState,useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Toaster } from "react-hot-toast";
import { userStore } from "./store/userStore";
import { Loader } from 'lucide-react'
import Chatcontainer from "./Components/Chatcontainer";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function App() {
  const user = userStore((state)=>state.user)
  const ischecking = userStore((state)=>state.ischecking)
  const checkAuth = userStore((state)=>state.checkauth)
  const login = userStore((state)=>state.login)
  
  console.log("home",user)

    useEffect(()=>{
    checkAuth();
  },[checkAuth])

  const logout = userStore((state)=>state.logout)

  
  if(ischecking && !user ) return (
    <div className='flex items-center justify-center h-screen bg-balck'>
       <Loader className='size-10 animate-spin'></Loader>
    </div>
   
  )

return (
    <>
    <div className="h-9 w-full justify-end flex mx-4 px-7 mt-1">
    <img src="/public/2.jpg" className="absolute w-full  h-full opacity-5 z-[-10]"></img>
      {/* <img src="/public/4.jpg"/> */}
      
       <button
      onClick={()=>logout()} >
        <img className="h-8"
        src="/public/5.webp"/>
      </button>:
     </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/chatBox" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/chatBox" />}
        />
        <Route
          path="/chatBox"
          element={user ? <Chatcontainer /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
