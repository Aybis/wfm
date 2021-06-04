/** @format */

import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

import { Link } from "react-router-dom";

export default function CardStartLembur({ type, title, desc, desc2, link }) {
  let colorBackground = "bg-white";
  let colorTitle = "text-gray-600";
  let colorDesc = "text-gray-400";

  if (type === "in") {
    colorBackground = "bg-pink-500";
    colorTitle = "text-gray-100";
    colorDesc = "text-gray-200";
  } else if (type === "out") {
    colorBackground = "bg-yellow-400";
    colorTitle = "text-gray-50";
    colorDesc = "text-gray-100";
  }

  return (
    <Link
      to={link}
      className={`flex gap-2 justify-between items-center  p-4 rounded-lg mt-4 ${colorBackground}`}>
      <div className="flex flex-col gap-1 justify-start items-start w-11/12">
        <h4 className={`font-semibold ${colorTitle}`}>{title}</h4>
        <p className={`text-xs font-medium ${colorDesc}`}>
          {desc} - <span className="font-semibold"> {desc2}</span>
        </p>
      </div>
      <ChevronRightIcon className={`h-10 w-10 ${colorDesc}`} />
    </Link>
  );
}
