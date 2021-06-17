import React from "react";
import {
  ArchiveIcon,
  BeakerIcon,
  BriefcaseIcon,
  ClipboardCheckIcon,
  ExclamationCircleIcon,
  PhoneMissedCallIcon,
} from "@heroicons/react/solid";

export default function CardReportKehadiran({ name, hari }) {
  const IconName = () => {
    if (name === "hadir") {
      return (
        <ClipboardCheckIcon className="w-10 h-10 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 p-2" />
      );
    } else if (name === "telat") {
      return (
        <ExclamationCircleIcon className="w-10 h-10 text-apps-red rounded-lg bg-apps-red bg-opacity-10 p-2" />
      );
    } else if (name === "sakit") {
      return (
        <BeakerIcon className="w-10 h-10 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10 p-2" />
      );
    } else if (name === "izin") {
      return (
        <ArchiveIcon className="w-10 h-10 text-apps-purple rounded-lg bg-apps-purple bg-opacity-10 p-2" />
      );
    } else if (name === "cuti") {
      return (
        <PhoneMissedCallIcon className="w-10 h-10 text-apps-pink rounded-lg bg-apps-pink bg-opacity-10 p-2" />
      );
    } else if (name === "sppd") {
      return (
        <BriefcaseIcon className="w-10 h-10 text-apps-green rounded-lg bg-apps-green bg-opacity-10 p-2" />
      );
    } else {
      return (
        <ClipboardCheckIcon className="w-10 h-10 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 p-2" />
      );
    }
  };

  return (
    <div
      className={`flex flex-none flex-col rounded-xl w-2/5 sm:w-auto gap-4 p-4 bg-white`}>
      <div className="flex flex-col items-start gap-4">
        <IconName />
        <div className="flex flex-col">
          <h4 className="font-semibold text-apps-text capitalize text-sm">
            {name}
          </h4>
          <h6 className="text-apps-text text-opacity-40 text-sm font-medium">
            {hari} {name === "Work Hour" ? "Hours" : "Days"}
          </h6>
        </div>
      </div>
    </div>
  );
}
