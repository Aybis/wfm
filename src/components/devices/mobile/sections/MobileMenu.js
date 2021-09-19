import {
  ChartBarIcon,
  ClipboardListIcon,
  HomeIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';

export default function MobileMenu() {
  return (
    isMobile && (
      <div className="fixed z-30 bottom-0 inset-x-0 ">
        <div className="bg-white shadow-2xl flex justify-between items-center lg:mx-4 mt-4 mb-0 p-2">
          <NavLink
            to="/"
            exact={true}
            className="rounded-md p-2 text-center text-apps-primary text-opacity-40 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold ">
            <HomeIcon className="h-6 w-6 mx-auto" />
            <p className="text-sm mt-1">Home</p>
          </NavLink>
          <NavLink
            to="/modules"
            className="rounded-md p-2 text-center text-apps-primary text-opacity-40 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ViewGridIcon className="h-6 w-6 mx-auto" />
            <p className="text-sm mt-1">Modules</p>
          </NavLink>
          <NavLink
            to="/approval"
            className="rounded-md p-2 text-center text-apps-primary text-opacity-40 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ClipboardListIcon className="h-6 w-6 mx-auto" />
            <p className="text-sm mt-1">Approval</p>
          </NavLink>
          <NavLink
            to="/dashboard"
            className="rounded-md p-2 text-center text-apps-primary text-opacity-40 hover:bg-apps-card transition-all duration-300 ease-in-out"
            activeClassName="text-apps-primary text-opacity-100 font-semibold">
            <ChartBarIcon className="h-6 w-6 mx-auto" />
            <p className="text-sm mt-1">Dashboard</p>
          </NavLink>
        </div>
      </div>
    )
  );
}
