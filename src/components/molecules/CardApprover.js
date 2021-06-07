/** @format */

import { UserCircleIcon } from "@heroicons/react/solid";
import React from "react";

export default function CardApprover({ image, name, status, date, time }) {
  return (
    <div className="flex justify-between p-2 border-b border-gray-200">
      <div className="flex items-center gap-2">
        {image ? (
          <img src={image} alt="approval" className="h-12 w-12 rounded-full" />
        ) : (
          <UserCircleIcon className="h-12 w-12 rounded-full" />
        )}
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-semibold text-apps-text">{name}</h4>
          <h4
            className={`text-xs font-medium  ${
              status ? "text-apps-primary" : "text-apps-orange"
            }`}>
            {`${status ? "Approve" : "Progress"}`}
          </h4>
          <h4 className="text-xs font-light text-apps-text text-opacity-40">
            {date}
          </h4>
        </div>
      </div>

      <div className=" flex items-end justify-end">
        <h4 className="text-xs font-light text-apps-text text-opacity-30">
          {time}
        </h4>
      </div>
    </div>
  );
}
