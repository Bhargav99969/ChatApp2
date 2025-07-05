import { getReciverSOcketId } from "../configs/Socket.js";
import Message from "../Models/message.Model.js";
import user from "../Models/user.Model.js";
import { io } from "../configs/Socket.js";

export const getUsers = async (req, res) => {
  try {
    console.log(req.user);
    const loggedInuser = req.user._id;

    console.log("1");
    const filteredUser = await user
      .find({ _id: { $ne: loggedInuser } })
      .select("-password");
    console.log(filteredUser);
    res.status(200).json( filteredUser );
  } catch (e) {
    res.status(500);
  }
};
export const getMessages = async (req, res) => {
  const userId = req.user._id;
  //give the id in params from whic user we want to chat
    const userToChat = req.params.id;

  try {
   const messages = await Message.find({
  $or: [
    { senderId: req.user._id, recieverId: req.params.id },
    { senderId: req.params.id, recieverId: req.user._id },
  ]
}).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting messages", error);
  }
};
export const sendMessages = async (req, res) => {
  const { text, image } = req.body;
  console.log(text)

  const recieverId = req.params.id; 
  const senderId = req.user._id;
  try {
    const newmessage = new Message({
      senderId,
      recieverId,
      text,
      image,
    });
    

    await newmessage.save();

    const reciverSocketId = getReciverSOcketId(recieverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("message", newmessage);
    }
  
    res.status(201).json(newmessage);
  } catch (error) {
    console.log("error in sending message",error.message);
     res.status(500).json({ message: "Internal Server Error" });
  }
};
