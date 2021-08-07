import Heading from 'components/atoms/Heading';
import CardReportKehadiran from 'components/molecules/CardReportKehadiran';
import CardReportWork from 'components/molecules/CardReportWork';
import FilterDate from 'components/molecules/FilterDate';
import React from 'react';
import MobileMenu from 'section/MobileMenu';

export default function Dashboard({ history }) {
  window.scroll(0, 0);

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
    <div className="relative lg:mt-12">
      <MobileMenu />
      <div className="relative">
        <h2 className="text-gray-700 font-semibold text-2xl lg:text-4xl">
          Dashboard
        </h2>
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
