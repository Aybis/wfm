/** @format */

import { ClipboardCheckIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

const { ChevronLeftIcon } = require("@heroicons/react/solid");

const DetailApproval = ({ history }) => {
  const [popUp, setPopUp] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
    setTimeout(() => {
      setPopUp(!popUp);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-gray-100 min-h-screen h-full py-6">
      <div className="relative items-center text-center p-2 mx-6">
        <h1 className="text-xl font-semibold text-gray-800 tracking-wider">
          PREVIEW
        </h1>
        <ChevronLeftIcon
          className="absolute top-1 left-0 text-gray-600 bg-white p-1 h-8 w-8 rounded-md cursor-pointer"
          onClick={history.goBack}
        />
      </div>

      <div className="mt-8 flex flex-col justify-between gap-2 bg-white inset-x-0 rounded-lg mx-6">
        <div className="flex flex-col  gap-4 p-3">
          <div className="flex flex-col items-center">
            <img
              src="https://i.pravatar.cc/300"
              alt="foto"
              className="h-28 w-28 rounded-full border border-gray-200 p-1"
            />
            <h4 className="text-sm font-semibold text-gray-800">
              Abdul Muchtar Astria
            </h4>
            <h4 className="text-sm font-normal text-gray-400">IT Programmer</h4>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-medium text-blue-600">
              Subject Lembur
            </h4>
            <p className="text-xs font-light text-gray-400">
              Dolor nisi ea labore amet pariatur.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-medium text-blue-600">Detail Lembur</h4>
            <p className="text-xs font-light text-gray-400">
              Make Homepage, Make Report Page, Make Admin Page, Make Overtime
              Page, Make Check In and Out Page
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 bg-pink-400 justify-items-center p-2 rounded-b-lg">
          <div className="flex flex-col gap-1 text-xs text-center">
            <h4 className="text-gray-100 font-normal ">Start</h4>
            <h6 className="text-sm font-semibold text-white">19 : 03</h6>
          </div>
          <div className="flex flex-col gap-1 text-xs text-center">
            <h4 className="text-gray-100 font-normal ">Finish</h4>
            <h6 className="text-sm font-semibold text-white">24 : 53</h6>
          </div>
          <div className="flex flex-col gap-1 text-xs text-center">
            <h4 className="text-gray-100 font-normal ">Total</h4>
            <h6 className="text-sm font-semibold text-white">05 : 50</h6>
          </div>
        </div>
      </div>
      <div
        className={`fixed bg-white bottom-0 inset-x-0 rounded-t-2xl border-t border-gray-100 px-6 pt-4 transition-all duration-500 ${
          popUp ? "h-2/5" : "h-10"
        }`}>
        <hr
          className="w-20 border-2 border-gray-600 bg-gray-600 rounded-full mx-auto mb-2"
          onClick={() => setPopUp(!popUp)}
        />

        <div className="flex items-center">
          <ClipboardCheckIcon className="h-6 w-6 text-blue-400" />
          <h4 className="text-sm font-medium ml-1 text-gray-800">Approval</h4>
        </div>

        <div className="grid grid-cols-1 divide-y divide-gray-200 mt-6 gap-2 overflow-auto h-5/6">
          <div className="flex justify-between px-4 py-2">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/300"
                alt="approval"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-semibold text-gray-800">
                  Abdul Muchtar Astria
                </h4>
                <h4 className="text-xs font-medium text-blue-500">Submit</h4>
                <h4 className="text-xs font-light text-gray-400">
                  15, Desember 2021
                </h4>
              </div>
            </div>

            <div className=" flex items-end justify-end">
              <h4 className="text-xs font-light text-gray-400">01:12 AM</h4>
            </div>
          </div>

          <div className="flex justify-between px-4 py-2">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/300"
                alt="approval"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-semibold text-gray-800">
                  Junaidi Abdillah
                </h4>
                <h4 className="text-xs font-medium text-blue-500">Approve</h4>
                <h4 className="text-xs font-light text-gray-400">
                  15, Desember 2021
                </h4>
              </div>
            </div>

            <div className=" flex items-end justify-end">
              <h4 className="text-xs font-light text-gray-400">08:12 AM</h4>
            </div>
          </div>

          <div className="flex justify-between px-4 py-2">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/300"
                alt="approval"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-semibold text-gray-800">
                  Regina Lenggogeni
                </h4>
                <h4 className="text-xs font-medium text-pink-500 animate-pulse">
                  Progress
                </h4>
                <h4 className="text-xs font-light text-gray-400">
                  15, Desember 2021
                </h4>
              </div>
            </div>

            <div className=" flex items-end justify-end">
              <h4 className="text-xs font-light text-gray-400">02:12 PM</h4>
            </div>
          </div>

          <button className="relative inset-x-0 p-2 text-lg bg-blue-500 text-white font-semibold text-center rounded-md mt-8">
            Approve
          </button>
          <div className="mt-8">{""}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailApproval;
