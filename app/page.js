"use client";
import React, { useState, useEffect } from "react";
import socket from "./utils/socket";

const Home = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joinData, setJoinData] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (joinData && Object.keys(joinData).length > 0) {
      setMessages([joinData]);
    }
    socket.on("roomInfo", (users) => {
      console.log(users);
      setUsers(users?.users);
    });
    socket.on("message", (message, error) => {
      setMessages((msgs) => [...msgs, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [joinData]);

  function onJoinSuccess(data) {
    console.log(data);
    setJoinData(data);
    setUsername(data.userData.username);
    setRoom(data.userData.room);
    // router.push(`/chat/rooms/${data.userData.room}`);
  }
  const userArr = [
    {
      _id: "66ae0d94555dbe97146c2a31",
      username: "abc",
      room: "100",
      status: "ONLINE",
      socketId: "uil_8HKoRY6d97HmAAAF",
      published_at: "2024-08-03T10:59:32.022Z",
      createdAt: "2024-08-03T10:59:32.024Z",
      updatedAt: "2024-08-03T10:59:32.024Z",
      __v: 0,
      id: "66ae0d94555dbe97146c2a31",
    },
    {
      _id: "66ae0d9f555dbe97146c2a32",
      username: "xyz",
      room: "100",
      status: "ONLINE",
      socketId: "xZmEjzttXIVvNhyHAAAH",
      published_at: "2024-08-03T10:59:43.560Z",
      createdAt: "2024-08-03T10:59:43.564Z",
      updatedAt: "2024-08-03T10:59:43.564Z",
      __v: 0,
      id: "66ae0d9f555dbe97146c2a32",
    },
    {
      _id: "66ae107f555dbe97146c2a33",
      username: "user01",
      room: "100",
      status: "OFFLINE",
      socketId: "BaReFmPphAmDZhZ1AAAL",
      published_at: "2024-08-03T11:11:59.693Z",
      createdAt: "2024-08-03T11:11:59.709Z",
      updatedAt: "2024-08-03T11:11:59.709Z",
      __v: 0,
      id: "66ae107f555dbe97146c2a33",
    },
    {
      _id: "66ae108d555dbe97146c2a34",
      username: "user02",
      room: "100",
      status: "OFFLINE",
      socketId: "-v0bexiSFRfF7YCsAAAJ",
      published_at: "2024-08-03T11:12:13.154Z",
      createdAt: "2024-08-03T11:12:13.156Z",
      updatedAt: "2024-08-03T11:12:13.156Z",
      __v: 0,
      id: "66ae108d555dbe97146c2a34",
    },
  ];

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

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = (e) => {
    sendMessage(message);
  };
  const sendMessage = (message) => {
    if (message) {
      socket.emit(
        "sendMessage",
        { userId: joinData.userData.id, message },
        (error) => {
          if (error) {
            alert(error);
            history.push("/join");
          }
        }
      );
      setMessage("");
    } else {
      alert("Message can't be empty");
    }
  };

  return (
    <>
      {messages?.length > 0 ? (
        <div className="w-full  flex flex-row">
          <div className="w-1/3 py-4 bg-indigo-100">
            <div>
              <h2 className="text-lg text-center">Active Users</h2>
              <hr className="w-full border-1 border-indigo-500" />
              {users.length > 0
                ? users.map((user) => {
                    if (user.status === "ONLINE") {
                      console.log(user);
                    }
                    return (
                      <div className="flex flex-col gap-4">
                        {user.status === "ONLINE" && (
                          <p className="text-green-900 font-bold capitalize px-3">
                            {user.username}
                          </p>
                        )}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="w-2/3">
            <div className="flex flex-col h-screen">
              {room}
              <div className="flex-grow overflow-y-auto">
                <p>Hello {room}</p>
                {messages &&
                  messages?.map((message, ind) => {
                    const { user, text } = message;
                    const sentByCurrentUser = username?.toLowerCase() === user;

                    return (
                      <div
                        key={ind}
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
              <div className="flex  mb-20 px-4">
                <input
                  type="text"
                  placeholder="Type your message"
                  value={message}
                  onChange={handleChange}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleClick}
                  className="px-10 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <i className="fa fa-paper-plane" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Home;
