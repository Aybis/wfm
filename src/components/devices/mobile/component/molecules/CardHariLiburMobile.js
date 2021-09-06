import convertDate from 'helpers/hooks/convertDate';
import React from 'react';

export default function CardHariLiburMobile(props) {
  return (
    <div className="flex gap-4 bg-white rounded-lg h-20 items-center pl-3">
      <div className="bg-red-500 text-white w-16 h-16 flex flex-col justify-center items-center gap-2 rounded p-4">
        <h1 className="text-lg font-semibold leading-3">
          {convertDate('dateOnly', props.data.tanggal)}
        </h1>
        <h2 className="leading-3 text-sm font-light">
          {convertDate('longMonth', props.data.tanggal)}
        </h2>
      </div>

      <div className="py-3 pr-3">
        <p className=" font-medium leading-none text-gray-800">
          {props.data.nama}
        </p>
        <p className="text-sm leading-3 text-gray-600 mt-2">
          Hari Libur Nasional
        </p>
      </div>
    </div>
  );
}
