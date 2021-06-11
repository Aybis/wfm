import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "react-feather";
import { CSSTransition } from "react-transition-group";
import { setAuthorizationHeader } from "configs/axios";

import Ilustrasi2SVG from "../assets/svg/ilustrasi_pop.svg";
import users from "../constants/api/users";
import { populateProfile } from "store/actions/users";
import useForm from "helpers/hooks/useForm";
import Loading from "components/atoms/Loading";
import ToastHandler from "helpers/hooks/toast";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const [{ username, password }, setState] = useForm({
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
        ToastHandler("info", "Login Success 👋", 1000);

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
            setIsSubmit(false);
          })
          .catch((error) => {
            setIsSubmit(false);
          });
      })
      .catch((err) => {
        setIsSubmit(false);
      });
  };

  useEffect(() => {
    window.scroll(0, 10);
    const timeOut = setTimeout(() => {
      setIsReady(true);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center bg-coolGray-50 h-screen">
      {/* <!--     logo pins --> */}
      <div className="absolute top-8 right-6">
        <img
          src="https://www.pins.co.id/img/logo.png"
          alt="logo"
          className="md:h-24 md:w-36 h-10 transition-all duration-500 ease-in-out"
        />
      </div>
      {/* <!--     end logo pins --></div> */}
      <div className="flex flex-col justify-center bg-white p-8 rounded-xl sm:h-auto sm:w-2/3 md:w-2/3 lg:w-1/2 h-full w-full transition-all duration-500 ease-in-out">
        <div className="flex flex-col  sm:hidden">
          <img
            src={Ilustrasi2SVG}
            alt="bg"
            className={`transition-all duration-500 ease-in-out${
              isReady ? "md:h-48 h-50 " : "h-0 "
            } `}
          />
          <div className="flex flex-col text-center mt-8 transition-all duration-500 ease-in-out">
            <h1 className="font-semibold text-2xl text-apps-text text-opacity-80">
              Welcome to
              <span className="font-bold text-2xl text-apps-primary"> POP</span>
            </h1>
            <h1 className="text-sm text-apps-text text-opacity-50 font-normal mt-2">
              I'm so happy to see. You can continue to login for discipline your
              presence.
            </h1>
          </div>
        </div>
        <div className="sm:flex lg:mb-12 flex-col hidden transition-all duration-500 ease-in-out">
          <h1 className="text-apps-text text-3xl font-bold tracking-wide">
            Login <span className="text-apps-primary">POP</span>
          </h1>
          <h4 className="text-apps-text  text-opacity-40 mt-4">
            I'm so happy to see. You can continue to login for discipline your
            presence.
          </h4>
        </div>
        <form onSubmit={submitFunction} className=" flex flex-col gap-5 mt-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="font-medium text-apps-text text-opacity-40 text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={setState}
              autoComplete="off"
              value={username}
              placeholder="user.name"
              className="w-full  border-b border-gray-200 text-apps-text p-2 bg-transparent font-medium focus:border-apps-primary text-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-medium text-apps-text text-opacity-40 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={isPassword ? "password" : "text"}
                onChange={setState}
                value={password}
                placeholder="*******"
                className="w-full  border-b border-gray-200 text-apps-text p-2 bg-transparent font-medium focus:border-apps-primary text-lg focus:outline-none"
              />
              {isPassword && (
                <span
                  className="h-4 w-4 absolute top-1 right-5 text-xs text-apps-primary cursor-pointer transition-all ease-in-out duration-300"
                  onClick={() => setIsPassword(!isPassword)}>
                  <Eye />
                </span>
              )}
              <CSSTransition
                in={!isPassword}
                timeout={500}
                classNames="fade"
                unmountOnExit
                onEnter={() => setIsPassword(false)}
                onExit={() => setIsPassword(true)}>
                <span
                  className="h-4 w-4 absolute top-1 right-5 text-xs text-apps-primary cursor-pointer transition-all ease-in-out duration-300"
                  onClick={() => setIsPassword(!isPassword)}>
                  <EyeOff />
                </span>
              </CSSTransition>
            </div>
          </div>
          <Link
            to="/forgot"
            className="text-xs font-semibold text-apps-text text-opacity-70 text-right cursor-pointer hover:underline transition duration-300">
            Forgot password
          </Link>
          {isSubmit ? (
            <div className="flex items-center justify-center">
              <Loading height={8} width={8} />
              <p className="text-apss-text text-opacity-50">Loading ....</p>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-apps-primary p-2 rounded-lg text-white font-medium text-xl hover:bg-blue-700 transition duration-300 mt-6">
              Login
            </button>
          )}
        </form>
        <p></p>
      </div>
    </div>
  );
};

export default withRouter(Login);
