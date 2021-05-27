/** @format */

import CardOvertimeApproval from "components/molecules/CardOvertimeApproval";
import React from "react";
import MobileMenu from "section/MobileMenu";

const documents = [
  {
    date: "Wednesday, 19 May",
    name: "Abdul Muchtar Astria",
    title: "Make design and flow mobile pop",
    hours: "4:72",
  },
  {
    date: "Tuesday, 18 May",
    name: "Ahmad Fauzi Hanif",
    title: "Make design and flow mobile pop and create backend presensi online",
    hours: "7 : 00",
  },
  {
    date: "Monday, 17 May",
    name: "Bayu Respati",
    title: "Make design and flow mobile pop",
    hours: "5 : 23",
  },
  {
    date: "Monday, 17 May",
    name: "Bayu Respati",
    title: "Make design and flow mobile pop",
    hours: "5 : 23",
  },
  {
    date: "Monday, 17 May",
    name: "Bayu Respati",
    title: "Make design and flow mobile pop",
    hours: "5 : 23",
  },
  {
    date: "Monday, 17 May",
    name: "Bayu Respati",
    title: "Make design and flow mobile pop",
    hours: "5 : 23",
  },
];

const Approval = () => {
  return (
    <div className="relative bg-gray-50 min-h-screen h-full p-6">
      <MobileMenu />
      <div className="relative mt-4 p-4">
        <h2 className="text-gray-700 font-semibold text-xl">
          List of Documents
        </h2>
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

      <div className="grid grid-cols-1 gap-4 content-center mt-10 mb-20">
        {documents.map((item, index) => (
          <CardOvertimeApproval
            key={index}
            date={item.date}
            hours={item.hours}
            name={item.name}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Approval;
