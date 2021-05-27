/** @format */

import { DownloadIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import CardDay from "components/molecules/CardDay";
import React, { useState } from "react";

export default function Presensi({ history }) {
  const [popUp, setPopUp] = useState(null);

  const reports = [
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
  ];

  return (
    <div className="relative bg-gray-50 min-h-screen h-full p-6">
      <div className="relative items-center text-center p-2">
        <h1 className="text-xl font-semibold text-gray-800 tracking-wider">
          PRESENSI
        </h1>
        <ChevronLeftIcon
          className="absolute top-1 left-0 text-gray-600 bg-white p-1 h-8 w-8 rounded-md cursor-pointer"
          onClick={history.goBack}
        />
      </div>

      <div className="grid grid-cols-2 mt-8 gap-2 justify-center items-center">
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

      <div className="flex items-center gap-1 justify-center text-center mt-4 text-blue-600">
        <DownloadIcon className="h-6 w-6" />
        <h4 className="text-sm font-medium ">Download</h4>
      </div>

      <div
        className={`fixed bottom-0 inset-x-0  rounded-t-2xl border-t border-gray-100 bg-white p-4 transition-all duration-500 ${
          popUp ? "h-3/4" : "h-10"
        }`}>
        <hr
          className="w-20 border-2 border-gray-600 bg-gray-600 rounded-full mx-auto mb-2"
          onClick={() => setPopUp(!popUp)}
        />
        <div className="grid grid-cols-1 gap-4 overflow-auto h-full mt-4 mb-12">
          {reports.map((report, index) => (
            <CardDay
              key={index}
              border
              date={report.date}
              locIn={report.locIn}
              locOut={report.locOut}
              timeIn={report.in}
              timeOut={report.out}
              type={report.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
