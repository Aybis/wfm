import React from 'react';

export default function CardDayOffDesktop(props) {
  let setDate = new Date(props.data.tanggal);
  let getDateOnly = setDate.getDate();
  let getDayName = setDate.toLocaleDateString('id-ID', { weekday: 'long' });
  return (
    <tr className="leading-none text-gray-600 h-16 bg-gray-50 rounded-lg border-b border-gray-200 p-4">
      <td className="w-1/2">
        <div className="flex items-center px-4 py-4">
          <div className="w-12 h-12 bg-red-500 rounded-sm flex items-center justify-center">
            <p className="text-xl font-semibold leading-3 text-white">
              {getDateOnly}
            </p>
          </div>
          <div className="pl-4">
            <p className=" font-medium leading-none text-gray-800">
              {props.data.nama}
            </p>
            <p className="text-sm leading-3 text-gray-600 mt-2">
              Hari Libur Nasional
            </p>
          </div>
        </div>
      </td>
      <td className="pl-16 text-apps-primary hidden lg:table-cell">
        <p>Active</p>
      </td>
      <td className="hidden lg:table-cell">
        <p className="pl-16">{getDayName}</p>
      </td>
      <td className="hidden lg:table-cell">
        <p className="pl-16">Updated on {props.data.created_at}</p>
      </td>
    </tr>
  );
}
