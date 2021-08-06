import Avatar from 'components/atoms/Avatar';
import { motion } from 'framer-motion';
import notify from 'helpers/hooks/toast';
import React from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';

export default function Menu() {
  const users = useSelector((state) => state.users);
  const container = {
    hidden: { y: -20 },
    visible: {
      y: 0,
      transition: {
        delayChildren: 0.09,
        staggerChildren: 0.05,
      },
    },
  };

  const logOutUser = () => {
    notify('info', 'Logout success 👋');
    // remove token
    localStorage.removeItem('WFM:token');
    // remove cookies
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    // redirect link
    <Redirect push to="/login" />;
    // reload page
    window.location.reload();
  };

  return (
    isDesktop && (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="transition-all duration-300 ease-in-out fixed z-30 inset-x-0 top-0 bg-white shadow-lg">
        <div className=" container mx-auto flex justify-center py-4 h-24 ">
          {/* Start Code Logo  */}
          <div className="flex flex-col items-center gap-2 justify-center p-2  w-1/5">
            <img
              className="h-6 w-6"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="logo"
            />
            <h1 className="text-gray-800 font-bold uppercase tracking-wider text-lg">
              Almuazaf
            </h1>
          </div>
          {/* End Code Logo  */}
          {/* Start Code Menu  */}
          <div className="flex p-2 md:gap-8 justify-center items-center transition-all duration-300 ease-in-out w-full text-xl">
            <NavLink
              to="/"
              exact={true}
              className=" py-2 px-6 text-center text-gray-400 rounded hover:bg-apps-card hover:text-indigo-600 transition-all duration-300 ease-in-out"
              activeClassName="text-indigo-600 font-semibold ">
              Home
            </NavLink>
            <NavLink
              to="/modules"
              className="py-2 px-6 text-center text-gray-400 rounded hover:bg-apps-card hover:text-indigo-600 transition-all duration-300 ease-in-out"
              activeClassName="text-indigo-600 font-semibold">
              Modules
            </NavLink>
            <NavLink
              to="/approval"
              className="py-2 px-6 text-center text-gray-400 rounded hover:bg-apps-card hover:text-indigo-600 transition-all duration-300 ease-in-out"
              activeClassName="text-indigo-600 font-semibold">
              Approval
            </NavLink>
            <NavLink
              to="/dashboard"
              className="py-2 px-6 text-center text-gray-400 rounded hover:bg-apps-card hover:text-indigo-600  transition-all duration-300 ease-in-out"
              activeClassName="text-indigo-600 font-semibold">
              Dashboard
            </NavLink>
          </div>
          {/* End Code Menu */}
          {/* Start Code Avatar */}
          <Avatar user={users} logOut={logOutUser} />
          {/* End Code Avatar */}
        </div>
      </motion.div>
    )
  );
}
