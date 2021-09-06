import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  CashIcon,
  ClockIcon,
  FingerPrintIcon,
  KeyIcon,
  LightningBoltIcon,
  MapIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import ColAnimated from '../molecules/ColAnimated';
import IconOnly from '../atoms/IconOnly';
import Input from 'components/devices/universal/atoms/Input';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';

export default function LoginPage({
  isSubmit,
  setState,
  username,
  password,
  onSubmit,
}) {
  return (
    <motion.div className="flex min-h-screen h-full bg-coolGray-50">
      {/* illustration */}
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: '75%',
        }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center w-3/5 p-24">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 1.3 }}
          className="grid grid-cols-4 gap-3 mt-4 w-full">
          <ColAnimated type="icon">
            <IconOnly>
              <FingerPrintIcon />
            </IconOnly>
          </ColAnimated>
          <ColAnimated type="icon" addClassName="col-span-2">
            <IconOnly>
              <ClockIcon />
            </IconOnly>
          </ColAnimated>
          <ColAnimated type="icon">
            <IconOnly>
              <UserGroupIcon />
            </IconOnly>
          </ColAnimated>
          <ColAnimated type="tagline" addClassName="flex-col col-span-3">
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
          </ColAnimated>
          <ColAnimated type="icon">
            <IconOnly>
              <LightningBoltIcon />
            </IconOnly>
          </ColAnimated>
          <ColAnimated type="icon">
            <IconOnly>
              <CashIcon />
            </IconOnly>
          </ColAnimated>
          <ColAnimated type="icon" addClassName="col-span-2">
            <IconOnly>
              <MapIcon />
            </IconOnly>
          </ColAnimated>
          <ColAnimated type="icon">
            <IconOnly>
              <KeyIcon />
            </IconOnly>
          </ColAnimated>
        </motion.div>
      </motion.div>

      {/* end illustration */}

      {/* form login  */}
      <motion.div
        initial={{ width: 1 }}
        animate={{ width: '50%' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center w-2/5 p-12 bg-white">
        {/* logo pins  */}
        <div className="absolute top-8 right-8">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            loading="lazy"
            alt="logo"
            className=" h-14 md:h-24 md:w-36 transition-all duration-500 ease-in-out"
          />
        </div>
        {/* end logo pins  */}

        {/* header form  */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
            Login{' '}
          </h1>
          <h2 className="text-lg tracking-wide text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit vero nihil
            ad.
          </h2>
        </div>
        {/* end header form  */}

        {/* start form */}
        <form className="flex flex-col mt-12" onSubmit={onSubmit}>
          <Input
            name="username"
            labelName="Username"
            placeholder="Username"
            type="text"
            onChange={setState}
            value={username}
          />

          <Input
            name="password"
            labelName="Password"
            placeholder="Your Password"
            type="password"
            onChange={setState}
            value={password}
          />

          <Link
            to="/forgot"
            className="text-sm font-medium text-gray-500 underline text-left hover:text-gray-700 transition duration-300 -mt-4">
            Forgot password?
          </Link>

          {isSubmit ? (
            <div className="flex items-center justify-center">
              <LoadingCircle />
            </div>
          ) : (
            <button className="hover:from-pink-700 hover:to-red-600 transition-all duration-300 ease-in-out bg-gradient-to-br from-pink-600 to-red-500 text-white rounded-md p-2 text-lg md:p-4 md:text-2xl tracking-wider font-semibold mt-12 w-full">
              Login
            </button>
          )}
        </form>
        {/* end form  */}
      </motion.div>
      {/* end form login  */}
    </motion.div>
  );
}
