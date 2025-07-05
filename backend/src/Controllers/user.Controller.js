import { mongo } from "mongoose";
import user from "../Models/user.Model.js";
import bcrypt from "bcrypt";
import { genrateToken } from "../configs/jwt.js";

export const signup = async (req, res) => {
  const { name, email, password, confirm, } = req.body;
  try {
    if (password.length < 4) {
      return res
        .status(401)
        .json({ message: "password must be atleast 4 char" });
    }
    if (password !== confirm) {
      return res.status(401).json({ message: "password doesnot match" });
    }
   
   const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new user({
      name,
      password: hashpassword,
      email,
    });

   if (newUser) {
  await newUser.save();

  await genrateToken(newUser._id, res);

  return res.status(201).json({ message: "User created" });
}
  } catch (error) {
    res.status(401).json({ message: "error in singup" });
    console.log("error in singup", error);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser =await user.findOne({ email });
    if (!oldUser) return res.status(401).json({ message: "user is not there" });

    const pass = await bcrypt.compare(password, oldUser.password);

    if (!pass) return res.status(401).json({ message: "invalid password" });

    genrateToken(oldUser._id, res);

    res.status(200).json({
      _id: oldUser._id,
      name: oldUser.name,
      email: oldUser.email,
      Profilepic: oldUser.Profilepic,
      message: "Logout route",
    });
  } catch (error) {
    console.log("error in login", error);
  }
};
export const logout = (req,res) => {
  try {
   res.cookie("token", "", {
  maxAge: 0,
  httpOnly: true,
  sameSite: "Lax",
  secure: false,
  path: "/",
});

    console.log("hellllo")
    res.status(200).json({ message: "Logout succesfully" });
  } catch (e) {
    res.status(400).json({ message: "Logout unsuccesfull" });
    console.log(e);
  }
};

export const checkauth = (req, res) => {
  try {
    
    res.status(200).json(req.user);
  } catch (e) {
    res.status(400).json({ message: "Not Authenticated" });
    console.log(e);
  }
};
