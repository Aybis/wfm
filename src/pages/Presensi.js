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
  const [dataPersonal, setdataPersonal] = useState(false);
  const [dataMonthly, setdataMonthly] = useState(null);
  const users = useSelector((state) => state.users);
  const [isShow, setisShow] = useState(false);
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

  const reportMe = [
    {
      status: 'hadir',
      hari: 13,
    },
    {
      status: 'telat',
      hari: 13,
    },
    {
      status: 'izin',
      hari: 13,
    },
    {
      status: 'sakit',
      hari: 13,
    },
    {
      status: 'sppd',
      hari: 13,
    },
    {
      status: 'cuti',
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

  const getDataReportPersonal = () => {
    absensi
      .reportPersonal(users?.id)
      .then((res) => {
        setdataMonthly(res.length > 0 ? res : null);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getDataDailyPersonal();
      getDataReportPersonal();
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
          onClick={setState}>
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
          onClick={setState}>
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
          className={`overflow-x-auto hidden-scroll gap-4 mt-4 transition-all duration-300 ease-in-out ${
            isDesktop ? 'grid grid-cols-6' : 'flex '
          } `}>
          {reportMe.map((item, index) => (
            <CardReportKehadiran
              key={index}
              hari={item.hari}
              name={item.status}
            />
          ))}
        </div>
      </div>
      {/* End Card Report Presensi */}

      {/* Start Card Report Working  */}
      <div className="flex flex-col mt-8">
        <Heading heading="Report Wokring" />
        <div className="overflow-x-auto hidden-scroll flex gap-4 mt-4 lg:grid lg:grid-cols-3 transition-all duration-300 ease-in-out">
          {workMe.map((item, index) => (
            <CardReportWork key={index} day={item.hari} name={item.status} />
          ))}
        </div>
      </div>
      {/* End Card Report Working */}

      {/* Start Card Report Data Detail */}
      <div className="flex flex-col mt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl text-gray-700 font-semibold">
            List Presence
          </h1>
        </div>
        <div className="grid grid-cols-1 overflow-auto hidden-scroll h-full my-4 gap-2 py-4 lg:bg-white rounded-lg">
          <div className="hidden lg:flex justify-between px-4">
            <div className="inline-flex items-center justify-center">
              <SearchIcon className="h-6 w-6 text-gray-400 z-10 ml-2" />
              <input
                type="text"
                className="pl-10 pr-4 py-3 rounded-md bg-gray-100 -ml-8"
                placeholder="Search"
              />
            </div>
            <Download onClick={() => alert('Download excel')} />
          </div>
          {dataMonthly ? (
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
            'data kosong'
          )}
        </div>
      </div>
      {/* End Card Report Data Detail */}
    </div>
  );
}
