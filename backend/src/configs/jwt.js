import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const genrateToken = async (userid, res) => {
  const token = jwt.sign({ userid },process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  console.log("45")
 res.cookie("token", token, {
  httpOnly: true,
  secure: true, // true for production
  sameSite: "None", // or "None" + secure: true
});

  return token;
};
