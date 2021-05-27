/** @format */

import {
  ChartBarIcon,
  ClipboardListIcon,
  HomeIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import React from "react";
import { NavLink } from "react-router-dom";

export default function MobileMenu() {
  return (
    <div>
      {/* <!--   mobile menu bar  --> */}
      <div className="bg-white flex justify-between fixed z-50 bottom-0 inset-x-0 lg:hidden rounded-t-xl h-20 p-2">
        <NavLink
          to="/"
          exact={true}
          className=" p-2 text-center text-gray-300"
          activeClassName="text-blue-600 font-semibold">
          <HomeIcon className="h-6 w-6 mx-auto" />
          <p className="text-xs mt-1">Home</p>
        </NavLink>
        <NavLink
          to="/modules"
          className=" p-2 text-center text-gray-300"
          activeClassName="text-blue-600 font-semibold">
          <ViewGridIcon className="h-6 w-6 mx-auto" />
          <p className="text-xs mt-1">Mdodules</p>
        </NavLink>
        <NavLink
          to="/approval"
          className=" p-2 text-center text-gray-300"
          activeClassName="text-blue-600 font-semibold">
          <ClipboardListIcon className="h-6 w-6 mx-auto" />
          <p className="text-xs mt-1">Approval</p>
        </NavLink>
        <NavLink
          to="/dashboard"
          className=" p-2 text-center text-gray-300"
          activeClassName="text-blue-600 font-semibold">
          <ChartBarIcon className="h-6 w-6 mx-auto" />
          <p className="text-xs mt-1">Dashboard</p>
        </NavLink>
      </div>
    </div>
  );
}
