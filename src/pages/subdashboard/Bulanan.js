import {
  BeakerIcon,
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
  PhoneMissedCallIcon,
  XIcon,
} from '@heroicons/react/solid';
import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import ChartBarGroup from 'components/devices/universal/atoms/ChartBarGroup';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Bulanan = (props) => {
  const DASHBOARD = useSelector((state) => state.dashboard);
  const [dataDirektorat, setdataDirektorat] = useState([]);

  const dataDirektoratBulanan = () => {
    DASHBOARD?.dataKehadiranBulanan?.map(
      (item) => item.name === 'direktorat' && setdataDirektorat(item.value),
    );
  };
  console.log('dashboard', DASHBOARD);

  useEffect(() => {
    dataDirektoratBulanan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DASHBOARD]);

  return (
    <div className="relative mt-8">
      <h2 className="text-gray-700 font-semibold text-lg">Absensi Bulanan</h2>
      {/* Section Report Harian */}
      <div className="relative mt-4">
        {/* Report Harian */}
        <div className="flex overflow-x-auto hidden-scroll md:grid md:grid-cols-2 lg:grid-cols-4 md:place-content-center  gap-4 py-4 mt-4 rounded-lg">
          {DASHBOARD.dataKehadiranBulanan.length > 0 ? (
            DASHBOARD?.dataKehadiranBulanan?.map(
              (item) =>
                item.name !== 'direktorat' && (
                  <motion.div
                    key={Math.random()}
                    whileHover={{
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className={` ${
                      item.name === 'telat' || item.name === 'tidak_hadir'
                        ? 'cursor-pointer'
                        : 'cursor-default'
                    } flex justify-between items-center gap-1 w-2/3 sm:w-auto flex-none sm:flex-1 h-auto py-4 px-6 bg-white rounded-lg`}>
                    <div className="flex flex-col">
                      <h4 className="text-sm sm:text-base font-medium text-gray-400">
                        {item.name === 'wfh' && 'At Home'}
                        {item.name === 'wfo' && 'At Office'}
                        {item.name === 'satelit' && 'At Satelit'}
                        {item.name === 'telat' && 'Terlambat'}
                        {item.name === 'cuti' && 'Cuti'}
                        {item.name === 'sakit' && 'Sakit'}
                        {item.name === 'sppd' && 'SPPD'}
                        {item.name === 'tidak_hadir' && 'Tidak Hadir'}
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
                    {item.name === 'sakit' && (
                      <BeakerIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-pink text-opacity-50" />
                    )}
                    {item.name === 'cuti' && (
                      <PhoneMissedCallIcon className="h-12 w-12 sm:h-14 sm:w-14 text-apps-purple text-opacity-50" />
                    )}
                    {item.name === 'sppd' && (
                      <GlobeAltIcon className="h-12 w-12 sm:h-14 sm:w-14 text-indigo-600 text-opacity-50" />
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
                  </motion.div>
                ),
            )
          ) : (
            <CardLoading />
          )}
        </div>
        {/* End Report Harian */}
      </div>

      <div className="relative my-4 bg-white rounded-lg p-4">
        <ChartBarGroup
          dataSets={dataDirektorat}
          title="Persentase Kehadiran Direktorat Bulanan"
        />
      </div>
    </div>
  );
};

export default Bulanan;
