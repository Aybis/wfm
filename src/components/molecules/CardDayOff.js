/** @format */

import React from "react";

export default function CardDayOff({ date, month, title, detail, day }) {
  return (
    <div className="flex w-full  items-center bg-white px-4 py-2 mt-4 rounded-md divide-x-2 divide-coolGray-200 divide-dashed border-l-4 border-apps-red">
      <div className="flex flex-col items-center px-2 pr-4">
        <h4 className="text-apps-red text-lg font-semibold">{date}</h4>
        <h4 className="text-apps-red font-medium text-opacity-40 capitalize -mt-1">
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
