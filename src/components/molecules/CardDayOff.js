/** @format */

import React from "react";

export default function CardDayOff({ date, month, title, detail, day }) {
  return (
    <div className="flex w-full  items-center bg-white px-4 py-2 mt-4 rounded-md divide-x-2 divide-coolGray-200 divide-dashed">
      <div className="flex flex-col items-center px-2 pr-4">
        <h4 className="text-apps-red font-semibold text-opacity-60">{date}</h4>
        <h4 className="text-apps-red font-regular text-sm text-opacity-40 capitalize">
          {month}
        </h4>
      </div>
      <div className="flex flex-col items-start px-4">
        <h2 className="text-apps-text font-medium text-sm capitalize">
          {title}
        </h2>
        <h5 className="text-apps-text text-opacity-40 text-xs">
          {`${detail} - ${day}`}
        </h5>
      </div>
    </div>
  );
}
