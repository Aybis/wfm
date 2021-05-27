/** @format */

import { DownloadIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, DocumentAddIcon } from "@heroicons/react/solid";
import CardOvertime from "components/molecules/CardOvertime";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Overtime({ history }) {
  const [popUp, setPopUp] = useState(null);

  const overtimeDuty = {
    date: "Wednesday, 19 May",
    title: "Make design and flow mobile pop",
    hours: null,
    status: null,
  }

  const overtimes = [
    {
      date: "Wednesday, 19 May",
      title: "Make design and flow mobile pop",
      hours: "7 : 00",
      status: "done",
    },
    {
      date: "Tuesday, 18 May",
      title:
        "Make design and flow mobile pop and create backend presensi online",
      hours: "7 : 00",
      status: "done",
    },
    {
      date: "Monday, 17 May",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
      status: "leader",
    },{
        date: "Monday, 17 May",
        title: "Make design and flow mobile pop",
        hours: "5 : 23",
        status: "leader",
      },
      {
        date: "Monday, 17 May",
        title: "Make design and flow mobile pop",
        hours: "5 : 23",
        status: "leader",
      },
      {
        date: "Monday, 17 May",
        title: "Make design and flow mobile pop",
        hours: "5 : 23",
        status: "leader",
      },
  ];

    const height = window.innerHeight;

  useEffect(() => {
    setTimeout(() => {
      setPopUp(!popUp);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-gray-50 min-h-screen h-full p-6">
      <div className="flex justify-between items-center text-center p-2">
        <ChevronLeftIcon
          className="text-gray-600 bg-white p-1 h-8 w-8 rounded-md cursor-pointer"
          onClick={history.goBack}
        />
        <h1 className="text-xl font-semibold text-gray-800 tracking-wider">
          LEMBURAN
        </h1>
            <Link to="/overtime/in" className="flex flex-col items-center"> 
        <DocumentAddIcon className="h-5 w-5 text-gray-800" />
                {/* <p className="text-xs text-gray-400">Lembur</p> */}
            </Link>
      </div>
        <div className="">
        <CardOvertime
              date={overtimeDuty.date}
              hours={overtimeDuty.hours}
              status={overtimeDuty.status}
              title={overtimeDuty.title}
            />
        </div>

      <div className="grid grid-cols-2 mt-4 gap-2 justify-center items-center">
        <select className="p-2 bg-white border border-gray-100 rounded-lg ">
          <option value="">May</option>
          <option value="">June</option>
          <option value="">July</option>
          <option value="">Desember</option>
        </select>
        <select className="p-2 bg-white border border-gray-100 rounded-lg">
          <option value="">2020</option>
          <option value="">2021</option>
          <option value="">2022</option>
        </select>
      </div>

      <div className="flex  items-center gap-1 justify-center text-center mt-4 text-blue-600">
        <DownloadIcon className="h-5 w-5" />
        <h4 className="text-xs font-medium ">Download</h4>
      </div>

      <div className="grid grid-cols-1 gap-1 overflow-auto hidden-scroll h-full">
        {overtimes.map((item, index) => (
            <CardOvertime
              key={index}
              date={item.date}
              hours={item.hours}
              status={item.status}
              title={item.title}
            />
          ))}
        </div>

      {/* <div
        className={`fixed bottom-0 inset-x-0  rounded-t-2xl border-t border-gray-100 bg-white p-4  transition-all duration-500 `} style={{
            height: popUp ? height*0.70 : height*0.05
        }}>
        <hr
          className="w-20 border-2 border-gray-600 bg-gray-600 rounded-full mx-auto mb-4"
          onClick={() => setPopUp(!popUp)}
        />
        <div className="grid grid-cols-1 gap-1 overflow-auto hidden-scroll h-full mb-24 -mt-4">
        {overtimes.map((item, index) => (
            <CardOvertime
                border
              key={index}
              date={item.date}
              hours={item.hours}
              status={item.status}
              title={item.title}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}
