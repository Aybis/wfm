import CardFilterMonthAndYear from 'components/devices/mobile/component/molecules/CardFilterMonthAndYear';
import CardGridMobile from 'components/devices/mobile/component/molecules/CardGridMobile';
import CardHeadingMobile from 'components/devices/mobile/component/molecules/CardHeadingMobile';
import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import Input from 'components/devices/universal/atoms/Input';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import Modal from 'components/devices/universal/atoms/Modal';
import Pagination from 'components/devices/universal/atoms/Pagination';
import Select from 'components/devices/universal/atoms/Select';
import CardListDay from 'components/devices/universal/molecules/CardListDay';
import absensi from 'constants/api/absensi';
import convertDate from 'helpers/hooks/convertDate';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Karyawan() {
  // const [PAGE, setPAGE] = useState(2);
  const [listUser, setlistUser] = useState([]);
  const [selectUser, setselectUser] = useState([]);
  const [dataAbsensiUser, setdataAbsensiUser] = useState([]);
  const [showModalDetailAbsensi, setshowModalDetailAbsensi] = useState(false);
  const [isLoad, setisLoad] = useState(false);
  const [linkDownloadReport, setLinkDownloadReport] = useState('#');
  const DATAUNIT = useSelector((state) => state.employee);

  const [form, setform] = useState({
    search: '',
  });

  const [filter, setfilter] = useState({
    month: convertDate('month'),
    year: convertDate('fullYear'),
  });

  const [{ unit }, setState] = useForm({
    unit: 2,
  });

  const handlerKeyUp = (event) => {
    let formSearch = state.currentUsers.filter(
      (user) => user.name.toLowerCase().indexOf(event.target.value) > -1,
    );
    state.currentUsers = formSearch;
    console.log(formSearch);
    setform({
      search: event.target.value,
    });
  };

  const [state, setstate] = useState({
    allUsers: listUser,
    currentUsers: [],
    currentPage: null,
    totalPages: null,
  });

  const createLinkDownload = (monthNum, fullYear, unit_id) => {
    setLinkDownloadReport(
      `${process.env.REACT_APP_API_ABSENSI}absensi/export-user-by-unit?month=${
        monthNum ?? filter.month
      }&year=${fullYear ?? filter.year}&unit_id=${unit_id ? unit_id : unit}`,
    );
  };

  const handlerChangeUnit = (name, value, props) => {
    getDataUserByUnit(value);
    createLinkDownload(filter.month, filter.year, value);
  };

  const handlerOnChange = (type, value) => {
    let getMonth = type === 'bulan' ? value : filter.month;
    let getYear = type === 'tahun' ? value : filter.year;
    setfilter({
      month: getMonth,
      year: getYear,
    });
    getDataUserByUnit(unit, getMonth, getYear);
    createLinkDownload(getMonth, getYear, unit);
  };

  const getDataUserByUnit = (unitid, monthNum, fullYear) => {
    absensi
      .fetchDataDashboardByUnit({
        params: {
          unit_id: unitid ? unitid : unit,
          month: monthNum ? monthNum : filter.month,
          year: fullYear ? fullYear : filter.year,
        },
      })
      .then((response) => {
        setisLoad(true);
        setlistUser(response.data);
        setTimeout(() => {
          setisLoad(false);
        }, 200);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };
  const totalUsers = listUser.length;

  const getDataAbsenPersonal = (user, month, year) => {
    setshowModalDetailAbsensi(true);
    setselectUser(user);
    absensi
      .fetchReportPersonal({
        params: {
          user_id: user.id,
          month: month ?? convertDate('month'),
          year: year ?? convertDate('fullYear'),
          size: 31,
        },
      })
      .then((res) => {
        setdataAbsensiUser(res.data.data);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  const onPageChanged = (data) => {
    const { currentPage, totalPages, pageLimit } = data ?? 0;
    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = listUser.slice(offset, offset + pageLimit);
    setstate({ currentPage, currentUsers, totalPages });
  };

  useEffect(() => {
    getDataUserByUnit();
    createLinkDownload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DATAUNIT]);

  return totalUsers > 0 ? (
    <div className="relative mt-8">
      <h2 className="text-gray-600 font-medium text-lg lg:text-xl">
        List Karyawan By Unit
      </h2>
      {/* Modal List User */}
      <Modal
        title={selectUser.name}
        isShowModal={() => setshowModalDetailAbsensi(false)}
        show={showModalDetailAbsensi}>
        {dataAbsensiUser.length > 0 ? (
          <CardGridMobile>
            {dataAbsensiUser.map((data) => (
              <CardListDay
                key={Math.random()}
                border={true}
                type={data.kehadiran}
                kondisi={data.kondisi}
                is_shift={data.is_shift}
                locIn={data.detail_absensi[0].lokasi}
                timeIn={data.detail_absensi[0].jam}
                keterangan={data.keterangan}
                status={data.checkout_status}
                locOut={
                  data.detail_absensi[1] ? data.detail_absensi[1].lokasi : null
                }
                timeOut={
                  data.detail_absensi[1] ? data.detail_absensi[1].jam : null
                }
              />
            ))}
          </CardGridMobile>
        ) : (
          <p>Data Kosong</p>
        )}
      </Modal>
      {/* End Modal List User */}

      {DATAUNIT?.dataUnit?.length > 0 ? (
        <div className="relative my-4 z-30">
          <Select
            fallbackText={'Test'}
            name="unit"
            value={unit}
            onClick={setState}
            handlerChange={handlerChangeUnit}>
            {DATAUNIT?.dataUnit?.map((item, index) => (
              <option key={index} value={item.id} className="capitalize">
                {item.name.toLowerCase()}
              </option>
            ))}
          </Select>
          <Input
            name="search"
            placeholder="Name"
            type="text"
            onChange={handlerKeyUp}
            value={form.search}
          />
        </div>
      ) : (
        <CardLoading />
      )}

      {/* Start Filter Month And Year  */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} border />
      {/* End Filter Month And Year  */}

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
                    <img
                      src={`https://ui-avatars.com/api/?name=${user?.name}&background=0062FF&color=fff`}
                      alt="avatar"
                      loading="lazy"
                      height={10}
                      width={10}
                      className="h-10 w-10 rounded-lg"
                    />
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
      {isLoad ? (
        <LoadingCircle />
      ) : (
        <>
          <CardHeadingMobile
            subheading={`Result : ${totalUsers} Employees`}
            navigation
            type="download"
            link={linkDownloadReport}
          />
          <CardGridMobile col={1} addClass="lg:hidden">
            {state.currentUsers.map((user) => (
              <div
                key={Math.random()}
                onClick={() => getDataAbsenPersonal(user)}
                className="flex flex-col gap-4 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300">
                <div className="flex gap-4">
                  {user?.image_url ? (
                    <img
                      loading="lazy"
                      height={12}
                      width={12}
                      src={user?.image_url}
                      alt="avatar"
                      className="h-10 w-10 rounded-lg"
                    />
                  ) : (
                    <img
                      src={`https://ui-avatars.com/api/?name=${user?.name}&background=0062FF&color=fff`}
                      alt="avatar"
                      loading="lazy"
                      height={10}
                      width={10}
                      className="h-10 w-10 rounded-lg"
                    />
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
                    <h1 className="text-xs text-gray-400 tracking-wide">
                      Hadir
                    </h1>
                    <h1 className="text-sm text-gray-800 font-semibold">
                      {user.wfh + user.wfo + user.satelit}
                    </h1>
                  </div>
                  <div className="flex flex-col justify-start gap-1">
                    <h1 className="text-xs text-gray-400 tracking-wide">
                      Telat
                    </h1>
                    <h1 className="text-sm text-gray-800 font-semibold">
                      {user.telat}
                    </h1>
                  </div>
                  <div className="flex flex-col justify-start gap-1">
                    <h1 className="text-xs text-gray-400 tracking-wide">
                      Absen
                    </h1>
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
        </>
      )}
    </div>
  ) : (
    <CardLoading />
  );
}
