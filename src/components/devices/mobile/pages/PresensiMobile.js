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
import CardReportPersonalAbsensiMonthly from '../component/molecules/CardReportPersonalAbsensiMonthly';
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
      .fetchDailyPersonal(USER?.id)
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
      .fetchSummaryPersonal({
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
      .fetchReportPersonal({
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
      .fetchWeeklyPersonal({
        params: {
          user_id: USER?.id,
        },
      })
      .then((response) => {
        dispatch(dataWeekly(response.data));
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
      <CardTitlePageMobile title="Presensi" isBack={false} />

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
                <CardReportPersonalAbsensiMonthly
                  key={Math.random()}
                  data={data}
                  photoIn={photoIn}
                />
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
