import Download from 'components/atoms/Download';
import Heading from 'components/atoms/Heading';
import LoadingCircle from 'components/atoms/LoadingCircle';
import Select from 'components/atoms/Select';
import TableWithoutHeader from 'components/atoms/TableWithoutHeader';
import CardListDay from 'components/molecules/CardListDay';
import CardMapCheck from 'components/molecules/CardMapCheck';
import CardPresence from 'components/molecules/CardPresence';
import CardReportKehadiran from 'components/molecules/CardReportKehadiran';
import CardReportWork from 'components/molecules/CardReportWork';
import CardTitlePage from 'components/molecules/CardTitlePage';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import absensi from '../constants/api/absensi';
import {
  dataPresence,
  dataWork,
  getData,
  messageData,
  statusData,
} from '../store/actions/absensi';

export default function Presensi({ history }) {
  const users = useSelector((state) => state.users);
  const presenceToday = useSelector((state) => state.presence);
  const dispatch = useDispatch();
  const PRESENCE = useSelector((state) => state.absensi);
  const timeStamp = new Date();
  const [{ bulan, tahun }, setState] = useForm({
    bulan: timeStamp.getMonth() + 1,
    tahun: timeStamp.getFullYear(),
  });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handlerOnChange = (type, value) => {
    let month = type === 'bulan' ? value : bulan;
    let year = type === 'tahun' ? value : tahun;
    getDataReportPersonal(month, year);
    getDashboardReportPersonal(month, year);
  };

  const getDashboardReportPersonal = (month, year) => {
    dispatch(statusData('loading'));

    absensi
      .dashboardReportPersonal({
        params: {
          user_id: users?.id,
          month: month,
          year: year,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(dataWork(response.data.work));
          dispatch(dataPresence(response.data.presence));
        }
      })
      .catch((err) => {
        ToastHandler('error', err?.response?.data?.message ?? 'error');
        dispatch(messageData(err?.response?.data?.message ?? 'error'));
      });
  };

  const getDataReportPersonal = (month, year) => {
    dispatch(statusData('loading'));

    absensi
      .reportPersonal({
        params: {
          user_id: users?.id,
          month: month,
          year: year,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getData(res.data.data));
        }
        dispatch(statusData('ok'));
      })
      .catch((err) => {
        ToastHandler('err', err.response);
        dispatch(messageData(err?.response?.data?.message ?? 'error'));
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    const timeOut = setTimeout(() => {
      getDataReportPersonal(bulan, tahun);
      getDashboardReportPersonal(bulan, tahun);
      console.log(PRESENCE);
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, presenceToday, dispatch]);

  return (
    <div className="relative mt-4">
      <CardTitlePage goBack={history.goBack} title="presensi" />
      {Object.entries(presenceToday.dataOut).length === 0 ? (
        <CardMapCheck />
      ) : (
        <CardPresence />
      )}
      {/* Start Filter Month And Year  */}
      <div className="grid grid-cols-2 mt-8 lg:mt-14 gap-2 lg:container lg:mx-auto lg:w-1/3 justify-center items-center">
        <Select
          fallbackText={monthNames[bulan]}
          name="bulan"
          value={bulan}
          onClick={setState}
          handlerChange={handlerOnChange}>
          {monthNames.map((item, index) => (
            <option key={index} value={index + 1}>
              {item}
            </option>
          ))}
        </Select>
        <Select
          fallbackText={`${tahun}`}
          name="tahun"
          value={tahun}
          onClick={setState}
          handlerChange={handlerOnChange}>
          <option value={timeStamp.getFullYear()}>
            {timeStamp.getFullYear()}
          </option>
          <option value="all">All</option>
        </Select>
      </div>
      {/* End Filter Month And Year  */}
      {/* Report Presence Card */}
      {PRESENCE.status === 'loading' && <LoadingCircle />}
      {PRESENCE.dataPresence.length > 0 ? (
        <div className="flex flex-col mt-4">
          <Heading heading="Report Presence" />
          <div
            className={`overflow-x-auto hidden-scroll gap-4 mt-4 py-4 px-2 transition-all duration-300 ease-in-out ${
              isDesktop
                ? 'grid grid-cols-3 gap-6 border-b border-gray-200 pb-8'
                : 'flex '
            } `}>
            {PRESENCE.dataPresence.map((item) => (
              <CardReportKehadiran
                key={Math.random()}
                hari={item.value}
                name={item.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <LoadingCircle />
      )}
      {PRESENCE.dataWork.length > 0 ? (
        <div className="flex flex-col mt-4">
          <Heading heading="Report Presence" />
          <div
            className={`overflow-x-auto hidden-scroll gap-4 mt-4 py-4 px-2 transition-all duration-300 ease-in-out ${
              isDesktop
                ? 'grid grid-cols-3 gap-6 border-b border-gray-200 pb-8'
                : 'flex '
            } `}>
            {PRESENCE.dataWork.map((item) => (
              <CardReportWork
                key={Math.random()}
                status="Hari"
                day={item.value}
                name={item.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <LoadingCircle />
      )}
      <div className="flex flex-col mt-8">
        <Heading heading="List Presence" />
        <div className="flex justify-end mt-2">
          <Download onClick={() => alert('Download excel')} />
        </div>

        {PRESENCE.total > 0 ? (
          <div className="grid grid-cols-1 overflow-auto hidden-scroll h-full my-4 gap-2 py-4 rounded-lg">
            {isMobile &&
              PRESENCE.data.map((data) => (
                <CardListDay
                  key={Math.random()}
                  date={data.created_at}
                  type={data.kehadiran}
                  kondisi={data.kondisi}
                  locIn={data.detail_absensi[0].lokasi}
                  timeIn={data.detail_absensi[0].jam}
                  locOut={
                    data.detail_absensi[1]
                      ? data.detail_absensi[1].lokasi
                      : null
                  }
                  timeOut={
                    data.detail_absensi[1] ? data.detail_absensi[1].jam : null
                  }
                />
              ))}

            {isDesktop &&
              PRESENCE.data.map((data) => (
                <TableWithoutHeader
                  key={Math.random()}
                  kehadiran={data.kehadiran}
                  kondisi={data.kondisi}
                  locIn={data.detail_absensi[0].lokasi}
                  timeIn={data.detail_absensi[0].jam}
                  locOut={
                    data.detail_absensi[1]
                      ? data.detail_absensi[1].lokasi
                      : null
                  }
                  timeOut={
                    data.detail_absensi[1] ? data.detail_absensi[1].jam : null
                  }></TableWithoutHeader>
              ))}
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <p className="text-gray-500 font-medium">Data Kosong</p>
          </div>
        )}
      </div>
      {/* End Report Presence Card */}
    </div>
  );
}
