import CardFilterMonthAndYear from 'components/devices/mobile/component/molecules/CardFilterMonthAndYear';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import TableWithoutHeader from 'components/devices/universal/atoms/TableWithoutHeader';
import CardReportKehadiran from 'components/devices/universal/molecules/CardReportKehadiran';
import absensi from 'constants/api/absensi';
import convertDate from 'helpers/hooks/convertDate';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect } from 'react';
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
import LayoutDekstop from '../LayoutDekstop';
import CardContainer from '../molecules/CardContainer';
import CardGridDekstop from '../molecules/CardGridDekstop';
import CardMapCheck from '../molecules/CardMapCheck';
import CardReportWork from '../molecules/CardReportWork';
import CardWorkDesktop from '../molecules/CardWorkDesktop';
import TitlePageDesktop from '../molecules/TitlePageDesktop';

const PresensiDesktop = ({ history }) => {
  const USER = useSelector((state) => state.users);
  const ABSENSI = useSelector((state) => state.absensi);
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

  const handlerOnChange = (type, value) => {
    let month = type === 'bulan' ? value : convertDate('month');
    let year = type === 'tahun' ? value : convertDate('fullYear');
    getDataReportPersonal(month, year);
    getDashboardReportPersonal(month, year);
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
          user_id: USER?.id,
          month: month ?? convertDate('month'),
          year: year ?? convertDate('fullYear'),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  return (
    <LayoutDekstop>
      <CardContainer>
        <TitlePageDesktop link={history.goBack} title="Presensi" />
      </CardContainer>

      {/* Section Absensi */}
      <CardContainer moreClass="-mt-16">
        <CardMapCheck />
      </CardContainer>
      {/* End Section Absensi */}

      <CardContainer
        heading="Report Weekly Presence"
        subheading="List Kerja Mingguan"
        moreClass="-mt-14">
        <CardGridDekstop moreClass="mt-4 py-2" col={5}>
          {Object.values(ABSENSI.dataWeekly)?.map?.((item) => (
            <CardWorkDesktop data={item} withBg key={Math.random()} />
          ))}
        </CardGridDekstop>
      </CardContainer>

      {/* Section Filter Month */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} />
      {/* End Section Filter Month */}

      <CardContainer
        heading="Report Presence this Month"
        subheading="Listh Kehadiran Bulan Ini">
        <CardGridDekstop col={3} moreClass="mt-4 py-2">
          {ABSENSI.dataPresence.length > 0 ? (
            ABSENSI.dataPresence.map((item) => (
              <CardReportKehadiran
                key={Math.random()}
                hari={item.value}
                name={item.name}
              />
            ))
          ) : (
            <LoadingCircle />
          )}
        </CardGridDekstop>
      </CardContainer>

      <CardContainer
        heading="Report Work this Month"
        subheading="Listh Kehadiran Kerja Bulan Ini">
        <CardGridDekstop col={3} moreClass="mt-4 py-2">
          {ABSENSI.dataWork.length > 0 ? (
            ABSENSI.dataWork.map((item) => (
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
        </CardGridDekstop>
      </CardContainer>

      <CardContainer
        heading="Report Absesnce this Month"
        subheading="Laporan Absensin Bulanan">
        <CardGridDekstop col={1} moreClass="mt-4 py-2">
          {ABSENSI.data.length > 0 ? (
            ABSENSI.data.map((data) => (
              <TableWithoutHeader
                key={Math.random()}
                kehadiran={data.kehadiran}
                kondisi={data.kondisi}
                locIn={data.detail_absensi[0].lokasi}
                timeIn={data.detail_absensi[0].jam}
                locOut={
                  data.detail_absensi[1] ? data.detail_absensi[1].lokasi : null
                }
                timeOut={
                  data.detail_absensi[1] ? data.detail_absensi[1].jam : null
                }></TableWithoutHeader>
            ))
          ) : (
            <div className="flex justify-center mt-4">
              <p className="text-gray-500 font-medium">Data Kosong</p>
            </div>
          )}
        </CardGridDekstop>
      </CardContainer>
    </LayoutDekstop>
  );
};

export default PresensiDesktop;
