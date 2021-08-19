/** @format */

import { LightningBoltIcon } from '@heroicons/react/outline';
import Input from 'components/atoms/Input';
import Loading from 'components/atoms/Loading';
import users from 'constants/api/users';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const Forgot = ({ history }) => {
  const [isLoad, setisLoad] = useState(false);
  const [isConfirm, setisConfirm] = useState(false);
  const [isOtp, setisOtp] = useState(false);
  const [isUser, setisUser] = useState(true);
  const [state, setState] = useForm({
    email: '',
    token: '',
  });

  function useFocusNext() {
    const controls = useRef([]);

    const handler = (event) => {
      if (event.target.value.length > 0) {
        // Required if the controls can be reordered
        controls.current = controls.current
          .filter((control) => document.body.contains(control))
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          );

        const index = controls.current.indexOf(event.target);
        const next = controls.current[index + 1];
        next && next.focus();

        // IE 9, 10
        event.preventDefault();
      }
      if (event.key === 'Backspace') {
        // Required if the controls can be reordered
        controls.current = controls.current
          .filter((control) => document.body.contains(control))
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          );

        const index = controls.current.indexOf(event.target);
        const prev = controls.current[index - 1];
        prev && prev.focus();
      }
    };

    return useCallback((element) => {
      if (element && !controls.current.includes(element)) {
        controls.current.push(element);
        element.addEventListener('keyup', handler);
      }
    }, []);
  }
  const focusNextRef = useFocusNext();

  const submitFunction = (event) => {
    event.preventDefault();
    setisConfirm(true);
    users
      .getotp({ email: state.email })
      .then((res) => {
        console.log(res);
        let message = res.data;
        setisOtp(true);
        setisUser(false);
        ToastHandler('success', message);
        setisConfirm(false);
      })
      .catch((err) => {
        setisConfirm(false);
        ToastHandler('error', err.data);
      });
  };

  const submitVerification = (event) => {
    event.preventDefault();
    setisConfirm(true);

    let str = '';
    for (let index = 0; index < event.target.length; index++) {
      str += `${event.target[index].value}`;
    }
    console.log(str);
    state.token = parseInt(str);
    users
      .verifotp(state)
      .then((res) => {
        setisConfirm(false);
        ToastHandler('success', res.data);
        history.push('/');
      })
      .catch((err) => {
        setisConfirm(false);
        ToastHandler('error', err.data);
      });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setisLoad(true);
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <div className="flex justify-center items-center bg-coolGray-50 h-screen">
      {/* <!--     logo pins --> */}
      <div className="absolute top-8 right-8">
        <img
          src={`${process.env.PUBLIC_URL}/assets/image/logo.png`}
          alt="logo"
          className="md:h-20 md:w-32 h-10"
        />
      </div>
      {/* <!--     end logo pins --></div> */}
      <div
        className={`flex flex-col justify-center sm:justify-start bg-white rounded-lg p-6 transition-all duration-500 ease-in-out ${
          isLoad
            ? 'sm:h-1/2 sm:w-2/3 md:w-1/2 h-full w-full opacity-100'
            : ' h-0 opacity-0'
        }`}>
        <div className="p-2 flex items-center justify-center ml-4 sm:hidden">
          <img
            src={`${process.env.PUBLIC_URL}/assets/svg/ilustrasi_pop.svg`}
            alt="bg"
            className={`transition-all duration-500 ease-in-out${
              isLoad ? 'h-44 ' : 'h-0 '
            } `}
          />
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-600 to-red-500 tracking-wider hidden  mb-12 sm:inline-flex sm:items-center">
          <LightningBoltIcon className="h-12 w-12 text-pink-600" /> Almuazaf
        </h1>
        <div className="flex flex-col gap-4 mt-8 sm:mt-0">
          <h1 className="md:text-3xl text-xl text-apps-text font-semibold">
            Forgot Password
          </h1>
          <h5 className="text-sm text-apps-text text-opacity-60 font-light tracking-wide -mt-2 ">
            Enter the registered e-mail. We will send you a verification code to
            reset your password
          </h5>
        </div>

        {isUser && (
          <form
            onSubmit={submitFunction}
            className="flex flex-col w-full mt-8 transition-all duration-500 ease-in-out">
            <Input
              labelName="Email"
              type="email"
              name="email"
              placeholder="fauzi.hanif@pins.co.id"
              value={state.email}
              onChange={setState}
            />
            {isConfirm ? (
              <div className="flex items-center justify-center">
                <Loading height={8} width={8} />
                <p className="text-apss-text text-opacity-50">Loading ....</p>
              </div>
            ) : (
              <button
                type="submit"
                className="hover:from-pink-700 hover:to-red-600 transition duration-300 ease-in-out bg-gradient-to-br from-pink-600 to-red-500 p-2 rounded-md text-white font-semibold text-lg w-full -mt-2">
                Submit
              </button>
            )}
          </form>
        )}

        {/* {isOtp && ( */}
        <CSSTransition
          in={isOtp}
          timeout={500}
          classNames="alert"
          unmountOnExit
          onEnter={() => setisOtp(true)}
          onExit={() => setisUser(true)}>
          <form onSubmit={submitVerification}>
            <div className="grid grid-cols-6 gap-2 lg:mx-24 mb-12 mx-6 transition-all duration-500 ease-in-out">
              {Array.from(Array(6), (item, index) => (
                <input
                  key={index}
                  name="token"
                  ref={focusNextRef}
                  type="text"
                  autoComplete="off"
                  maxLength="1"
                  className="p-2 font-semibold border-b-2 border-apps-gray border-opacity-60 focus:outline-none text-lg text-center"
                />
              ))}
            </div>
            {isConfirm ? (
              <div className="flex items-center justify-center">
                <Loading height={8} width={8} />
                <p className="text-apss-text text-opacity-50">Loading ....</p>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-apps-primary p-2 rounded-md text-white font-semibold text-lg w-full -mt-2">
                Verification
              </button>
            )}
          </form>
        </CSSTransition>
        {/* )} */}
        <Link
          to="/login"
          className="text-apps-text text-opacity-50 font-semibold text-xs tracking-wide text-center w-full underline mt-8">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default Forgot;
