/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, menu = true }) => {
  return (
    <div>
      {/* <!--   menu bar  --> */}
      <div className="bg-white border-b border-gray-100 top-0 inset-0 md:flex justify-between items-center transition duration-500 ease-in-out hidden z-20 px-12">
        <div className="p-4 flex space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
          <h4 className="font-bold text-gray-800">POP</h4>
        </div>
        <div className={`p-4 space-x-8 mx-auto ${menu ? "block" : "hidden"}`}>
          <Link
            to="#"
            className="text-indigo-600 border-b-2 border-indigo-600 pb-2">
            Home
          </Link>
          <Link
            to="#"
            className="text-gray-300 font-light hover:text-indigo-600 pb-2 border-b-2 border-transparent hover:border-indigo-600 transition duration-200">
            Report
          </Link>
          <Link
            to="#"
            className="text-gray-300 font-light hover:text-indigo-600 pb-2 border-b-2 border-transparent hover:border-indigo-600 transition duration-200">
            Holiday
          </Link>
          <Link
            to="#"
            className="text-gray-300 font-light hover:text-indigo-600 pb-2 border-b-2 border-transparent hover:border-indigo-600 transition duration-200">
            Dashboard
          </Link>
        </div>
        <div className="p-4">
          {user && (
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-gray-400">{user.name}</p>

              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="h-8 w-8 rounded-full bg-indigo-50"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 bg-gray-50 p-2 rounded-full text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
