import {
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/solid';
import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import ChartBarGroup from 'components/devices/universal/atoms/ChartBarGroup';
import ChartDoughnut from 'components/devices/universal/atoms/ChartDoughnut';
import Modal from 'components/devices/universal/atoms/Modal';
import Pagination from 'components/devices/universal/atoms/Pagination';
import Table from 'components/devices/universal/molecules/Table';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Harian() {
  const DASHBOARD = useSelector((state) => state.dashboard);
  const [didMount, setDidMount] = useState(false);

  const [showModal, setshowModal] = useState(false);
  const [listUser, setlistUser] = useState([]);
  const [headerName, setheaderName] = useState();
  const [state, setstate] = useState({
    allUsers: listUser,
    currentUsers: [],
    currentPage: null,
    totalPages: null,
  });

  const onPageChanged = (data) => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = listUser.slice(offset, offset + pageLimit);
    setstate({ currentPage, currentUsers, totalPages });
  };

  const totalUsers = listUser.length;

  const handlerClickModal = (name) => {
    if (name === 'telat') {
      setshowModal(true);
      setheaderName('Terlambat');
      setlistUser(DASHBOARD?.dataTerlambat);
    } else if (name === 'tidak_hadir') {
      setshowModal(true);
      setheaderName('Belum Hadir');
      setlistUser(DASHBOARD?.dataTidakHadir);
    } else if (name === 'wfh') {
      setshowModal(true);
      setheaderName('At Home');
      setlistUser(DASHBOARD?.dataKehadiranWfh);
    } else if (name === 'wfo') {
      setshowModal(true);
      setheaderName('At Office');
      setlistUser(DASHBOARD?.dataKehadiranWfo);
    } else if (name === 'satelit') {
      setshowModal(true);
      setheaderName('At Satelit');
      setlistUser(DASHBOARD?.dataKehadiranSatelit);
    }
  };

  // Card Sorting Data Unit
  const sortingData = () => {
    let dataUnit = DASHBOARD?.dataUnit?.map((item) => {
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

    return sort.slice(0, 8).map((item, index) => (
      <div
        key={Math.random()}
        className="flex border-2 justify-between border-gray-100 gap-2 bg-white rounded-lg py-4 px-8 items-center">
        <h1 className="text-xl text-gray-400 font-semibold">{index + 1}</h1>
        <div className="flex flex-col gap-1 md:gap-0 w-4/5 px-2 lg:-ml-4">
          <h1 className="font-semibold text-sm text-gray-800">{item.name}</h1>
          <h2 className="text-gray-400 text-xs  ">
            {item.persentase > 0 ? item.persentase : 0} % of{' '}
            {item.totalKaryawan} Employee
          </h2>
        </div>
        <div className="flex justify-center items-center gap-1 text-green-500">
          <UserGroupIcon className="h-5 w-5" />
          <span>{item.hadir}</span>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DASHBOARD]);

  if (!didMount) {
    return null;
  }

  return DASHBOARD.message === 'ok' ? (
    <div className="relative mt-8">
      <h2 className="text-gray-700 font-semibold text-xl lg:text-2xl">
        Absensi Harian
      </h2>

      <Modal
        title={`List ${headerName}`}
        isShowModal={() => setshowModal(false)}
        show={showModal}>
        <div className="w-full lg:w-4xl">
          <div className=" shadow overflow-hidden border-b border-gray-200 sm:rounded-lg lg:mt-8">
            <table className="w-full lg:min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="lg:px-6 lg:py-3 p-3 text-left text-sm lg:text-base font-medium text-gray-500 capitalize tracking-wide">
                    Name
                  </th>
                  <th
                    scope="col"
                    className="lg:px-6 lg:py-3 p-3 text-left text-sm lg:text-base font-medium text-gray-500 capitalize tracking-wide">
                    Unit
                  </th>
                </tr>
              </thead>

              <tbody>
                {state.currentUsers.map((user, personIdx) => (
                  <tr
                    key={Math.random()}
                    className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {user.nama.toLowerCase()}
                    </td>
                    <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-sm text-gray-500 capitalize">
                      {user.unit.toLowerCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            {state.currentPage && (
              <span className="text-xs lg:text-base current-page d-inline-block h-100 pl-4 text-gray-400">
                Page{' '}
                <span className="ml-1 font-semibold text-gray-800">
                  {state.currentPage}
                </span>{' '}
                /{' '}
                <span className="font-semibold text-gray-600">
                  {state.totalPages}
                </span>
              </span>
            )}
            <Pagination
              totalRecords={totalUsers}
              pageLimit={10}
              pageNeighbours={1}
              onPageChanged={onPageChanged}
            />
          </div>
        </div>
      </Modal>

      {/* Section Report Harian */}
      <div className="relative mt-4">
        {/* Report Harian */}
        <div className="flex overflow-x-auto hidden-scroll md:grid md:grid-cols-2 lg:grid-cols-4 md:place-content-center  gap-4 py-4 mt-4 rounded-lg">
          {DASHBOARD.dataKehadiran.length > 0 ? (
            DASHBOARD?.dataKehadiran?.map((item) => (
              <motion.div
                key={Math.random()}
                onClick={() => handlerClickModal(item.name)}
                whileHover={{
                  scale: 1.08
                }}
                whileTap={{
                  scale: 0.95
                }}
                className={` ${item.name === 'telat' || item.name === 'tidak_hadir'
                  ? 'cursor-pointer'
                  : 'cursor-default'
                  } flex justify-between items-center gap-1 w-2/3 sm:w-auto flex-none sm:flex-1 h-auto py-4 px-6 bg-white rounded-lg`}>
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
              </motion.div>
            ))
          ) : (
            <CardLoading />
          )}
        </div>
        {/* End Report Harian */}
      </div>
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
              {DASHBOARD.dataDirektorat.length > 0 ? (
                <ChartBarGroup
                  dataSets={DASHBOARD.dataDirektorat}
                  title="Persentase Kehadiran Harian"
                />
              ) : (
                <CardLoading />
              )}
            </div>
          </div>

          {/* Chart Donat */}
          <div className="flex flex-col lg:gap-12 bg-white rounded-lg lg:col-span-2 xl:col-span-2 ">
            <div className="relative p-4">
              <h2 className="text-gray-800 text-lg font-semibold">
                Report Kehadiran
              </h2>
            </div>
            <div className="bg-white mt-8 px-4 rounded-b-lg lg:-mt-4 pb-4">
              {DASHBOARD.dataKehadiran.length > 0 ? (
                <ChartDoughnut
                  dataSets={DASHBOARD.dataKehadiran}
                  title="Persentase Kehadiran Harian"
                />
              ) : (
                <CardLoading />
              )}
            </div>
          </div>

          {/* Table */}
          <div className="relative bg-white rounded-lg col-span-auto lg:col-span-3 xl:col-span-4 p-4 lg:block hidden">
            <div className="relative rounded-lg mb-4">
              <h2 className="text-gray-800 text-lg font-semibold ">
                Unit List
              </h2>
            </div>
            <div className="bg-white rounded">
              {DASHBOARD.dataUnit.length > 0 ? (
                <Table dataSet={DASHBOARD.dataUnit} />
              ) : (
                <CardLoading />
              )}
            </div>
          </div>
          <div className="bg-white p-4 relative lg:col-span-2 xl:col-span-2 rounded-lg">
            <div className="relative mb-4 ">
              <h2 className="text-gray-800 text-lg font-semibold ">
                Unit Rating
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {DASHBOARD.dataUnit.length > 0 ? sortingData() : <CardLoading />}
            </div>
          </div>
        </div>
      </div>
      {/* End Chart */}
    </div>
  ) : (
    ''
  );
}

export default Harian;
