import React, { lazy, Suspense } from 'react';

import MobileMenu from 'section/MobileMenu';
import Heading from 'components/atoms/Heading';
import FilterDate from 'components/molecules/FilterDate';
import CardReportKehadiran from 'components/molecules/CardReportKehadiran';
import CardReportWork from 'components/molecules/CardReportWork';

const ChartPie = lazy(() => import('components/atoms/ChartPie'));
const ChartBar = lazy(() => import('components/atoms/ChartBar'));

export default function Dashboard({ history }) {
  window.scroll(0, 0);

  const dataBar = [
    {
      status: 'OPR',
      hadir: 200,
      keterangan: 40,
      'tidak hadir': 50,
      terlambat: 20,
    },
    {
      status: 'Non. D',
      hadir: 100,
      keterangan: 10,
      'tidak hadir': 5,
      terlambat: 40,
    },
    {
      status: 'MSS',
      hadir: 187,
      keterangan: 60,
      'tidak hadir': 5,
      terlambat: 120,
    },
    {
      status: 'FBS',
      hadir: 130,
      keterangan: 50,
      'tidak hadir': 5,
      terlambat: 80,
    },
  ];

  const dataPie = [
    {
      unit: 'OPS',
      person: 101,
    },
    {
      unit: 'Non.D',
      person: 201,
    },
    {
      unit: 'MSS',
      person: 41,
    },
    {
      unit: 'FBS',
      person: 65,
    },
  ];

  const reportMe = [
    {
      status: 'presensi',
      hari: 13,
    },
    {
      status: 'telat',
      hari: 13,
    },
    {
      status: 'tidak absen',
      hari: 13,
    },
  ];

  const workMe = [
    {
      status: 'WFH',
      hari: 15,
    },
    {
      status: 'WFO',
      hari: 4,
    },
    {
      status: 'Satelit',
      hari: 1,
    },
  ];

  return (
    <div className="relative">
      <MobileMenu />
      <div className="relative">
        <h2 className="text-apps-text font-semibold text-2xl">Dashboard</h2>
      </div>
      <FilterDate />

      <div className="flex flex-col mt-8">
        <Heading heading="Report Absensi" />
        <div className="overflow-x-auto hidden-scroll flex gap-4 py-3 mt-4 lg:grid lg:grid-cols-3 transition-all duration-300 ease-in-out">
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
        <Heading heading="Report Kehadiran" />
        <div className="overflow-x-auto hidden-scroll flex gap-4 py-3 mt-4 sm:grid sm:grid-cols-3 transition-all duration-300 ease-in-out">
          {/* card daily */}
          {workMe.map((item, index) => (
            <CardReportWork key={index} day={item.hari} name={item.status} />
          ))}
          {/* end card daily */}
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <Heading heading="Direktorat" />
        <div className="grid lg:grid-cols-2 gap-4 mt-4"></div>
      </div>
    </div>
  );
}
