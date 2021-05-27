/** @format */

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "react-feather";

import { setAuthorizationHeader } from "configs/axios";
import Ilustrasi2SVG from "../assets/svg/ilustrasi_pop.svg";
import users from "../constants/api/users";
import { populateProfile } from "store/actions/users";
import useForm from "helpers/hooks/useForm";
import Loading from "components/atoms/Loading";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [username, setUsername] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [isPassword, setIsPassword] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);


  const [state, setState] = useForm({
    username: "",
    password: "",
  });

  const submitFunction = (event) => {
    event.preventDefault();
    setIsSubmit(!isSubmit);

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
          setIsSubmit(!isSubmit);

            console.log(err);
          });
      })
      .catch((err) => {
        setIsSubmit(!isSubmit);
        console.log(err);
      });
  };
  return (
  
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
            {
              isSubmit ? (
                <Loading />
              ) : (
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white font-medium text-xl hover:bg-blue-600 transition duration-300">
              Login
            </button>
              )
            }
            
          </form>
        </div>
      </div>
  );
};

export default withRouter(Login);
