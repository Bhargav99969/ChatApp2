import jwt from "jsonwebtoken";
import user from "../Models/user.Model.js";

export const protectRoute = async (req, res,next) => {
  
  try {
     const token = req.cookies.token;
    //  console.log(token)
  if (!token) return res.status(401).json({ message: "Invalid token 1" });

  const decode = jwt.verify(token,"hellllo");
  // console.log("docode",decode)S
  if (!decode) return res.status(401).json({ message: "Invalid token 2" });

  const oldUser = await user.findById(decode.userid).select("-password");
  // console.log("olduser",oldUser)
  if (!oldUser) return res.status(401).json({ message: "Invalid token 3", });

  req.user = oldUser;
  next();
  } catch (error) {
    console.log("object",error)
  }
 
};
