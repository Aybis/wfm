import ColAnimated from 'components/devices/desktop/molecules/ColAnimated';
import Input from 'components/devices/universal/atoms/Input';
import Loading from 'components/devices/universal/atoms/Loading';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage({
  isSubmit,
  setState,
  username,
  password,
  onSubmit,
}) {
  return (
    <motion.div className="flex items-center justify-center h-auto min-h-screen bg-white">
      <motion.div
        initial={{
          opacity: 0,
          y: 500,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full p-8 gap-4 items-start">
        <div className="flex flex-col gap-3 mt-8">
          <ColAnimated
            type="tagline"
            addClassName="items-center justify-center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              loading="lazy"
              alt="logo"
              className="h-24 w-36 -mt-14 mb-12 transition-all duration-500 ease-in-out"
            />
          </ColAnimated>
          <h1 className="text-3xl font-bold tracking-wide text-gray-800">
            Login
          </h1>
          <h2 className="text-sm tracking-wide font-light text-left text-gray-400">
            I'm so happy to see. You can continue to login for discipline your
            presence.
          </h2>
        </div>
        <form className="flex flex-col w-full mt-6" onSubmit={onSubmit}>
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

          <button
            disabled={isSubmit}
            className={[
              'hover:from-pink-700 hover:to-red-600 transition-all duration-300 ease-in-out bg-gradient-to-br from-pink-600 to-red-500 text-white rounded-md p-2 text-lg md:p-4 md:text-2xl tracking-wider font-semibold mt-4 w-full flex justify-center items-center',
              isSubmit && 'bg-opacity-40',
            ].join(' ')}>
            {isSubmit && <Loading color="white" height={6} />}
            Login
          </button>

          <Link
            to="/forgot"
            className="text-sm font-medium text-gray-400 tracking-wide underline text-center hover:text-gray-700 transition duration-300 mt-8">
            Forgot password?
          </Link>
        </form>
      </motion.div>
    </motion.div>
  );
}
