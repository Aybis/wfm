/** @format */

import { DownloadIcon } from "@heroicons/react/outline";
import React from "react";

export default function Download({ onClick }) {
  return (
    <button
      className="flex flex-col items-center justify-center rounded bg-blue-400 p-1"
      onClick={onClick}>
      <DownloadIcon className="h-4 w-4 text-white" />
    </button>
  );
}
