import React, { lazy, Suspense } from "react";

import MobileMenu from "section/MobileMenu";
import Heading from "components/atoms/Heading";
import FilterDate from "components/molecules/FilterDate";
import CardReportKehadiran from "components/molecules/CardReportKehadiran";
import CardReportWork from "components/molecules/CardReportWork";

const ChartPie = lazy(() => import("components/atoms/ChartPie"));
const ChartBar = lazy(() => import("components/atoms/ChartBar"));

export default function Dashboard({ history }) {
  window.scroll(0, 0);

  const dataBar = [
    {
      status: "OPR",
      hadir: 200,
      keterangan: 40,
      "tidak hadir": 50,
      terlambat: 20,
    },
    {
      status: "Non. D",
      hadir: 100,
      keterangan: 10,
      "tidak hadir": 5,
      terlambat: 40,
    },
    {
      status: "MSS",
      hadir: 187,
      keterangan: 60,
      "tidak hadir": 5,
      terlambat: 120,
    },
    {
      status: "FBS",
      hadir: 130,
      keterangan: 50,
      "tidak hadir": 5,
      terlambat: 80,
    },
  ];

  const dataPie = [
    {
      unit: "OPS",
      person: 101,
    },
    {
      unit: "Non.D",
      person: 201,
    },
    {
      unit: "MSS",
      person: 41,
    },
    {
      unit: "FBS",
      person: 65,
    },
  ];

  const reportMe = [
    {
      status: "hadir",
      hari: 13,
    },
    {
      status: "telat",
      hari: 13,
    },
    {
      status: "izin",
      hari: 13,
    },
    {
      status: "sakit",
      hari: 13,
    },
    {
      status: "sppd",
      hari: 13,
    },
    {
      status: "cuti",
      hari: 13,
    },
  ];

  const workMe = [
    {
      status: "WFH",
      hari: 15,
    },
    {
      status: "WFO",
      hari: 4,
    },
    {
      status: "Satelit",
      hari: 1,
    },
  ];

  return (
    <div className="relative bg-coolGray-50  min-h-screen h-full">
      <div className="relative h-full min-h-screen p-6 pb-32">
        <MobileMenu />
        <div className="relative mt-4 p-4">
          <h2 className="text-apps-text font-semibold text-xl">
            Dashboard Presensi
          </h2>
        </div>
        <FilterDate />

        <div className="flex flex-col mt-8">
          <Heading heading="Presensi Daily" />
          <div className="overflow-x-auto hidden-scroll flex gap-4 mt-4 sm:grid sm:grid-cols-3 md:grid-cols-6 transition-all duration-300 ease-in-out">
            {/* card daily */}
            {reportMe.map((item, index) => (
              <CardReportKehadiran
                key={index}
                hari={item.hari}
                name={item.status}
              />
            ))}
            {/* end card daily */}
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-semibold text-apps-text ">Resume Work</h2>
          <div className="overflow-x-auto hidden-scroll flex gap-4 mt-4 sm:grid sm:grid-cols-3 md:grid-cols-6 transition-all duration-300 ease-in-out">
            {/* card daily */}
            {workMe.map((item, index) => (
              <CardReportWork key={index} day={item.hari} name={item.status} />
            ))}
            {/* end card daily */}
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <Heading heading="Direktorat" />
          <div className="grid gap-4 mt-4">
            <Suspense fallback={<p>Loading ....</p>}>
              <ChartPie data={dataPie} title="Report Daily" id="daily" />
            </Suspense>

            <Suspense fallback={<p>Loading ....</p>}>
              <ChartBar
                data={dataBar}
                title="Report Daily Direktorat"
                id="dailyBar"
              />
            </Suspense>

            <Suspense fallback={<p>Loading ....</p>}>
              <ChartBar data={dataBar} title="Report Monthly" id="monthly" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
