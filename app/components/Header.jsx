"use client";
import React from "react";

const Header = (props) => {
  console.log(props);
  return (
    <div className="flex items-center justify-between bg-blue-600 rounded-t-lg h-16 w-full px-4">
      <div className="flex items-center text-white">
        <div className="text-green-500 mr-2">
          <i className="fa fa-circle" aria-hidden="true"></i>
        </div>
        <div>{props.room}</div>
      </div>
      <div className="text-white">
        <a href="/">
          <div className="text-xl">
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Header;
