import {
  ChartBarIcon,
  ClipboardListIcon,
  HomeIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MobileMenu() {
  return (
    <div className="fixed z-30 bottom-8 inset-x-0 ">
      <div className="bg-white shadow-sm flex justify-between items-center mx-4 mt-4 mb-0 p-2 rounded-2xl ">
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
          <p className="text-sm mt-1">Mdodules</p>
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
  );
}
