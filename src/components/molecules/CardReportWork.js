import { GlobeIcon } from "@heroicons/react/outline";
import { HomeIcon, OfficeBuildingIcon } from "@heroicons/react/solid";
import React from "react";

export default function CardReportWork({ day, name }) {
  let classBackgroundCard = "bg-apps-pink";

  if (name === "WFH") {
    classBackgroundCard = "bg-apps-pink";
  } else if (name === "WFO") {
    classBackgroundCard = "bg-apps-orange";
  } else if (name === "Satelit") {
    classBackgroundCard = "bg-apps-purple";
  } else {
    classBackgroundCard = "bg-apps-pink";
  }

  const IconName = () => {
    if (name === "WFH") {
      return (
        <HomeIcon className="w-9 h-9 text-apps-pink rounded-lg bg-apps-pink bg-opacity-10 p-2" />
      );
    } else if (name === "WFO") {
      return (
        <OfficeBuildingIcon className="w-9 h-9 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10 p-2" />
      );
    } else if (name === "Satelit") {
      return (
        <GlobeIcon className="w-9 h-9 text-apps-purple rounded-lg bg-apps-purple bg-opacity-10 p-2" />
      );
    } else {
      return null;
    }
  };

  return (
    <div className={`flex rounded-lg w-full pr-4 ${classBackgroundCard} `}>
      <div className="flex gap-4 bg-white p-4 w-full rounded-lg">
        <IconName />
        <div className="flex gap-4 justify-center items-center">
          <h6 className="text-apps-text text-2xl font-semibold">
            {day}{" "}
            <small className="text-xs text-apps-text text-opacity-40 font-light">
              Days
            </small>
          </h6>
          <h4 className="font-medium text-apps-text text-sm text-opacity-50 capitalize">
            {name}
          </h4>
        </div>
      </div>
    </div>
  );
}
