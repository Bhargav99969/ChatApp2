
import React, { useEffect, useRef } from "react";
import { chatStore } from "../store/ChatStore";
import { userStore } from "../store/userStore";
import MessageInput from "./MessageInput";

function ChatContainer() {
  const Messages = chatStore((state) => state.Messages);
  const selectedUser = chatStore((state) => state.selectedUser);
  const getMessages = chatStore((state) => state.getMessages);
  const isMessagesLoading = chatStore((state) => state.isMessagesLoading);
  const authUser = userStore((state) => state.user);
  const subscribeToMessages = chatStore((state) => state.subbscribeTomessage);
  const unsubscribe = chatStore((state) => state.unsubscribe);
  const msgRef = useRef(null);

useEffect(() => {
  if (selectedUser && authUser) {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribe();
  }
}, [selectedUser, authUser]);


  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [Messages]);

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img
          src="/2.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-5 z-0"
        />
        <h2 className="text-xl text-gray-600 z-10">No user selected.</h2>
      </div>
    );
  }

  return (
    <div className="h-[100vh] flex flex-col relative w-full">
      {/* Background */}
      <img
        src="/2.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-5 -z-10"
      />

      {/* Messages */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4">
        {Messages?.map((msg, idx) => {
          if (!msg || !msg.senderId || !msg.text) return null;

          const isMe = msg.senderId === authUser._id;

          return (
            <div
              key={idx}
              className={`max-w-[50%]  p-2 rounded-lg my-2 text-black break-words whitespace-pre-wrap ${
                isMe ? "bg-blue-300 self-end ml-auto text-right" : "bg-gray-200 mr-auto self-start text-left"
              }`}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={msgRef}></div>
      </div>

      {/* Input */}
      <div className="p-4  pb-15 border-t bg-white sticky bottom-0">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;
