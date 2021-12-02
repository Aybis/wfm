import { CheckIcon, EyeIcon } from '@heroicons/react/solid';
import Input from 'components/devices/universal/atoms/Input';
import Loading from 'components/devices/universal/atoms/Loading';
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
  const [isChangePassword, setisChangePassword] = useState(false);
  const [isMatch, setisMatch] = useState(false);
  const [isShowPassword, setisShowPassword] = useState(false);
  const [isLength, setisLength] = useState(false);

  const [state, setState] = useForm({
    phone: '',
    password: '',
    verif_password: '',
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
      .getotp({ phone: state.phone })
      .then((res) => {
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

    state.token = parseInt(str);
    users
      .verifotp(state)
      .then((res) => {
        setisConfirm(false);
        setisOtp(false);
        setisUser(false);
        setisChangePassword(true);
        ToastHandler('success', res.data);
      })
      .catch((err) => {
        setisConfirm(false);
        ToastHandler('error', err.data);
      });
  };

  const handlerChangePassword = (event) => {
    event.preventDefault();
    setisConfirm(true);

    users
      .changePassword(state)
      .then((res) => {
        ToastHandler('success', res.data);
        setisConfirm(false);
        history.push('/');
      })
      .catch((err) => {
        setisConfirm(false);

        console.log(err);
      });
  };

  const handlerLengthPassword = () => {
    if (state.password.length >= 7) {
      setisLength(true);
    } else {
      setisLength(false);
    }
  };

  const handlerPasswordIsMatch = () => {
    if (state.verif_password === state.password) {
      setisMatch(true);
    } else {
      setisMatch(false);
    }
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
      <div className="hidden md:flex md:absolute top-8 right-8">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
          alt="logo"
          className="md:h-20 md:w-32 h-10"
        />
      </div>
      {/* <!--     end logo pins --></div> */}
      <div
        className={`flex flex-col justify-center sm:justify-start bg-white rounded-lg p-6 transition-all duration-500 ease-in-out ${
          isLoad
            ? 'sm:h-auto sm:w-2/3 md:w-1/2 h-full w-full opacity-100'
            : ' h-0 opacity-0'
        }`}>
        <div className="p-2 flex flex-col items-center justify-center ml-4 sm:hidden">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
            alt="bg"
            className={`transition-all duration-500 ease-in-out -mt-14  "${
              isLoad ? 'h-24 w-36  ' : 'h-0 w-0'
            } `}
          />
          <h1 className="text-2xl text-coolGray-800 font-bold mt-2 mb-2">
            SIMAKINS
          </h1>
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-600 to-red-500 tracking-wider hidden  mb-12 sm:inline-flex sm:items-center">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/simakins.svg`}
            alt="bg"
            className={`transition-all duration-500 ease-in-out h-16`}
          />
        </h1>
        <div className="flex flex-col gap-4 mt-8 sm:mt-0">
          <h1 className="md:text-3xl text-2xl text-gray-700 font-bold">
            Reset Password
          </h1>
          <h5 className="text-sm font-light md:font-normal lg:text-base text-gray-500 -mt-2 ">
            Enter your WhatsApp number. We will send you a verification code to
            change your password.
          </h5>
        </div>

        {isUser && (
          <form
            onSubmit={submitFunction}
            className="flex flex-col w-full mt-8 transition-all duration-500 ease-in-out">
            <Input
              labelName="Whatsapp Number"
              type="number"
              name="phone"
              placeholder="0812131415"
              inputClassName="appearance-none lg:tracking-wider lg:ont-semibold"
              value={state.phone}
              onChange={setState}
            />
            {state.phone.length > 8 && (
              <button
                type="submit"
                disabled={isConfirm}
                className="disabled:opacity-40 flex gap-2 justify-center items-center hover:bg-blueGray-800 transition duration-300 ease-in-out bg-apps-login p-2 rounded-md text-white font-semibold text-lg w-full mt-2">
                {isConfirm && <Loading color="text-white" height={6} />}
                Get OTP
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
            <div className="grid grid-cols-6 gap-2 mt-8 lg:mt-8 lg:mx-24 mb-12 mx-6 transition-all duration-500 ease-in-out">
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

            <button
              type="submit"
              disabled={isConfirm}
              className="disabled:opacity-40 flex gap-2 justify-center items-center bg-apps-primary p-2 rounded-md text-white font-semibold text-lg w-full -mt-2">
              {isConfirm && <Loading color="text-white" height={6} />}
              Verification
            </button>
          </form>
        </CSSTransition>
        {/* )} */}

        {/* form new password */}
        <CSSTransition
          in={isChangePassword}
          timeout={500}
          classNames="alert"
          unmountOnExit
          onEnter={() => setisChangePassword(true)}
          onExit={() => setisUser(true)}>
          <form onSubmit={handlerChangePassword} className="w-full mt-8">
            <div className="relative">
              <div
                onClick={() => setisShowPassword(!isShowPassword)}
                className="absolute cursor-pointer top-9 sm:top-10 left-2 p-1 border-r-2">
                <EyeIcon
                  className={`h-7 w-7 sm:mr-1 ${
                    isShowPassword ? 'text-apps-primary' : 'text-gray-400'
                  }`}
                />
              </div>
              <Input
                labelName="New Password"
                type={isShowPassword ? 'text' : 'password'}
                name="password"
                inputClassName={
                  (isLength && 'border-green-500', 'pl-12 sm:pl-14')
                }
                onKeyDown={handlerLengthPassword}
                placeholder="New Password"
                value={state.password}
                onChange={setState}
              />
              {isLength && (
                <div className="absolute top-9 sm:top-10 right-4 rounded-full p-1">
                  <CheckIcon className="h-7 w-7 text-green-500" />
                </div>
              )}
            </div>
            <div className="relative">
              <Input
                labelName="Verification Password"
                type="password"
                name="verif_password"
                placeholder="New Password"
                onKeyUp={handlerPasswordIsMatch}
                value={state.verif_password}
                onChange={setState}
              />
              {isMatch && (
                <div className="absolute flex justify-center items-center gap-2 top-9 sm:top-10 right-4 p-1">
                  <CheckIcon className="h-7 w-7 text-green-500 rounded-full" />
                </div>
              )}
            </div>
            {isConfirm ? (
              <div className="flex items-center justify-center">
                <Loading height={8} width={8} />
                <p className="text-apss-text text-opacity-50">Loading ....</p>
              </div>
            ) : isLength && isMatch ? (
              <button
                type="submit"
                className="bg-apps-primary p-2 rounded-md text-white font-semibold text-lg w-full -mt-2">
                Update
              </button>
            ) : (
              ''
            )}
          </form>
        </CSSTransition>
        {/* end form new password */}
        <Link
          to="/login"
          className="text-gray-400 font-normal text-sm text-center w-full underline mt-8 hover:text-gray-600 transition-all duration-300">
          Back to login?
        </Link>
      </div>
    </div>
  );
};

export default Forgot;
