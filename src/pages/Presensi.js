import { SearchIcon } from '@heroicons/react/outline';
import Download from 'components/atoms/Download';
import Heading from 'components/atoms/Heading';
import LoadingCircle from 'components/atoms/LoadingCircle';
import Select from 'components/atoms/Select';
import TableWithoutHeader from 'components/atoms/TableWithoutHeader';
import CardDay from 'components/molecules/CardDay';
import CardMapCheck from 'components/molecules/CardMapCheck';
import CardPresence from 'components/molecules/CardPresence';
import CardReportKehadiran from 'components/molecules/CardReportKehadiran';
import CardReportWork from 'components/molecules/CardReportWork';
import CardTitlePage from 'components/molecules/CardTitlePage';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import absensi from '../constants/api/absensi';

export default function Presensi({ history }) {
  const users = useSelector((state) => state.users);
  const [dataPersonal, setdataPersonal] = useState(false);
  const [dataMonthly, setdataMonthly] = useState([]);
  const [dataPresence, setdataPresence] = useState([]);
  const [dataWork, setdataWork] = useState([]);
  const [isShow, setisShow] = useState(false);
  const timeStamp = new Date();
  const [{ bulan, tahun }, setState] = useForm({
    bulan: timeStamp.getMonth() + 1,
    tahun: timeStamp.getFullYear(),
  });

  const handlerOnChange = (type, value) => {
    let month = type === 'bulan' ? value : bulan;
    let year = type === 'tahun' ? value : tahun;
    getDataReportPersonal(month, year);
    getDashboardReportPersonal(month, year);
  };

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

  const CardCheckInStatus = ({ absensi }) => {
    if (!absensi) {
      return (
        <CardMapCheck
          type="in"
          current="Anda Belum Absen"
          status={true}
          link="/check-in"
        />
      );
    } else {
      if (absensi.detail_absensi[1]) {
        return <CardPresence status="out" />;
      } else if (absensi.detail_absensi[0]) {
        return (
          <CardMapCheck
            status={true}
            type="out"
            current={absensi.kehadiran}
            link={`/check-out/${absensi.id}`}
            state={users}
          />
        );
      }
    }
  };

  const getDataDailyPersonal = () => {
    absensi
      .dailyPersonal(users?.id)
      .then((res) => {
        setdataPersonal(res.user_id ? res : null);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  const getDashboardReportPersonal = (month, year) => {
    absensi
      .dashboardReportPersonal({
        params: {
          user_id: users?.id,
          month: month,
          year: year,
        },
      })
      .then((res) => {
        let dataPresence = [
          {
            name: 'hadir',
            value: res.Hadir,
          },
          {
            name: 'telat',
            value: res.Telat,
          },
          {
            name: 'izin',
            value: res.Izin,
          },
          {
            name: 'sakit',
            value: res.Sakit,
          },
          {
            name: 'cuti',
            value: res.Cuti,
          },
          {
            name: 'sppd',
            value: res.SPPD,
          },
        ];

        let dataWork = [
          {
            name: 'WFO',
            value: res.WFO,
          },
          {
            name: 'WFh',
            value: res.WFH,
          },
          {
            name: 'Satelit',
            value: res.Satelit,
          },
        ];
        setdataPresence(dataPresence);
        setdataWork(dataWork);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  const getDataReportPersonal = (month, year) => {
    absensi
      .reportPersonal({
        params: {
          user_id: users?.id,
          month: month,
          year: year,
        },
      })
      .then((res) => {
        setdataMonthly(res ? res.data : null);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getDataDailyPersonal();
      getDataReportPersonal(bulan, tahun);
      getDashboardReportPersonal(bulan, tahun);
      setisShow(true);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div className="relative mt-8">
      {/* Header Page  */}
      <CardTitlePage goBack={history.goBack} title="presensi" />
      {isShow ? (
        <CardCheckInStatus absensi={dataPersonal} />
      ) : (
        <LoadingCircle />
      )}

      {/* End Header Page  */}

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

      {/* Start Card Report Presensi */}
      <div className="flex flex-col mt-4">
        <Heading heading="Report Presence" />
        <div
          className={`overflow-x-auto hidden-scroll gap-4 mt-4 py-4 px-2 transition-all duration-300 ease-in-out ${
            isDesktop
              ? 'grid grid-cols-3 gap-6 border-b border-gray-200 pb-8'
              : 'flex '
          } `}>
          {dataPresence ? (
            dataPresence.map((item, index) => (
              <CardReportKehadiran
                key={index}
                hari={item.value}
                name={item.name}
              />
            ))
          ) : (
            <LoadingCircle />
          )}
        </div>
      </div>
      {/* End Card Report Presensi */}

      {/* Start Card Report Working  */}
      <div className="flex flex-col mt-8">
        <Heading heading="Report Working" />
        <div
          className={`overflow-x-auto hidden-scroll gap-4 mt-4 py-4 px-2 transition-all duration-300 ease-in-out ${
            isDesktop
              ? 'grid grid-cols-3 gap-6 border-b border-gray-200 pb-8'
              : 'flex '
          } `}>
          {dataWork ? (
            dataWork.map((item) => (
              <CardReportWork
                key={Math.random()}
                status="Hari"
                day={item.value}
                name={item.name}
              />
            ))
          ) : (
            <LoadingCircle />
          )}
        </div>
      </div>
      {/* End Card Report Working */}

      {/* Start Card Report Data Detail */}
      <div className="flex flex-col mt-8">
        <Heading heading="List Presence" />

        <div className="grid grid-cols-1 overflow-auto hidden-scroll h-full my-4 gap-2 py-4 rounded-lg">
          <div className="hidden lg:flex justify-between px-4 mb-8">
            <div className="inline-flex items-center justify-center">
              <SearchIcon className="h-6 w-6 text-gray-400 z-10 ml-2" />
              <input
                type="text"
                className="pl-10 pr-4 py-3 rounded-md bg-white -ml-8"
                placeholder="Search"
              />
            </div>
            <Download onClick={() => alert('Download excel')} />
          </div>
          {dataMonthly.length > 0 ? (
            <>
              {isMobile &&
                dataMonthly.map((data, index) => (
                  <CardDay
                    key={index}
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
                dataMonthly.map((data, index) => (
                  <TableWithoutHeader
                    key={index}
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
            </>
          ) : (
            <p>Data Kosong</p>
          )}
        </div>
      </div>
      {/* End Card Report Data Detail */}
    </div>
  );
}
