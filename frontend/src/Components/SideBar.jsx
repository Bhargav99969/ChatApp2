import React, { useEffect, useState } from 'react';
import { chatStore } from '../store/ChatStore';
import { userStore } from '../store/userStore';
import { useStore } from 'zustand';

function SideBar() {
  const getUsers = chatStore((state) => state.getuser);
  const users = chatStore((state) => state.user);
  const selectedUser = chatStore((state) => state.selectedUser);
  const setSelectedUser = chatStore((state) => state.setSelectedUser);
  const isUsersLoading = chatStore((state) => state.isUsersLoading);
  const rawOnlineUsers = userStore((state) => state.onlineusers);
  const authUser = userStore((state) => state.user);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  // Ensure online users is always an array
  const onlineUsers = Array.isArray(rawOnlineUsers)
    ? rawOnlineUsers
    : Object.keys(rawOnlineUsers || {});

  useEffect(() => {
    getUsers();
    
  }, []);

  const safeUsers = Array.isArray(users)
    ? users.filter((user) => user._id !== authUser?._id)
    : [];

  const filteredUsers = showOnlineOnly
    ? safeUsers.filter((user) => onlineUsers.includes(user._id))
    : safeUsers;

  return (
    <div className="relative w-[250px] h-[95vh] bg-white border-r border-gray-200 p-4 overflow-y-auto z-10">
      {/* Background doodle */}
      <img
        src="/2.jpg"
        alt="doodle"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-5 pointer-events-none z-0"
      />
      {/* Foreground content */}
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
          <button
            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            className="text-sm text-blue-500 hover:underline"
          >
            {showOnlineOnly ? 'Show All' : 'Show Online'}
          </button>
        </div>

        {isUsersLoading ? (
          <div className="text-gray-500 text-sm text-center mt-10">
            Loading users...
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 ${
                  selectedUser?._id === user._id ? 'bg-gray-200' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={
                      user.Profilepic ||
                      `https://ui-avatars.com/api/?name=${user.name}`
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
    </div>
  );
}

export default SideBar;
