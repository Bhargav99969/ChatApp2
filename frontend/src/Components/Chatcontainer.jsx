import React from 'react';
import { chatStore } from '../store/ChatStore';
import SideBar from './SideBar';
import NoChatSelected from './NoChatSelected';
import ChatBox from './ChatBox';

function Chatcontainer() {
  const selectedUser = chatStore((state) => state.selectedUser);

  return (
    <div className="w-full h-screen bg-base-200 flex items-center justify-center px-4">
      {/* Container for sidebar and chat */}
      <div className="w-full  h-[100vh] bg-base-100 rounded-xl shadow-lg flex overflow-hidden">
        
        {/* Sidebar stays full height and aligned */}
        <div className="w-[250px] h-full border-r border-gray-300 overflow-y-auto">
          <SideBar />
        </div>

        {/* Chat area */}
        <div className="flex-1 h-full relative flex flex-col">
          {!selectedUser ? <NoChatSelected /> : <ChatBox />}
        </div>

      </div>
    </div>
  );
}

export default Chatcontainer;
