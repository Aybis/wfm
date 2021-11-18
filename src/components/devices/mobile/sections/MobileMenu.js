import {
  ChartBarIcon,
  ClipboardListIcon,
  HomeIcon,
  UserIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';

export default function MobileMenu() {
  return (
    isMobile && (
      <div className="fixed z-30 bottom-0 inset-x-0 ">
        <div className="bg-white shadow-2xl flex justify-between items-center lg:mx-4 px-6 mb-0 py-1 border-t-2 border-coolGray-100">
          <NavLink
            to="/"
            exact={true}
            className="rounded-md p-2 text-center text-apps-primary text-opacity-30 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold ">
            <HomeIcon className="h-5 w-5 mx-auto" />
            <p className="text-xs mt-1">Home</p>
          </NavLink>
          <NavLink
            to="/modules"
            className="hidden rounded-md p-2 text-center text-apps-primary text-opacity-30 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ViewGridIcon className="h-5 w-5 mx-auto" />
            <p className="text-xs mt-1">Modules</p>
          </NavLink>
          <NavLink
            to="/approval"
            className="rounded-md p-2 text-center text-apps-primary text-opacity-30 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ClipboardListIcon className="h-5 w-5 mx-auto" />
            <p className="text-xs mt-1">Approval</p>
          </NavLink>
          <NavLink
            to="/dashboard"
            className="rounded-md p-2 text-center text-apps-primary text-opacity-30 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ChartBarIcon className="h-5 w-5 mx-auto" />
            <p className="text-xs mt-1">Dashboard</p>
          </NavLink>
          <NavLink
            to="/profile"
            className="rounded-md p-2 text-center text-apps-primary text-opacity-30 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <UserIcon className="h-5 w-5 mx-auto" />
            <p className="text-xs mt-1">Me</p>
          </NavLink>
        </div>
      </div>
    )
  );
}
