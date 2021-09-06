/** @format */

import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

import { Link } from "react-router-dom";

export default function CardStartLembur({
  type,
  title,
  time,
  link,
  date,
  border = false,
}) {
  return (
    <div
      className={`flex w-full justify-between bg-white p-4 mt-4 rounded-lg ${
        border && "border border-gray-200"
      }`}>
      <div className="flex flex-col gap-2 text-xs text-apps-text">
        <h4 className="font-medium text-apps-text text-opacity-20">{date}</h4>
        <h1 className="font-semibold">{title}</h1>
        <h4
          className={`font-semibold  ${
            time ? "text-apps-primary" : "text-apps-text text-opacity-40 "
          } `}>
          {time ? time : "-- : --"}
        </h4>
      </div>
      <div className="flex flex-col justify-center items-center right-0 gap-3">
        {type === "in" && (
          <h4
            className={`p-1 rounded text-center text-xs bg-apps-green bg-opacity-10 text-apps-green`}>
            Available
          </h4>
        )}

        <Link to={link} className="ml-7">
          <ChevronRightIcon className="h-8 w-8 text-apps-primary   bg-apps-primary bg-opacity-10 p-1 rounded" />
        </Link>
      </div>
    </div>
  );
}
