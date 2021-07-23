import {
  ChartBarIcon,
  ClipboardListIcon,
  HomeIcon,
  LogoutIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import notify from 'helpers/hooks/toast';

export default function Menu() {
  const logOoutUser = () => {
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
    <nav className="transition-all duration-300 ease-in-out fixed hidden lg:flex rounded-2xl z-30 inset-x-0 mx-8 lg:bottom-0 lg:h-auto lg:inset-y-0 lg:w-32 lg:flex-col lg:justify-between bg-white lg:my-4 lg:ml-4 ">
      <div className="hidden md:flex flex-col items-center gap-2 justify-center p-2 pt-8">
        <img
          className="h-8 w-8"
          src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          alt="logo"
        />
        <h1 className="text-apps-text font-semibold uppercase tracking-wider text-lg">
          Almuazaf
        </h1>
      </div>
      <div className="flex md:flex-col p-2 md:gap-8 md:justify-center justify-between items-center transition-all duration-300 ease-in-out w-full">
        <NavLink
          to="/"
          exact={true}
          className=" p-2 text-center text-apps-primary text-opacity-40 rounded-md hover:bg-apps-card transition-all duration-300 ease-in-out"
          activeClassName="text-apps-primary text-opacity-100 font-semibold ">
          <HomeIcon className="h-6 w-6 mx-auto" />
          <p className="text-sm mt-1">Home</p>
        </NavLink>
        <NavLink
          to="/modules"
          className=" p-2 text-center text-apps-primary text-opacity-40 rounded-md hover:bg-apps-card transition-all duration-300 ease-in-out"
          activeClassName="text-apps-primary text-opacity-100 font-semibold">
          <ViewGridIcon className="h-6 w-6 mx-auto" />
          <p className="text-sm mt-1">Mdodules</p>
        </NavLink>
        <NavLink
          to="/approval"
          className=" p-2 text-center text-apps-primary text-opacity-40 rounded-md hover:bg-apps-card transition-all duration-300 ease-in-out"
          activeClassName="text-apps-primary text-opacity-100 font-semibold">
          <ClipboardListIcon className="h-6 w-6 mx-auto" />
          <p className="text-sm mt-1">Approval</p>
        </NavLink>
        <NavLink
          to="/dashboard"
          className=" p-2 text-center text-apps-primary text-opacity-40 rounded-md hover:bg-apps-card transition-all duration-300 ease-in-out"
          activeClassName="text-apps-primary text-opacity-100 font-semibold">
          <ChartBarIcon className="h-6 w-6 mx-auto" />
          <p className="text-sm mt-1">Dashboard</p>
        </NavLink>
      </div>
      <div
        className="hidden md:flex items-center gap-1 p-4 text-apps-text text-opacity-40 cursor-pointer hover:bg-apps-blueCard"
        onClick={() => logOoutUser()}>
        <LogoutIcon className="h-8 w-8 p-1" />
        <h4 className="font-semibold">Logout</h4>
      </div>
    </nav>
  );
}
