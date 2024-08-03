"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import socket from "@/app/utils/socket";

const ChatRoom = ({ username, room, joinData }) => {
  const router = useRouter();
  console.log(username);
  console.log(room);
  console.log(joinData);
  const [messages, setMessages] = useState([]);
  if (joinData && Object.keys(joinData)) {
    console.log(Object.keys(joinData));
  }

  useEffect(() => {
    if (joinData && Object.keys(joinData).length > 0) {
      setMessages([joinData]);
    }
    socket.on("message", (message, error) => {
      setMessages((msgs) => [...msgs, message]);
    });
    console.log(joinData);
    console.log(room);
    return () => {
      socket.off("message");
    };
  }, [joinData, room]);

  return (
    <div className="flex flex-col h-screen">
      {room}
      <div className="flex-grow overflow-y-auto">
        <p>Hello {room}</p>
        {messages &&
          messages?.map((message) => {
            const { user, text } = message;
            const sentByCurrentUser = username?.toLowerCase() === user;

            return (
              <div
                className={`flex items-center ${
                  sentByCurrentUser ? "justify-end" : "justify-start"
                } p-2`}
              >
                <div
                  className={`flex flex-col ${
                    sentByCurrentUser ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      sentByCurrentUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{user}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChatRoom;
