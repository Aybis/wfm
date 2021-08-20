import {
  CashIcon,
  ClockIcon,
  FingerPrintIcon,
  KeyIcon,
  LightningBoltIcon,
  MapIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import LoadingCircle from 'components/atoms/LoadingCircle';
import { setAuthorizationHeader } from 'configs/axios';
import { motion } from 'framer-motion';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { populateProfile } from 'store/actions/users';
import users from '../constants/api/users';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const [{ username, password }, setState] = useForm({
    username: '',
    password: '',
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
        ToastHandler('info', 'Login Success 👋', 1000);

        // api get details users
        users
          .details()
          .then((details) => {
            dispatch(populateProfile(details.data));
            // store data token to local storage
            localStorage.setItem(
              'WFM:token',
              JSON.stringify({
                token: res.data.access_token,
                username: username,
                refresh_token: res.data.refresh_token,
              }),
            );

            const redirect = localStorage.getItem('WFM:redirect');

            // store data user to cookies
            const userCookie = {
              name: details.data.name,
              user_id: details.data.id,
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
              new Date().getTime() + 1 * 24 * 60 * 60 * 1000,
            );

            document.cookie = `WFM:user=${JSON.stringify(
              userCookie,
            )}; expires=${expires.toUTCString()}; path:/`;

            // redirect link
            history.push(redirect || '/');
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
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <motion.div className="relative min-h-screen h-full md:h-screen">
      <div className="group transition-all duration-500 ease-in-out flex flex-col-reverse md:grid md:grid-cols-2 items-center h-full lg:container lg:mx-auto md:divide-x-2 md:divide-gray-50">
        <motion.div
          initial={{ opacity: 0, x: -400 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.5 }}
          className="md:my-0 flex flex-col bg-white h-full w-full md:h-4/6 p-4 md:px-8 md:justify-center md:items-start transition-all duration-500 ease-in-out">
          <div className="flex flex-col-reverse gap-8 w-full">
            <div className="md:flex flex-col gap-4 hidden">
              <h1 className="text-3xl text-center md:text-left md:text-4xl font-semibold text-gray-600">
                Welcome to
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-pink-600 to-red-500 font-bold">
                  {' '}
                  Almuazaf
                </span>
              </h1>
              <h2 className="text-center md:text-left text-lg font-normal text-gray-400">
                I'm so happy to see. You can continue to login for discipline
                your presence.
              </h2>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              loading="lazy"
              alt="logo"
              className="absolute top-3 right-4 md:relative md:top-0 md:right-0 h-14 md:h-24 md:w-36 transition-all duration-500 ease-in-out"
            />
          </div>
          <form
            onSubmit={submitFunction}
            className="mt-4 md:mt-16 flex flex-col w-full">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="username"
                className="font-medium text-sm md:text-lg text-gray-500 tracking-wide">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={setState}
                autoComplete="off"
                value={username}
                className="bg-transparent border-b-2 focus:outline-none focus:border-red-600 border-gray-100 p-2 md:p-4 placeholder-gray-300 text-lg md:text-xl tracking-wide font-medium"
                placeholder="Your Username"
              />
            </div>

            <div className="flex flex-col gap-1 w-full mt-4 md:mt-8">
              <label
                htmlFor="password"
                className="font-medium text-sm md:text-lg text-gray-500 tracking-wide">
                Password
              </label>
              <div className="relative items-center">
                <input
                  name="password"
                  type={isPassword ? 'password' : 'text'}
                  onChange={setState}
                  value={password}
                  placeholder="Your Password"
                  className="bg-transparent border-b-2 focus:outline-none focus:border-red-600 border-gray-100 p-2 md:p-4 placeholder-gray-300 text-lg md:text-xl tracking-wide font-medium w-full"
                />
                {isPassword && (
                  <span
                    className="z-20 h-4 w-4 absolute top-4 right-8 text-xs text-gray-500 cursor-pointer transition-all ease-in-out duration-300"
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
                    className="z-20 h-4 w-4 absolute top-4 right-8 text-xs text-red-600 cursor-pointer transition-all ease-in-out duration-300"
                    onClick={() => setIsPassword(!isPassword)}>
                    <EyeOff />
                  </span>
                </CSSTransition>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <Link
                to="/forgot"
                className="-mr mt-2 text-xs md:text-base text-gray-400 font-medium hover:text-gray-600 transition duration-300 ease-in-out hover:underline">
                Forgot password?
              </Link>
            </div>
            {isSubmit ? (
              <div className="flex items-center justify-center">
                <LoadingCircle />
              </div>
            ) : (
              <button className="hover:from-pink-700 hover:to-red-600 transition duration-300 ease-in-out bg-gradient-to-br from-pink-600 to-red-500 text-white rounded-md p-2 text-lg md:p-4 md:text-2xl tracking-wider font-semibold mt-8 md:mt-20 w-full">
                Login
              </button>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-col mt-16 md:hidden">
          <img
            loading="lazy"
            src={`${process.env.PUBLIC_URL}/assets/svg/ilustrasi_pop2.svg`}
            alt="bg"
            className={`transition-all duration-500 ease-in-out h-50 w-50 p-8 ml-2`}
          />
          <div className="flex flex-col text-center mt-2 transition-all duration-500 ease-in-out">
            <h1 className="font-semibold text-2xl text-gray-600">
              Welcome to
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-pink-600 to-red-500 font-bold">
                Almuazaf
              </span>
            </h1>
            <h1 className="text-sm text-apps-text text-opacity-50 font-normal mt-2">
              I'm so happy to see. You can continue to login for discipline your
              presence.
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex flex-col bg-white md:h-4/6 p-4 h-full md:p-8 justify-center items-start transition-all duration-500 ease-in-out">
          <div className="grid grid-cols-4 gap-3 mt-4 w-full">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex bg-gray-100 bg-opacity-40 text-red-600 p-6 rounded-xl w-full h-full justify-center items-center">
              <FingerPrintIcon className="h-10 w-10 md:h-16 xl:w-16" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex col-span-2 bg-gray-100 bg-opacity-40 text-red-600 p-6 rounded-xl w-full h-full justify-center items-center">
              <ClockIcon className="h-10 w-10 md:h-16 xl:w-16" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex bg-gray-100 bg-opacity-40 text-red-600 p-6 rounded-xl w-full h-full justify-center items-center">
              <UserGroupIcon className="h-10 w-10 md:h-16 xl:w-16" />
            </motion.div>
            <div className="flex flex-col  p-4 rounded w-full h-full bg-opacity-30 col-span-3">
              <h1 className="text-4xl xl:text-6xl font-semibold text-gray-800">
                Be Collaborative,
              </h1>
              <h1 className="text-4xl xl:text-6xl font-semibold text-gray-800">
                Competent,
              </h1>
              <h1 className="text-4xl xl:text-6xl font-semibold text-gray-800">
                Adaptive,
              </h1>
              <h1 className="text-4xl xl:text-6xl font-semibold text-gray-800">
                Amanah.
              </h1>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex bg-gray-100 bg-opacity-40 text-red-600 p-4 rounded-xl w-full h-full justify-center items-center">
              <LightningBoltIcon className=" h-10 w-10 md:h-16 xl:w-16" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex bg-gray-100 bg-opacity-40 text-red-600 p-6 rounded-xl w-full h-full justify-center items-center">
              <CashIcon className="h-10 w-10 md:h-16 xl:w-16" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex col-span-2 bg-gray-100 bg-opacity-40 text-red-600 p-6 rounded-xl w-full h-full justify-center items-center">
              <MapIcon className="h-10 w-10 md:h-16 xl:w-16" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex bg-gray-100 bg-opacity-40 text-red-600 p-6 rounded-xl w-full h-full justify-center items-center">
              <KeyIcon className="h-10 w-10 md:h-16 xl:w-16" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default withRouter(Login);
