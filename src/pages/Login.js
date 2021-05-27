/** @format */

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "react-feather";

import { setAuthorizationHeader } from "configs/axios";
import LoginSVG from "../assets/svg/login.svg";
import VectorSVG from "../assets/svg/vector.svg";
import Ilustrasi2SVG from "../assets/svg/ilustrasi_pop.svg";
import users from "../constants/api/users";
import { populateProfile } from "store/actions/users";
import useForm from "helpers/hooks/useForm";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [username, setUsername] = useState(() => "");
  const [password, setPassword] = useState(() => "");

  const [state, setState] = useForm({
    email: "",
    password: "",
  });

  const [isPassword, setIsPassword] = useState(true);

  const submitFunction = (event) => {
    event.preventDefault();

    // api get token authorization
    users
      .login({ username, password })
      .then((res) => {
        // set authorization with bearer token
        setAuthorizationHeader(`Bearer ${res.data.access_token}`);

        // api get details users
        users
          .details()
          .then((details) => {
            dispatch(populateProfile(details.data));
            // store data token to local storage
            localStorage.setItem(
              "WFM:token",
              JSON.stringify({
                token: res.data.access_token,
                username: username,
              }),
            );

            const redirect = localStorage.getItem("WFM:redirect");

            // store data user to cookies
            const userCookie = {
              name: details.data.name,
              email: details.data.email,
              avatar: details.data.image_url
                ? details.data.image_url
                : details.data.thumb_url,
              unit: details.data.unit,
              nik: details.data.nik,
              position: details.data.position,
            };

            /**
             * set expires user cookies
             * date + 7 * 24 * 60 * 60 * 1000
             * meaning
             * tanggal + 7hari * 24jam * 60menit * 60detik * 1000ms
             */
            const expires = new Date(
              new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            );

            document.cookie = `WFM:user=${JSON.stringify(
              userCookie,
            )}; expires=${expires.toUTCString()}; path:/`;

            // redirect link
            history.push(redirect || "/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="lg:flex gap-12 h-screen p-32 hidden">
        <div className="flex flex-col bg-white w-1/2 p-4 justify-center">
          <h1 className="text-4xl text-gray-800 font-bold text-left tracking-wide">
            Login
          </h1>
          <p className="text-lg text-gray-500 font-light mt-4 tracking-wide">
            Login with your data that you entered during your registration.
          </p>
          <form onSubmit={submitFunction} className="mt-8 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="username"
                className="font-semibold text-gray-800 tracking-wide">
                Username
              </label>
              <input
                name="username"
                type="text"
                onChange={setState}
                value={state.username}
                placeholder="abdul.muchtar"
                className="w-full border-2 border-gray-200 p-2 rounded-lg font-semibold focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label
                htmlFor="username"
                className="font-semibold text-gray-800 tracking-wide">
                Password
              </label>
              <input
                name="passwword"
                type="password"
                onChange={setState}
                value={state.password}
                placeholder="*******"
                className="w-full border-2 border-gray-200 p-2 rounded-lg focus:border-blue-500"
              />
            </div>
            <p className="text-xs font-semibold text-blue-500 text-right cursor-pointer hover:underline transition duration-300">
              Forgot password
            </p>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white font-bold text-xl hover:bg-blue-600 transition duration-300">
              Login
            </button>
          </form>
        </div>
        <div className="border border-gray-50 rounded my-64"></div>
        <div className="flex flex-col bg-white w-1/2 p-4 justify-center items-center">
          <div className="mt-24">
            <img src={VectorSVG} alt="bg" className="text-center ml-12" />

            <img
              src={LoginSVG}
              alt="logo"
              className="text-center ml-12 z-50"
              style={{ marginTop: "-70%" }}
            />
          </div>
          <div className="text-center mt-8">
            <p className="text-xl font-semibold text-gray-800">
              Lorem Ipsum is simply dummy text of the printing{" "}
            </p>
            <p className="font-light text-gray-500 mt-4">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley
            </p>
          </div>
        </div>

        <p className="absolute bottom-12 text-center text-xs font-semibold text-gray-400 -mb-10">
          2021 © KerjaKuda
        </p>
      </div>

      {/* mobile view  */}
      <div className="flex flex-col gap-12 bg-gray-50 h-full p-12 justify-center">
        <img src={Ilustrasi2SVG} alt="bg" className="h-50  md:h-48" />
        <div className="flex flex-col text-center">
          <h1 className="font-semibold text-2xl text-gray-600">
            Welcome to{" "}
            <span className="font-bold text-2xl text-blue-500">POP</span>
          </h1>
          <h1 className="text-sm text-gray-400 font-normal mt-2">
            I'm so happy to see. You can continue to login for discipline your
            presence.
          </h1>
        </div>

        <div className="flex flex-col ">
          <form onSubmit={submitFunction} className=" flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="font-medium text-gray-400 text-xs">
                Username
              </label>
              <input
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                placeholder="user.name"
                className="w-full text-sm border-b border-gray-200 text-gray-800 p-2 bg-transparent font-medium focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="font-medium text-gray-400 text-xs">
                Password
              </label>
              <div className="relative">
                <input
                  type={isPassword ? "password" : "text"}
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  placeholder="*******"
                  className="w-full text-sm border-b border-gray-200 text-gray-800 p-2 bg-transparent font-medium focus:border-blue-500"
                />
                {isPassword ? (
                  <span
                    className="h-4 w-4 absolute top-1 right-5 text-xs text-blue-500 cursor-pointer"
                    onClick={() => setIsPassword(!isPassword)}>
                    <Eye />
                  </span>
                ) : (
                  <span
                    className="h-4 w-4 absolute top-1 right-5 text-xs text-blue-500 cursor-pointer"
                    onClick={() => setIsPassword(!isPassword)}>
                    <EyeOff />
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs font-semibold text-green-400 text-right cursor-pointer hover:underline transition duration-300">
              Forgot password
            </p>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white font-medium text-xl hover:bg-blue-600 transition duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
