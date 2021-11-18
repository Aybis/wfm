import absensi from 'constants/api/absensi';
import convertDate from 'helpers/hooks/convertDate';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  dataPresence,
  dataWeekly,
  dataWork,
  getData,
  messageData,
  statusData,
} from 'store/actions/absensi';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';
import Card from '../component/molecules/Card';
import CardDay from '../component/molecules/CardDay';
import CardFilterMonthAndYear from '../component/molecules/CardFilterMonthAndYear';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardKehadiran from '../component/molecules/CardKehadiran';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardSummary from '../component/molecules/CardSummary';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import CardWorkMobile from '../component/molecules/CardWorkMobile';
import LayoutMobile from '../LayoutMobile';

const PresensiMobile = ({ history }) => {
  const USER = useSelector((state) => state.users);
  const ABSENSI = useSelector((state) => state.absensi);
  const [linkDownloadReport, setLinkDownloadReport] = useState('#');
  const dispatch = useDispatch();

  const absenToday = () => {
    dispatch(statusPresence('loading'));

    absensi
      .dailyPersonal(USER?.id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(isCheckIn(response.data));
        }
      })
      .catch((error) => {
        dispatch(messagePresence(error?.response?.data?.message ?? 'error'));
        ToastHandler('error', error?.response?.data?.message ?? 'error');
      });
  };

  const createLinkDownload = (month, year) => {
    setLinkDownloadReport(
      `${process.env.REACT_APP_API_ABSENSI}absensi/export-personal?month=${
        month ?? convertDate('month')
      }&year=${year ?? convertDate('fullYear')}&user_id=${USER?.id}&name=${
        USER?.name
      }`,
    );
  };

  const handlerOnChange = (type, value) => {
    let month = type === 'bulan' ? value : convertDate('month');
    let year = type === 'tahun' ? value : convertDate('fullYear');
    getDataReportPersonal(month, year);
    getDashboardReportPersonal(month, year);
    createLinkDownload(month, year);
  };

  const getDashboardReportPersonal = (month, year) => {
    dispatch(statusData('loading'));

    absensi
      .dashboardReportPersonal({
        params: {
          user_id: USER?.id,
          month: month ?? convertDate('month'),
          year: year ?? convertDate('fullYear'),
        },
      })
      .then((response) => {
        dispatch(dataWork(response.data.work));
        dispatch(dataPresence(response.data.presence));
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
          user_id: USER?.id,
          month: month ?? convertDate('month'),
          year: year ?? convertDate('fullYear'),
          size: 32,
        },
      })
      .then((res) => {
        dispatch(getData(res.data.data));
        dispatch(statusData('ok'));
      })
      .catch((err) => {
        ToastHandler('err', err.response);
        dispatch(messageData(err?.response?.data?.message ?? 'error'));
      });
  };

  const reportWeeklyPersonal = () => {
    dispatch(statusData('loading'));
    absensi
      .weeklyPersonal(USER?.id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(dataWeekly(response.data));
        }
      })
      .catch((error) => {
        ToastHandler('error', error?.response?.data?.message ?? 'error');
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    absenToday();
    reportWeeklyPersonal();
    getDashboardReportPersonal();
    getDataReportPersonal();
    createLinkDownload();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  return (
    <LayoutMobile>
      <CardTitlePageMobile title="Presensi" link={history.goBack} />

      {/* Kehadiran  */}
      <Card addClass="-mt-4">
        <CardKehadiran />
      </Card>
      {/* End Kehadiran  */}

      {/* Daily Absence  */}
      <Card>
        <CardDay />
      </Card>
      {/* End Daily Absence  */}

      {/* Start Filter Month And Year  */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} />
      {/* End Filter Month And Year  */}

      {/* Summary Absensi Bulanan */}
      <Card>
        <CardHeadingMobile heading="Summary" />
        <div className="grid grid-cols-3 gap-6 mt-4 place-items-center">
          {ABSENSI.dataPresence.length > 0
            ? ABSENSI.dataPresence.map((item) => (
                <CardSummary
                  key={Math.random()}
                  name={item.name}
                  value={item.value}
                  type="Day"
                />
              ))
            : ''}
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6 place-items-center">
          {ABSENSI.dataWork.length > 0
            ? ABSENSI.dataWork.map((item) => (
                <CardSummary
                  key={Math.random()}
                  name={item.name}
                  value={item.value}
                />
              ))
            : ''}
        </div>
      </Card>
      {/* End Summary Absensi Bulanan */}

      {/* Weekly Report Personal */}
      <Card addClass="mt-4">
        <CardHeadingMobile heading="Data Mingguan" />
        <CardScrollHorizontal>
          {Object.values(ABSENSI.dataWeekly)?.map?.((item) => {
            return (
              <CardWorkMobile
                kehadiran={item.kehadiran}
                kondisi={item.kondisi}
                date={item.created_at}
                timeIn={item.detail_absensi[0].jam}
                timeOut={
                  item.detail_absensi[1] ? item.detail_absensi[1].jam : null
                }
                key={Math.random()}
              />
            );
          })}
        </CardScrollHorizontal>
      </Card>
      {/* End Weekly Report Personal */}

      <Card addClass="mt-4">
        <CardHeadingMobile
          heading="Data Bulanan"
          navigation
          type="download"
          link={linkDownloadReport}
        />
        {ABSENSI.status === 'ok' && ABSENSI.data.length > 0 ? (
          <CardGridMobile>
            {ABSENSI.data.map((data) => {
              let photoIn = data.detail_absensi[0].photo.includes('/')
                ? data.detail_absensi[0].photo
                : `${USER?.id}/${data.detail_absensi[0].jam.substring(
                    0,
                    10,
                  )}/in/${data.detail_absensi[0].photo}`;
              return (
                <div
                  key={Math.random()}
                  className="relative flex flex-col gap-4 bg-white rounded-lg p-4">
                  <div
                    className={[
                      'absolute top-3 right-4 rounded-md text-xs px-2 py-1 ',
                      data.kehadiran === 'WFH' && 'bg-green-500 text-white',
                      data.kehadiran === 'WFO' && 'bg-blue-500 text-white',
                      data.kehadiran === null && 'bg-red-500  text-white',
                    ].join(' ')}>
                    {data.kehadiran === 'WFH' && 'At Home'}
                    {data.kehadiran === 'WFO' && 'At Office'}
                    {data.kehadiran === null && data.kondisi}
                  </div>
                  <div className="flex gap-3">
                    <div className="flex w-1/6">
                      <img
                        src={`${process.env.REACT_APP_API_IMAGE_ABSENSI}/${photoIn}`}
                        alt={data.detail_absensi[0].photo}
                        className="h-16 w-16 rounded-md object-center"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${USER?.name}&background=F3F3F3&color=000`;
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-5/6">
                      <p className="text-xs font-medium text-gray-600">
                        {convertDate(
                          'fullDayMonthYear',
                          data.detail_absensi[0].jam,
                        )}
                      </p>
                      <div className="flex items-center">
                        <p className="text-sm font-semibold text-gray-800">
                          {convertDate('timeAm', data.detail_absensi[0].jam)}
                        </p>
                        <p
                          className={`text-sm font-medium ml-1 ${
                            data.kehadiran !== null && data.keterangan
                              ? 'text-red-500'
                              : 'text-apps-primary'
                          }`}>
                          {data.kehadiran !== null && data.keterangan
                            ? '- Tidak Disiplin '
                            : '- Disiplin'}
                        </p>
                      </div>
                      <p className="text-xs font-light text-gray-400">
                        {data.detail_absensi[0].lokasi}
                      </p>
                      <p className="text-xs font-medium text-red-400">
                        {data.keterangan !== null && data.keterangan}
                      </p>
                    </div>
                  </div>
                  <hr className="border border-gray-100 rounded-full ml-16" />
                  {data.detail_absensi[1] ? (
                    <div className="flex gap-3">
                      <div className="flex w-1/6 rounded-lg">
                        <img
                          src={`${process.env.REACT_APP_API_IMAGE_ABSENSI}/${data.detail_absensi[1].photo}`}
                          alt={data.detail_absensi[1].photo}
                          className="h-16 w-16 rounded-lg object-center"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${USER?.name}&background=F3F3F3&color=000`;
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-5/6">
                        <p className="text-xs font-medium text-gray-600">
                          {convertDate(
                            'fullDayMonthYear',
                            data.detail_absensi[1].jam,
                          )}
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {convertDate('timeAm', data.detail_absensi[1].jam)}
                        </p>
                        <p className="text-xs font-light text-gray-400">
                          {data.detail_absensi[1].lokasi}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <h1 className="text-sm font-semibold text-gray-800">
                        On Duty
                      </h1>
                    </div>
                  )}
                </div>
              );
            })}
          </CardGridMobile>
        ) : (
          <div className="flex justify-center mt-4">
            <p className="text-gray-500 font-medium">Data Kosong</p>
          </div>
        )}
      </Card>
    </LayoutMobile>
  );
};

export default PresensiMobile;
