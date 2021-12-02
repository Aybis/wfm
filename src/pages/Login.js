import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import Loading from 'components/devices/universal/atoms/Loading';
import { setAuthorizationHeader } from 'configs/axios';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { populateProfile } from 'store/actions/users';
import swal from 'sweetalert';
import users from '../constants/api/users';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setshowPassword] = useState(false);

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

        // ToastHandler('success', 'Login Success 👋', 1000);

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
              avatar: details.data.image_url
                ? details.data.image_url
                : details.data.thumb_url,
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

            swal({
              title: 'Login berhasil!',
              icon: 'success',
              button: 'Close!',
            });

            setTimeout(() => {
              // redirect link
              history.push(redirect || '/');
              setIsSubmit(false);
            }, 300);
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
    <div className="flex items-center justify-center h-auto min-h-screen lg:h-full bg-white lg:bg-gray-100 ">
      <div className="flex flex-col w-full lg:w-auto p-8 gap-4 items-start bg-white lg:rounded-lg lg:shadow-xl">
        <div className="relative w-full -mt-8">
          <div className="flex flex-col justify-center items-center w-full p-4">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
              loading="lazy"
              alt="logo"
              className="transition-all duration-500 ease-in-out h-44 p-2"
            />
            <h1 className="text-2xl text-coolGray-800 font-bold -mt-1 mb-2">
              SIMAKINS
            </h1>
            <p className="font-normal text-warmGray-500">
              Sistem Manajemen Aplikasi Karyawan PINS
            </p>
          </div>
        </div>
        <form className="flex flex-col w-full mt-6" onSubmit={submitFunction}>
          <div className="relative mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="username"
                onChange={setState}
                value={username}
                className="shadow-sm focus:ring-apps-primary focus:border-apps-primary block w-full sm:text-sm border-gray-300 rounded-md py-3 placeholder-opacity-50 placeholder-gray-500"
                placeholder="your username"
              />
            </div>
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="your password"
                name="password"
                onChange={setState}
                value={password}
                className="shadow-sm focus:ring-apps-primary focus:border-apps-primary block w-full sm:text-sm border-gray-300 rounded-md py-3 placeholder-opacity-50 placeholder-gray-500"
              />
              <span
                className="absolute top-9 right-3 cursor-pointer"
                onClick={() => setshowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOffIcon className="h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 text-gray-400" />
                )}
              </span>
            </div>
          </div>

          <button
            disabled={isSubmit}
            className={[
              'bg-apps-login hover:bg-blueGray-700 transition-all duration-300 ease-in-out py-3 rounded-md text-white font-semibold mt-4 w-full flex justify-center items-center disabled:opacity-40',
              isSubmit && 'bg-opacity-20',
            ].join(' ')}>
            {isSubmit && <Loading color="white" height={6} />}
            Login
          </button>

          <Link
            to="/forgot"
            className="relative inset-x-0 bottom-4 mt-12 -mb-8">
            <p className="text-sm font-normal text-gray-400 text-center hover:text-gray-700 transition duration-300 mt-4 hover:underline">
              Reset password?
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
