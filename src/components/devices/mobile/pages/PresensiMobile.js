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
import CardGridMobile from '../component/molecules/CardGridMobile';
import convertDate from 'helpers/hooks/convertDate';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import CardListDay from 'components/devices/universal/molecules/CardListDay';
import CardReportKehadiran from 'components/devices/universal/molecules/CardReportKehadiran';
import CardReportWork from 'components/devices/desktop/molecules/CardReportWork';
import { useState } from 'react';

const PresensiMobile = ({ history }) => {
  const USER = useSelector((state) => state.users);
  const ABSENSI = useSelector((state) => state.absensi);
  const [linkDownloadReport, setLinkDownloadReport] = useState(false);
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
    absensi.exportPersonal({
      params: {
        user_id: USER?.id,
        name: USER?.name,
        month: month ?? convertDate('month'),
        year: year ?? convertDate('fullYear'),
      }
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }

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
          size: 30
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res)

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
      <CardTitlePageMobile title="Presensi" link={history.goBack} />

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
          navigation
          link={() => createLinkDownload()}
        />
        {ABSENSI.status === 'ok' && ABSENSI.data.length > 0 ? (
          <CardGridMobile>
            {ABSENSI.data.map((data) => (
              <CardListDay
                key={Math.random()}
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
          <div className="flex justify-center mt-4">
            <p className="text-gray-500 font-medium">Data Kosong</p>
          </div>
        )}
      </Card>
    </LayoutMobile>
  );
};

export default PresensiMobile;
