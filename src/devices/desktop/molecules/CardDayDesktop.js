import React from 'react';

export default function CardDayDesktop(props) {
  const isCheckIn = Object.entries(props.data.dataIn).length === 0;

  return (
    <div className="grid grid-cols-5 gap-4 w-full rounded-lg border-2 p-2">
      <div
        className={`flex flex-col gap-2 col-span-2 justify-start text-left p-3 ${
          isCheckIn ? 'text-gray-800' : 'text-gray-50'
        }`}>
        <h1 className="font-semibold text-xl">Home</h1>
        <h2 className="text-sm font-medium">{props.data.dataIn.lokasi}</h2>
      </div>
      {/* icon */}
      <div className="flex justify-center items-center pl-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-200 text-opacity-40 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      </div>
      {/* out  */}
      <div
        className={`flex flex-col gap-2 col-span-2 justify-start text-right p-3 ${
          isCheckIn ? 'text-gray-800' : 'text-gray-800'
        }`}>
        <h1 className="font-semibold text-xl">
          {props.data.data.kehadiran ?? 'Belum Absen'}
        </h1>
        <h2 className="text-sm font-medium">
          {props.data.dataOut.lokasi ?? ''}
        </h2>
      </div>
    </div>
  );
}
