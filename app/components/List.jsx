"use client";
import React from "react";

const List = ({ users }) => {
  return (
    <div className="flex flex-col mr-2.5 flex-none w-1/3 p-5">
      <div className="text-gray-600 text-lg font-italic border-b border-gray-600 mb-4">
        Active Users
      </div>
      <div className="overflow-y-auto">
        {users.map((user) => (
          <div key={user.username} className="flex items-center mb-4">
            <img
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt={user.username}
              className="w-10 h-10 rounded-full mr-3"
            />
            <a href="https://ant.design" className="text-blue-600">
              {user.username}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
