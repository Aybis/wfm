/** @format */

import React from "react";
import { Link } from "react-router-dom";

export default function CardPresence({ status, link }) {
  let btnClass = "bg-blue-400";
  let name = "";
  if (status) {
    btnClass = "bg-yellow-400";
    name = "Check Out";
  } else {
    btnClass = "bg-pink-500";
    name = "Check In";
  }

  return (
    <div className="flex flex-col gap-2 py-4 px-6  bg-white rounded-lg mt-4 items-center">
      <h4 className="font-semibold text-gray-800">
        Let's go to {!status ? "work" : "home"}
      </h4>
      <Link
        to={link}
        className={`p-2 w-full rounded-lg text-white font-semibold text-center  ${btnClass}`}>
        <span className="animate-pulse">{name}</span>
      </Link>
      <h4 className="font-medium text-gray-600 text-xs">
        Budayakan disiplin presensi dari sekarang!
      </h4>
    </div>
  );
}
