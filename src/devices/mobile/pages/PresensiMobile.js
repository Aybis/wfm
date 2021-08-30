import LoadingCircle from 'components/atoms/LoadingCircle';
import absensi from 'constants/api/absensi';
import ToastHandler from 'helpers/hooks/toast';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  dataPresence,
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
import CardFilterMonthAndYear from '../component/molecules/CardFilterMonthAndYear';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardKehadiran from '../component/molecules/CardKehadiran';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import LayoutMobile from '../LayoutMobile';
import CardReportKehadiran from 'components/molecules/CardReportKehadiran';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardListDay from 'components/molecules/CardListDay';
import convertDate from 'helpers/hooks/convertDate';
import CardReportWork from 'devices/desktop/molecules/CardReportWork';

const PresensiMobile = ({ history }) => {
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

  useEffect(() => {
    window.scroll(0, 0);
    absenToday();
    getDashboardReportPersonal();
    getDataReportPersonal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  return (
    <LayoutMobile>
      <CardTitlePageMobile name="Presensi" link={history.goBack} />

      {/* Kehadiran  */}
      <Card>
        <CardKehadiran />
      </Card>
      {/* End Kehadiran  */}

      {/* Start Filter Month And Year  */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} />
      {/* End Filter Month And Year  */}

      {/* Report Presence this Month */}
      <Card>
        <CardHeadingMobile
          heading="Report Presence"
          subheading={`Report Kehadiran Absen`}
        />
        {ABSENSI.status === 'ok' && ABSENSI.dataPresence.length > 0 ? (
          <CardScrollHorizontal>
            {ABSENSI.dataPresence.map((item) => (
              <CardReportKehadiran
                key={Math.random()}
                hari={item.value}
                name={item.name}
              />
            ))}
          </CardScrollHorizontal>
        ) : (
          <LoadingCircle />
        )}
      </Card>
      {/* Report Presence this Month */}

      {/* Report Presence this Month */}
      <Card>
        <CardHeadingMobile
          heading="Report Working"
          subheading={`Report Kehadiran Kerja`}
        />
        {ABSENSI.status === 'ok' && ABSENSI.dataWork.length > 0 ? (
          <CardScrollHorizontal>
            {ABSENSI.dataWork.map((item) => (
              <CardReportWork
                status="Hari"
                key={Math.random()}
                day={item.value}
                name={item.name}
              />
            ))}
          </CardScrollHorizontal>
        ) : (
          <LoadingCircle />
        )}
      </Card>
      {/* Report Presence this Month */}

      <Card>
        <CardHeadingMobile
          heading="Report Absence"
          subheading={`Report Absensi Bulanan`}
        />
        {ABSENSI.status === 'ok' && ABSENSI.data.length > 0 ? (
          <CardGridMobile>
            {ABSENSI.data.map((data) => (
              <CardListDay
                key={Math.random()}
                date={data.created_at}
                type={data.kehadiran}
                kondisi={data.kondisi}
                locIn={data.detail_absensi[0].lokasi}
                timeIn={data.detail_absensi[0].jam}
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
          <div className="flex justify-center mt-4">
            <p className="text-gray-500 font-medium">Data Kosong</p>
          </div>
        )}
      </Card>
    </LayoutMobile>
  );
};

export default PresensiMobile;
