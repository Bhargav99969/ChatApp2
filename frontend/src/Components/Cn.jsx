import React from "react";
import { userStore } from "../store/userStore";
import { chatStore } from "../store/ChatStore";

function Cn({ user }) {
  const OnlineUsers = userStore((state) => state.onlineusers);
  const selectedUser = chatStore((state) => state.selectedUser);
  const setSelectedUser = chatStore((state) => state.setSelectedUser);

  console.log(OnlineUsers,"cn")

  const isOnline = OnlineUsers.includes(user._id);
  const isSelected = selectedUser?._id === user._id;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all ${
        isSelected ? "bg-blue-100" : "hover:bg-gray-100"
      }`}
      onClick={() => setSelectedUser(user)}
    >
      {/* Profile Picture or Placeholder */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
          {user.name[0].toUpperCase()}
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>

      {/* User Info */}
      <div>
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}

export default Cn;
