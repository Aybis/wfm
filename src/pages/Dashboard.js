import { UserGroupIcon, XIcon } from '@heroicons/react/outline';
import {
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import Heading from 'components/devices/desktop/atoms/Heading';
import Menu from 'components/devices/desktop/section/Menu';
import MobileMenu from 'components/devices/mobile/sections/MobileMenu';
import ChartBarGroup from 'components/devices/universal/atoms/ChartBarGroup';
import ChartDoughnut from 'components/devices/universal/atoms/ChartDoughnut';
import Table from 'components/devices/universal/molecules/Table';
import absensi from 'constants/api/absensi';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDirektorat,
  fetchKehadiran,
  fetchTidakHadir,
  fetchUnit,
  messageData,
  statusData,
} from 'store/actions/dashboard';

export default function Dashboard() {
  const [didMount, setDidMount] = useState(false);
  const DASHBOARD = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const getDataDashboard = () => {
    dispatch(statusData('loading'));
    absensi
      .dashboard()
      .then((res) => {
        dispatch(fetchKehadiran(res.data.kehadiran));
        dispatch(fetchDirektorat(res.data.dir));
        dispatch(fetchUnit(res.data.unit));
        dispatch(fetchTidakHadir(res.data.kehadiran.tidak_hadir.users));
        dispatch(messageData('ok'));
      })
      .catch((error) => {
        dispatch(messageData(error?.response?.data?.message ?? 'error'));
        ToastHandler('error', error?.response?.data?.message ?? 'error');
      });
  };

  const sortingData = () => {
    let dataUnit = DASHBOARD.dataUnit.map((item) => {
      return {
        name: item.name,
        hadir: item.hadir,
        totalKaryawan: item.total_karyawan,
        persentase: ((item.hadir / item.total_karyawan) * 100).toFixed(2),
      };
    });

    let sort = dataUnit.sort((x, y) => {
      return y.persentase - x.persentase;
    });

    return sort.slice(0, 6).map((item, index) => (
      <div
        key={Math.random()}
        className="flex border-2 justify-between border-gray-200 gap-4 bg-white rounded-lg py-4 px-8 items-center">
        <h1 className="text-2xl font-bold">{index + 1}</h1>
        <div className="flex flex-col gap-1 md:gap-0 w-2/3 px-3">
          <h1 className="font-semibold text-sm md:text-base ">{item.name}</h1>
          <h2 className="text-gray-400 text-xs md:text-sm ">
            {item.persentase > 0 ? item.persentase : 0} % of{' '}
            {item.totalKaryawan} Employee
          </h2>
        </div>
        <div className="flex justify-center items-center gap-1 text-green-500">
          <UserGroupIcon className="h-5 w-5 " />
          <span>{item.hadir}</span>
        </div>
      </div>
    ));
  };

  const dataCard = () => {
    return DASHBOARD.dataKehadiran.map((item) => (
      <div
        key={Math.random()}
        className="flex justify-between items-center gap-1 w-2/3 sm:w-auto flex-none sm:flex-1 h-auto py-4 px-6 bg-white rounded-lg">
        <div className="flex flex-col">
          <h4 className="text-sm sm:text-base font-medium text-gray-400">
            {item.name === 'wfh' && 'At Home'}
            {item.name === 'wfo' && 'At Office'}
            {item.name === 'satelit' && 'At Satelit'}
            {item.name === 'telat' && 'Terlambat'}
            {item.name === 'tidak_hadir' && 'Belum Hadir'}
          </h4>
          <h1 className="text-2xl tracking-wide sm:text-4xl font-bold text-gray-800">
            {item.value}
          </h1>
          <h5 className="text-sm text-gray-500 font-light sm:tracking-wide">
            Karyawan
          </h5>
        </div>
        {item.name === 'wfh' && (
          <HomeIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-green text-opacity-50" />
        )}
        {item.name === 'wfo' && (
          <OfficeBuildingIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-primary text-opacity-50" />
        )}
        {item.name === 'satelit' && (
          <GlobeAltIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-yellow text-opacity-50" />
        )}
        {item.name === 'telat' && (
          <ClockIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-orange text-opacity-50" />
        )}
        {item.name === 'tidak_hadir' && (
          <XIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-red text-opacity-50" />
        )}
      </div>
    ));
  };

  useEffect(() => {
    getDataDashboard();
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return DASHBOARD.message === 'ok' ? (
    <div className="relative w-full h-screen bg-coolGray-100">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 mb:20 lg:mb-10 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-14 md:pb-4 hidden-scroll ${
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
        <div className="relative mt-4 pb-24 lg:pb-0">
          <Heading heading="Report Harian" />

          {/* Report Harian */}
          <div className="flex overflow-x-auto hidden-scroll md:grid md:grid-cols-2 lg:grid-cols-4 md:place-content-center  gap-4 py-4 mt-4 rounded-lg">
            {DASHBOARD.dataKehadiran.length > 0 ? dataCard() : ''}
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
                  <ChartBarGroup
                    dataSets={DASHBOARD.dataDirektorat}
                    title="Persentase Kehadiran Harian"
                  />
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
                  <Table dataSet={DASHBOARD.dataUnit} />
                </div>
              </div>
              <div className="bg-white p-4 relative lg:col-span-2 xl:col-span-2 rounded-lg">
                <div className="relative mb-4 ">
                  <h2 className="text-gray-800 text-lg font-semibold ">
                    Unit Rating
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4">{sortingData()}</div>
              </div>
            </div>
          </div>
          {/* End Chart */}
        </div>

        {/* End Section Report Harian */}
      </div>
    </div>
  ) : (
    ''
  );
}
