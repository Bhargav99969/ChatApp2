import React from 'react';

function NoChatSelected() {
  return (
    <div className="relative w-full h-full">
      {/* Background image */}
      <img
        src="/2.jpg"
        alt="Doodle background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-5 z-0"
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          {/* <img
            src="/3.jpg"
            alt="No Chat"
            className="w-48 mx-auto mb-6"
          /> */}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          No Chat Selected
        </h2>
        <p className="text-gray-500 mt-2">
          Select a user from the sidebar to start a conversation.
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
