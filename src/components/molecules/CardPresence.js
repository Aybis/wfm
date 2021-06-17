import React from "react";
import { Link } from "react-router-dom";

export default function CardPresence({ status, link }) {
  let btnClass = "bg-blue-400";
  let name = "";
  if (status) {
    btnClass = "bg-apps-red";
    name = "Check Out";
  } else {
    btnClass = "bg-apps-blue";
    name = "Check In";
  }

  return (
    <div
      className={`flex flex-col gap-2 py-4 px-6 rounded-lg mt-4 items-center bg-white`}>
      <h4 className="font-semibold text-apps-text">
        Let's go to {!status ? "work" : "home"}
      </h4>
      <Link
        to={link}
        className={`p-2 w-full rounded-lg text-white font-semibold text-center  ${btnClass}`}>
        <span className=" text-lg">{name}</span>
      </Link>
      <h4 className=" text-apps-text text-sm text-center">
        Budayakan disiplin presensi dari sekarang!
      </h4>
    </div>
  );
}
