/** @format */

import React from "react";

export default function MobileHeader({ user }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center justify-center">
        <div className="relative">
          {/* {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="h-8 w-8" />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=7B81EE&color=fff`}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
          )} */}
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=7B81EE&color=fff`}
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="flex flex-col -gap-2">
          <h6 className="text-xs font-bold text-gray-800 transform capitalize">
            {user ? user.name.toLowerCase() : ""}
          </h6>
          <h6 className="text-xs font-medium text-gray-400 transform capitalize">
            {user ? user.position.toLowerCase() : ""}
          </h6>
        </div>
      </div>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <div className="absolute h-2 w-2 rounded-full bg-red-500 top-0 right-1"></div>
      </div>
    </div>
  );
}
