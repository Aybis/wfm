/** @format */

import {
  CashIcon,
  ClockIcon,
  FingerPrintIcon,
  IdentificationIcon,
  LightningBoltIcon,
  MapIcon,
  PhoneMissedCallIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import MobileMenu from "section/MobileMenu";

const Modules = () => {
  return (
    <div className="relative bg-gray-50 min-h-screen h-full p-6">
      <MobileMenu />

      <div className="relative mt-4 p-4">
        <h2 className="text-gray-700 font-semibold text-xl">List of Modules</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 content-center mt-10">
        <Link
          to="/presensi"
          className="flex flex-col bg-blue-100 items-center p-4 justify-center rounded-lg">
          <FingerPrintIcon className="p-2 h-16 w-16 text-blue-600 rounded-full bg-white " />
          <h4 className="font-semibold text-blue-600 text-sm text-left mt-2">
            Presensi
          </h4>
        </Link>
        <Link to="/overtime" className="flex flex-col bg-pink-100 items-center p-4 justify-center rounded-lg">
          <ClockIcon className="p-2 h-16 w-16 text-pink-600 rounded-full bg-white " />
          <h4 className="font-semibold text-pink-600 text-sm text-left mt-2">
            Lemburan
          </h4>
        </Link>
        <div className="flex flex-col bg-green-100 items-center p-4 justify-center rounded-lg">
          <UserGroupIcon className="p-2 h-16 w-16 text-green-600 rounded-full bg-white " />
          <h4 className="font-semibold text-green-600 text-sm text-left mt-2">
            Inforekan
          </h4>
        </div>
        <div className="flex flex-col bg-yellow-100 items-center p-4 justify-center rounded-lg">
          <LightningBoltIcon className="p-2 h-16 w-16 text-yellow-600 rounded-full bg-white " />
          <h4 className="font-semibold text-yellow-600 text-sm text-left mt-2">
            Hari Libur
          </h4>
        </div>
        <div className="flex flex-col bg-indigo-100 items-center p-4 justify-center rounded-lg">
          <CashIcon className="p-2 h-16 w-16 text-indigo-600 rounded-full bg-white " />
          <h4 className="font-semibold text-indigo-600 text-sm text-left mt-2">
            Reimburse
          </h4>
        </div>
        <div className="flex flex-col bg-purple-100 items-center p-4 justify-center rounded-lg">
          <PhoneMissedCallIcon className="p-2 h-16 w-16 text-purple-600 rounded-full bg-white " />
          <h4 className="font-semibold text-purple-600 text-sm text-left mt-2">
            Cuti
          </h4>
        </div>
        <div className="flex flex-col bg-teal-100 items-center p-4 justify-center rounded-lg">
          <MapIcon className="p-2 h-16 w-16 text-teal-600 rounded-full bg-white " />
          <h4 className="font-semibold text-teal-600 text-sm text-left mt-2">
            SPPD
          </h4>
        </div>
        <div className="flex flex-col bg-cyan-100 items-center p-4 justify-center rounded-lg">
          <IdentificationIcon className="p-2 h-16 w-16 text-cyan-600 rounded-full bg-white " />
          <h4 className="font-semibold text-cyan-600 text-sm text-left mt-2">
            Me
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Modules;
