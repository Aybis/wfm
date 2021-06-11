import React, { lazy, Suspense, useEffect, useState } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";

import MobileMenu from "section/MobileMenu";
import Heading from "components/atoms/Heading";
import FilterDate from "components/molecules/FilterDate";
import Loading from "components/atoms/Loading";
const ChartPie = lazy(() => import("components/atoms/ChartPie"));
const ChartBar = lazy(() => import("components/atoms/ChartBar"));

export default function Dashboard({ history }) {
  const [didMount, setdidMount] = useState(false);
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

  useEffect(() => {
    setdidMount(true);
    return () => {
      setdidMount(false);
    };
  }, []);

  if (!didMount) {
    return null;
  }

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
          <div className="overflow-x-auto hidden-scroll flex gap-4 mt-4 -ml-6 -mr-3 pl-6 pr-6">
            {/* card daily */}
            {Array.from(Array(6), (item, index) => (
              <div
                key={index}
                className={`flex flex-none flex-col rounded-lg w-40 gap-4 p-4 bg-white`}>
                <div className="flex flex-col items-start gap-4">
                  <ExclamationIcon className="h-10 w-10 rounded-md text-apps-orange bg-apps-orange bg-opacity-10 p-2" />
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-apps-text">Terlambat</h4>
                    <h6 className="text-apps-text text-opacity-40 text-sm">
                      123 Person
                    </h6>
                  </div>
                </div>
              </div>
            ))}
            {/* end card daily */}
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <Heading heading="Direktorat" />
          <div className="grid gap-4 mt-4">
            <Suspense
              fallback={
                <div className="flex justify-center items-center">
                  <Loading />
                </div>
              }>
              <ChartPie data={dataPie} title="Report Daily" id="daily" />

              <ChartBar
                data={dataBar}
                title="Report Daily Direktorat"
                id="dailyBar"
              />

              <ChartBar data={dataBar} title="Report Monthly" id="monthly" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
