"use client";
import React, { useState } from "react";
import socket from "../utils/socket";
import { useRouter } from "next/navigation";
import ChatRoom from "../chat/rooms/[roomNumber]/page";

const JoinRoom = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joinData, setJoinData] = useState({});

  function onJoinSuccess(data) {
    setJoinData(data);
    setUsername(data.userData.username);
    setRoom(data.userData.room);
    router.push(`/chat/rooms/${data.userData.room}`);
  }

  const [error, setError] = useState("");

  const onUsernameChange = (e) => {
    const inputValue = e.target.value;
    setUsername(inputValue);
  };

  const onRoomChange = (e) => {
    const roomNo = e.target.value;
    setRoom(roomNo);
  };

  const onClick = () => {
    if (username && room) {
      socket.emit("join", { username, room }, (error) => {
        if (error) {
          setError(error);
          alert(error);
        } else {
          socket.on("welcome", (data) => {
            onJoinSuccess(data);
          });
        }
      });
    }
  };

  socket.on("welcome", (data) => {
    console.log("Welcome event inside JoinRoom", data);
    onJoinSuccess(data);
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-96 p-8 bg-white rounded shadow-md">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter your name
            <input
              name="username"
              placeholder="Enter your username"
              maxLength={25}
              value={username}
              onChange={onUsernameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label
            htmlFor="room"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter room number of your choice
            <input
              name="room"
              placeholder="Enter your room number"
              maxLength={25}
              value={room}
              onChange={onRoomChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <button
            type="button"
            onClick={onClick}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Join the Chat Room
          </button>
        </div>
      </div>
      {/* {joinData && username && ( */}
        <ChatRoom username={username} room={room} joinData={joinData} />
      {/* )} */}
    </>
  );
};

export default JoinRoom;
