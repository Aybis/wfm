/** @format */

import React from "react";
import ForgotSVG from "../assets/svg/forgot.svg";

const Forgot = () => {
  return (
    <>
      <div className="flex gap-12 h-screen p-32">
        <div className="flex flex-col bg-white w-1/2 p-4 justify-center">
          <h1 className="text-4xl text-gray-800 font-bold text-left tracking-wide">
            Forgot Password
          </h1>
          <p className="text-lg text-gray-500 font-light mt-4 tracking-wide">
            Enter the registered e-mail. We will send you a verification code to
            reset your password.
          </p>
          <form action="" method="post" className="mt-8 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="username"
                className="font-semibold text-gray-800 tracking-wide">
                Username
              </label>
              <input
                type="text"
                placeholder="abdul.muchtar"
                className="w-full border-2 border-gray-200 p-2 rounded-lg font-semibold"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white font-bold text-xl hover:bg-blue-600 transition duration-300">
              Submit
            </button>
          </form>
          <p className="text-sm font-semibold text-blue-500 cursor-pointer underline mt-8 text-center">
            Back to login
          </p>
        </div>
        <div className="border border-gray-50 rounded my-64"></div>
        <div className="flex flex-col bg-white w-1/2 p-4 justify-center items-center">
          <img src={ForgotSVG} alt="logo" className="text-center ml-12" />
          <div className="text-center mt-12">
            <p className="text-xl font-semibold text-gray-800">
              Lorem Ipsum is simply dummy text of the printing{" "}
            </p>
            <p className="font-light text-gray-500 mt-4">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley
            </p>
          </div>
        </div>

        <p className="absolute bottom-12 text-center text-xs font-semibold text-gray-400">
          2021 © KerjaKuda
        </p>
      </div>
    </>
  );
};

export default Forgot;
