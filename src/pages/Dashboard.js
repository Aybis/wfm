import {
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from '@heroicons/react/solid';
import Heading from 'components/devices/desktop/atoms/Heading';
import Menu from 'components/devices/desktop/section/Menu';
import MobileMenu from 'components/devices/mobile/sections/MobileMenu';
import ChartBarGroup from 'components/devices/universal/atoms/ChartBarGroup';
import ChartDoughnut from 'components/devices/universal/atoms/ChartDoughnut';
import Table from 'components/devices/universal/molecules/Table';
import React from 'react';
import { isDesktop } from 'react-device-detect';

export default function Dashboard() {
  window.scroll(0, 0);

  return (
    <div className="relative w-full h-screen bg-coolGray-100">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 mb-20 lg:mb-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-32'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        <MobileMenu />
        <div className="relative hidden">
          <h2 className="text-gray-700 font-semibold text-2xl lg:text-4xl">
            Dashboard Absensi
          </h2>
        </div>

        {/* Section Report Harian */}
        <div className="relative mt-4">
          <Heading heading="Report Harian" />

          {/* Report Harian */}
          <div className="flex overflow-x-auto hidden-scroll sm:grid sm:grid-cols-2 lg:grid-cols-4  gap-4 py-4 mt-4 rounded-lg">
            <div className="flex justify-between items-center gap-1 w-2/3 sm:w-auto flex-none sm:flex-1 h-auto py-4 px-6 bg-white rounded-lg">
              <div className="flex flex-col">
                <h4 className="text-sm sm:text-base font-medium text-gray-400">
                  At Office
                </h4>
                <h1 className="text-2xl tracking-wide sm:text-4xl font-bold text-gray-800">
                  300
                </h1>
                <h5 className="text-sm text-gray-500 font-light sm:tracking-wide">
                  Karyawan
                </h5>
              </div>
              <OfficeBuildingIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-primary text-opacity-50" />
            </div>
            <div className="flex justify-between items-center gap-1 w-2/3 sm:w-auto flex-none sm:flex-1 h-auto py-4 px-6 bg-white rounded-lg">
              <div className="flex flex-col">
                <h4 className="text-sm sm:text-base font-medium text-gray-400">
                  At Home
                </h4>
                <h1 className="text-2xl tracking-wide sm:text-4xl font-bold text-gray-800">
                  300
                </h1>
                <h5 className="text-sm text-gray-500 font-light sm:tracking-wide">
                  Karyawan
                </h5>
              </div>
              <HomeIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-green text-opacity-50" />
            </div>
            <div className="flex justify-between items-center gap-1 w-2/3 sm:w-auto flex-none sm:flex-1 h-auto py-4 px-6 bg-white rounded-lg">
              <div className="flex flex-col">
                <h4 className="text-sm sm:text-base font-medium text-gray-400">
                  At Satelit
                </h4>
                <h1 className="text-2xl tracking-wide sm:text-4xl font-bold text-gray-800">
                  300
                </h1>
                <h5 className="text-sm text-gray-500 font-light sm:tracking-wide">
                  Karyawan
                </h5>
              </div>
              <GlobeAltIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-yellow text-opacity-50" />
            </div>
            <div className="flex justify-between items-center gap-1 w-2/3 sm:w-auto flex-none sm:flex-1 h-auto py-4 px-6 bg-white rounded-lg">
              <div className="flex flex-col">
                <h4 className="text-sm sm:text-base font-medium text-gray-400">
                  Late
                </h4>
                <h1 className="text-2xl tracking-wide sm:text-4xl font-bold text-gray-800">
                  300
                </h1>
                <h5 className="text-sm text-gray-500 font-light sm:tracking-wide">
                  Karyawan
                </h5>
              </div>
              <ClockIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-red text-opacity-50" />
            </div>
          </div>
          {/* End Report Harian */}

          {/* Chart */}
          <div className="relative mt-4 lg:mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-8">
              <div className="relative bg-white rounded-lg col-span-auto lg:col-span-3 xl:col-span-4">
                <div className="relative p-4 rounded-lg">
                  <h2 className="text-gray-800 text-lg font-semibold">
                    Report Direktorat
                  </h2>
                </div>
                <div className="bg-white p-4">
                  <ChartBarGroup title="Persentase Kehadiran Harian" />
                </div>
              </div>
              <div className="flex flex-col lg:gap-12 bg-white rounded-lg lg:col-span-2 xl:col-span-2 p-4">
                <div className="relative">
                  <h2 className="text-gray-800 text-lg font-semibold">
                    Report Kehadiran
                  </h2>
                </div>
                <div className="bg-white mt-8">
                  <ChartDoughnut title="Persentase Kehadiran Harian" />
                </div>
              </div>
              <div className="relative bg-white rounded-lg col-span-auto lg:col-span-3 xl:col-span-4 p-4">
                <div className="relative rounded-lg mb-4">
                  <h2 className="text-gray-800 text-lg font-semibold ">
                    Unit List
                  </h2>
                </div>
                <div className="bg-white rounded">
                  <Table />
                </div>
              </div>
              <div className="bg-white p-4 relative lg:col-span-2 xl:col-span-2 rounded-lg">
                <div className="relative mb-4 ">
                  <h2 className="text-gray-800 text-lg font-semibold ">
                    Unit Rating
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex border-2 justify-between border-gray-200 gap-4 bg-white rounded-lg py-4 px-8 items-center">
                    <h1 className="text-2xl font-bold">1</h1>
                    <div className="flex flex-col px-3">
                      <h1 className="font-semibold">Operation and Regional</h1>
                      <h2 className="text-gray-400 text-sm">
                        96% of 200 Employee
                      </h2>
                    </div>
                    <div className="flex text-green-500">
                      <TrendingUpIcon className="h-6 w-6 " />
                      <span>2</span>
                    </div>
                  </div>
                  <div className="flex border-2 justify-between border-gray-200 gap-4 bg-white rounded-lg py-4 px-8 items-center">
                    <h1 className="text-2xl font-bold">2</h1>
                    <div className="flex flex-col px-3">
                      <h1 className="font-semibold">Operation and Regional</h1>
                      <h2 className="text-gray-400 text-sm">
                        96% of 200 Employee
                      </h2>
                    </div>
                    <div className="flex text-red-500">
                      <TrendingDownIcon className="h-6 w-6 " />
                      <span>2</span>
                    </div>
                  </div>
                  <div className="flex border-2 justify-between border-gray-200 gap-4 bg-white rounded-lg py-4 px-8 items-center">
                    <h1 className="text-2xl font-bold">3</h1>
                    <div className="flex flex-col px-3">
                      <h1 className="font-semibold">Operation and Regional</h1>
                      <h2 className="text-gray-400 text-sm">
                        96% of 200 Employee
                      </h2>
                    </div>
                    <div className="flex text-red-500">
                      <TrendingDownIcon className="h-6 w-6 " />
                      <span>2</span>
                    </div>
                  </div>
                  <div className="flex border-2 justify-between border-gray-200 gap-4 bg-white rounded-lg py-4 px-8 items-center">
                    <h1 className="text-2xl font-bold">4</h1>
                    <div className="flex flex-col px-3">
                      <h1 className="font-semibold">Operation and Regional</h1>
                      <h2 className="text-gray-400 text-sm">
                        96% of 200 Employee
                      </h2>
                    </div>
                    <div className="flex text-green-500">
                      <TrendingUpIcon className="h-6 w-6 " />
                      <span>2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Chart */}
        </div>

        {/* End Section Report Harian */}
      </div>
    </div>
  );
}
