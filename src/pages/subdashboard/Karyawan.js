import CardGridMobile from 'components/devices/mobile/component/molecules/CardGridMobile';
import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import Modal from 'components/devices/universal/atoms/Modal';
import Pagination from 'components/devices/universal/atoms/Pagination';
import absensi from 'constants/api/absensi';
import convertDate from 'helpers/hooks/convertDate';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect, useState } from 'react';
import { User } from 'react-feather';

export default function Karyawan() {
  // const [PAGE, setPAGE] = useState(2);
  const [listUser, setlistUser] = useState([]);
  const [totalUsers, settotalUsers] = useState(0);
  const [selectUser, setselectUser] = useState([]);
  const [dataAbsensiUser, setdataAbsensiUser] = useState([]);
  const [showModalDetailAbsensi, setshowModalDetailAbsensi] = useState(false);

  const [state, setstate] = useState({
    allUsers: listUser,
    currentUsers: [],
    currentPage: null,
    totalPages: null,
  });

  const getDataUserByUnit = (month, year, unit) => {
    absensi
      .reportUserByUnit({
        params: {
          unit_id: 9,
          size: 20,
          month: month ?? convertDate('month'),
          year: year ?? convertDate('fullYear'),
        },
      })
      .then((response) => {
        setlistUser(response.data);
        settotalUsers(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataAbsenPersonal = (user, month, year) => {
    setshowModalDetailAbsensi(true);
    setselectUser(user);
    absensi
      .reportPersonal({
        params: {
          user_id: user.id,
          month: month ?? convertDate('month'),
          year: year ?? convertDate('fullYear'),
          size: 3,
        },
      })
      .then((res) => {
        console.log('res', res);
        setdataAbsensiUser(res.data.data);
        console.log(dataAbsensiUser);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  const onPageChanged = (data) => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = listUser.slice(offset, offset + pageLimit);
    setstate({ currentPage, currentUsers, totalPages });
  };

  useEffect(() => {
    getDataUserByUnit();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalUsers]);

  return totalUsers > 0 ? (
    <div className="relative mt-8">
      <h2 className="text-gray-600 font-medium text-lg lg:text-xl">
        List Karyawan By Unit
      </h2>
      {/* Modal CEO Messages */}
      <Modal
        title={selectUser.name}
        isShowModal={() => setshowModalDetailAbsensi(false)}
        show={showModalDetailAbsensi}>
        {dataAbsensiUser.length > 0 ? (
          dataAbsensiUser.map((data) => (
            <div className="flex gap2" key={Math.random()}>
              {data.kehadiran}
            </div>
          ))
        ) : (
          <p>Data Kosong</p>
        )}
      </Modal>
      {/* End Modal CEO Messages */}

      {/* table untuk dekstop view */}
      <div className="flex justify-center items-center container mx-auto">
        <table className="hidden lg:block w-full lg:min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-200 w-full">
            <tr>
              <th
                scope="col"
                className="lg:px-6 lg:py-3 p-3 text-left text-sm font-medium text-gray-500 capitalize tracking-wide lg:whitespace-nowrap">
                Name
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-3 p-3 text-left text-sm font-medium text-gray-500 capitalize tracking-wide lg:whitespace-nowrap">
                WFH
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-3 p-3 text-left text-sm font-medium text-gray-500 capitalize tracking-wide lg:whitespace-nowrap">
                WFO
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-3 p-3 text-left text-sm font-medium text-gray-500 capitalize tracking-wide lg:whitespace-nowrap">
                Satelit
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-3 p-3 text-left text-sm font-medium text-gray-500 capitalize tracking-wide lg:whitespace-nowrap">
                Terlambat
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-3 p-3 text-left text-sm font-medium text-gray-500 capitalize tracking-wide lg:whitespace-nowrap">
                Tidak Hadir
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-3 p-3 text-left text-sm font-medium text-gray-500 capitalize tracking-wide lg:whitespace-nowrap">
                Dengan Keterangan
              </th>
            </tr>
          </thead>

          <tbody>
            {state.currentUsers.map((user, personIdx) => (
              <tr
                key={Math.random()}
                className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-gray-900 capitalize flex gap-4">
                  {user.image_url ? (
                    <img
                      loading="lazy"
                      height={12}
                      width={12}
                      src={user.image_url}
                      alt="avatar"
                      className="h-10 w-10 rounded-lg"
                    />
                  ) : (
                    <div className="rounded-lg bg-gray-100 p-2">
                      <User className="h-8 w-8 text-apps-gray" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h1 className="capitalize text-gray-800 text-sm font-medium tracking-wide">
                      {user.name.toLowerCase()}
                    </h1>
                    <h1 className="capitalize text-gray-400 text-xs">
                      {user.jabatan.toLowerCase()}
                    </h1>
                  </div>
                </td>
                <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.wfh}
                </td>
                <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.wfo}
                </td>
                <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.satelit}
                </td>
                <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.telat}
                </td>
                <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.tidak_hadir}
                </td>
                <td className="lg:px-6 lg:py-4 px-4 py-2 lg:whitespace-nowrap text-sm text-gray-500 capitalize">
                  {user.cuti + user.sppd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* grid untuk mobile view */}
      <CardGridMobile col={1} addClass="lg:hidden">
        {state.currentUsers.map((user) => (
          <div
            key={Math.random()}
            onClick={() => getDataAbsenPersonal(user)}
            className="flex flex-col gap-4 p-3 bg-white rounded-lg shadow-sm">
            <div className="flex gap-4">
              {user.image_url ? (
                <img
                  loading="lazy"
                  height={12}
                  width={12}
                  src={user.image_url}
                  alt="avatar"
                  className="h-10 w-10 rounded-lg"
                />
              ) : (
                <div className="rounded-lg bg-gray-100 p-2">
                  <User className="h-8 w-8 text-apps-gray" />
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="capitalize text-gray-800 text-sm font-medium tracking-wide">
                  {user.name.toLowerCase()}
                </h1>
                <h1 className="capitalize text-gray-400 text-xs">
                  {user.jabatan.toLowerCase()}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 p-2 bg-warmGray-100 rounded-md">
              <div className="flex flex-col justify-start gap-1">
                <h1 className="text-xs text-gray-400 tracking-wide">Hadir</h1>
                <h1 className="text-sm text-gray-800 font-semibold">
                  {user.wfh + user.wfo + user.satelit}
                </h1>
              </div>
              <div className="flex flex-col justify-start gap-1">
                <h1 className="text-xs text-gray-400 tracking-wide">Telat</h1>
                <h1 className="text-sm text-gray-800 font-semibold">
                  {user.telat}
                </h1>
              </div>
              <div className="flex flex-col justify-start gap-1">
                <h1 className="text-xs text-gray-400 tracking-wide">Absen</h1>
                <h1 className="text-sm text-gray-800 font-semibold">
                  {user.tidak_hadir}
                </h1>
              </div>
              <div className="flex flex-col justify-start gap-1">
                <h1 className="text-xs text-gray-400 tracking-wide">
                  Keterangan
                </h1>
                <h1 className="text-sm text-gray-800 font-semibold">
                  {user.cuti + user.sppd}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </CardGridMobile>

      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
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
  ) : (
    <CardLoading />
  );
}
