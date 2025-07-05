import jwt from "jsonwebtoken";
import user from "../Models/user.Model.js";

export const genrateToken = async (userid, res) => {
  const token = jwt.sign({ userid },"hellllo", {
    expiresIn: "7d",
  });
 res.cookie("token", token, {
  httpOnly: true,
  secure: false, // true for production
  sameSite: "Lax", // or "None" + secure: true
});

  return token;
};
