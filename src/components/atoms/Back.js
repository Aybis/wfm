/** @format */

import { ChevronLeftIcon } from "@heroicons/react/solid";
import React from "react";

export default function Back({ link }) {
  return (
    <ChevronLeftIcon
      className="text-gray-600 bg-white p-1 h-8 w-8 rounded-md cursor-pointer"
      onClick={link}
    />
  );
}
