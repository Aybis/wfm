import convertDate from 'helpers/hooks/convertDate';
import React, { useState } from 'react';

export default function ChildTable(props) {
  const [show, setShow] = useState(null);

  return (
    <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
      <td className="pl-4 cursor-pointer">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-red-500 text-2xl font-semibold flex items-center justify-center text-white">
            {convertDate('dateOnly', props.data.tanggal)}
          </div>
          <div className="pl-4">
            <h4 className="font-medium">{props.data.nama}</h4>
            <h4 className="text-xs leading-3 text-gray-600 pt-2">
              Libur Nasional
            </h4>
          </div>
        </div>
      </td>
      <td className="pl-12">
        <h4 className="text-sm font-medium leading-none text-gray-800">
          {convertDate('day', props.data.tanggal)}
        </h4>
        <h4 className="text-xs leading-3 text-gray-600 mt-2">
          {convertDate('longMonth', props.data.tanggal)}
        </h4>
      </td>
      <td className="pl-12">
        <h4 className="font-medium">Active</h4>
        <h4 className="text-xs leading-3 text-gray-600 mt-2">
          Dapat berubah kapanpun
        </h4>
      </td>
      <td className="pl-20">
        <h4 className="font-medium">Selasa</h4>
        <h4 className="text-xs leading-3 text-gray-600 mt-2">24 Mei 2021</h4>
      </td>
      <td className="pl-16">
        <div className="flex items-center">
          <img
            alt=""
            className="shadow-md w-8 h-8 rounded-full"
            src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png"
          />
          <img
            alt=""
            className="shadow-md w-8 h-8 rounded-full -ml-2"
            src="https://cdn.tuk.dev/assets/templates/olympus/projects(9).png"
          />
          <img
            alt=""
            className="shadow-md w-8 h-8 rounded-full -ml-2"
            src="https://cdn.tuk.dev/assets/templates/olympus/projects(10).png"
          />
          <img
            alt=""
            className="shadow-md w-8 h-8 rounded-full -ml-2"
            src="https://cdn.tuk.dev/assets/templates/olympus/projects(11).png"
          />
        </div>
      </td>
      <td className="px-7 2xl:px-0">
        {show === 0 ? (
          <button
            onClick={() => setShow(null)}
            className="focus:outline-none pl-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none">
              <path
                d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                stroke="#A1A1AA"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                stroke="#A1A1AA"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                stroke="#A1A1AA"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setShow(0)}
            className="focus:outline-none pl-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none">
              <path
                d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                stroke="#A1A1AA"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                stroke="#A1A1AA"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                stroke="#A1A1AA"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {show === 0 && (
          <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 ">
            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
              <h4>Edit</h4>
            </div>
            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
              <h4>Delete</h4>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}
