/** @format */

import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import React from "react";

const CardTeam = ({ name, timeIn, thumbnail }) => {
  const onClickSendWA = (name) => {
    alert(`auto Send WA ke ${name}`);
  };

  return (
    <div
      className={`flex flex-none flex-col justify-between max-w-xl h-auto rounded-lg p-4 bg-white`}
      style={{ minWidth: "10rem" }}>
      <div className="flex flex-col items-center">
        <img
          src={thumbnail}
          alt={name}
          className={`h-24 w-24 rounded-full border p-1 ${
            timeIn ? "border-blue-200" : "border-pink-200"
          }`}
        />
        {timeIn ? (
          <HomeIcon className=" p-2 text-white h-8 w-8 rounded-full bg-apps-primary text-center -mt-4" />
        ) : (
          <div className="-mt-4 ">
            <PaperAirplaneIcon
              onClick={() => onClickSendWA(name)}
              className=" p-2 text-white h-8 w-8 rounded-full bg-apps-red transform rotate-45 text-center cursor-pointer hover:bg-red-600"
            />
          </div>
        )}

        <h3 className="text-sm font-medium text-gray-800 transform capitalize mt-2">
          {name.toLowerCase()}
        </h3>

        <h2
          className={`text-sm font-semibold mt-1 ${
            timeIn ? "text-apps-primary " : "text-apps-red animate-pulse"
          }`}>
          {timeIn ? timeIn : "Belum Absen"}
        </h2>
      </div>
    </div>
  );
};

export default CardTeam;
