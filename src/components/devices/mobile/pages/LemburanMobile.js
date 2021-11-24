import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  XIcon,
} from '@heroicons/react/outline';
import CardOvertimeApproval from 'components/devices/desktop/molecules/CardOvertimeApproval';
import CardReportWork from 'components/devices/desktop/molecules/CardReportWork';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import ToastHandler from 'helpers/hooks/toast';
import dataCeoMessages from 'json/dataCeoMessages';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLemburanMonthly,
  fetchLemburanToday,
  statusData,
} from 'store/actions/lemburan';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';
import Card from '../component/molecules/Card';
import CardFilterMonthAndYear from '../component/molecules/CardFilterMonthAndYear';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardKehadiranLemburan from '../component/molecules/CardKehadiranLemburan';
import CardLoading from '../component/molecules/CardLoading';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import LayoutMobile from '../LayoutMobile';

const LemburanMobile = ({ history }) => {
  const dataJson = dataCeoMessages;
  const USER = useSelector((state) => state.users);
  const LEMBURAN = useSelector((state) => state.lemburan);
  const dispatch = useDispatch();

  const absenToday = () => {
    dispatch(statusPresence('loading'));

    absensi
      .fetchDailyPersonal(USER?.id)
      .then((response) => {
        dispatch(isCheckIn(response.data));
      })
      .catch((error) => {
        dispatch(messagePresence(error?.response?.data?.message ?? 'error'));
        ToastHandler('error', error?.response?.data?.message ?? 'error');
      });
  };

  const lemburanToday = async (id) => {
    dispatch(statusData('Loading'));
    return absensi
      .overtimeTodayPersonal({
        params: {
          user_id: id,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response;
      });
  };

  const getDataLemburan = () => {
    dispatch(statusData('Loading'));

    absensi
      .overtimeListPersonal({
        params: {
          user_id: USER?.id,
          month: convertDate('month'),
          year: convertDate('fullYear'),
          size: 32,
        },
      })
      .then((response) => {
        dispatch(fetchLemburanMonthly(response.data.data));
      })
      .catch((err) => {
        console.log('error lemburan monthly', err.response);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    absenToday();
    lemburanToday(USER?.id).then(function (response) {
      dispatch(fetchLemburanToday(response));
    });
    getDataLemburan();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  return (
    <LayoutMobile addClass="bg-gradient-to-r from-indigo-300 via-warmGray-50 to-warmGray-50 p-0 pb-0">
      <div
        className="bg-gradient-to-br from-blue-100 via-indigo-300 to-blue-200 h-auto p-4 pb-12 -mt-4 -mx-4 rounded-br-3xl relative"
        style={{ borderBottomRightRadius: '3rem' }}>
        {/* Kehadiran  */}
        <CardKehadiranLemburan />
        {/* End Kehadiran  */}

        {/* Card Report Bulanan */}
        <div className="grid grid-cols-2 gap-4 px-3 pt-4">
          {Array.from({ length: 4 }).map((item) => (
            <div
              key={Math.random()}
              className="relative bg-white rounded-lg p-4">
              <h1 className="font-semibold text-xl text-warmGray-800">22</h1>
              <span className="font-light text-sm  text-yellow-600 mt-2">
                Progress
              </span>
            </div>
          ))}
        </div>
        {/* End Card Report Bulanan */}
      </div>
      <CardTitlePageMobile
        title="Lemburan"
        isBack={false}
        moreClass="absolute top-3 mx-2 inset-x-0"
      />

      {/* section review */}
      <div
        className="bg-gradient-to-b from-warmGray-50 to-warmGray-100 relative rounded-tl-3xl -mx-4 px-4 pt-2 pb-6"
        style={{ borderTopLeftRadius: '3rem' }}>
        {/* Section Filter Month and Year */}
        <CardFilterMonthAndYear />
        {/* EndSection Filter Month and Year */}

        <Card addClass="my-4 hidden">
          <CardHeadingMobile heading="Summary" />

          <div className="grid grid-cols-2 gap-3 mt-4 place-items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              className="flex w-full gap-4 bg-green-500 bg-opacity-20 rounded-lg justify-start items-center col-span-2 p-3">
              <div className="bg-white rounded-md p-1">
                <ClipboardCheckIcon className="h-10 p-1 text-green-700" />
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-gray-500 font-light">Pengajuan Selesai</h1>
                <h2 className="text-xl font-semibold text-gray-800 -mt-1">
                  8 <small className="text-sm font-light">Dokumen</small>{' '}
                </h2>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              className="flex flex-col bg-amber-100 p-3 rounded-lg w-full">
              <ClipboardListIcon className="h-10 w-10 bg-white text-amber-500 rounded-md p-1" />
              <div className="flex justify-between items-center mt-4">
                <p className="font-light text-sm text-gray-500">Progress</p>
                <p className="font-semibold text-gray-800">7</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              className="flex flex-col bg-red-100 p-3 rounded-lg w-full">
              <XIcon className="h-10 w-10 bg-white text-red-500 rounded-md p-1" />
              <div className="flex justify-between items-center mt-4">
                <p className="font-light text-sm text-gray-500">Reject</p>
                <p className="font-semibold text-gray-800">7</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              className="flex w-full gap-4 bg-blue-500 bg-opacity-20 rounded-lg justify-start items-center col-span-2 p-3">
              <div className="bg-white rounded-md p-1">
                <ClockIcon className="h-10 p-1 text-apps-primary" />
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-gray-500 font-light">Total Jam Lembur</h1>
                <h2 className="text-xl font-semibold text-gray-800 -mt-1">
                  45 <small className="text-sm font-light">Jam</small>{' '}
                </h2>
              </div>
            </motion.div>
          </div>
        </Card>

        {/* Section Card Report Overtime this Month */}
        <Card addClass="hidden">
          <CardHeadingMobile heading="List Lemburan" />

          <CardScrollHorizontal>
            {dataJson.dataLemburan.map((data) => (
              <CardReportWork
                key={Math.random()}
                day={data.value}
                name={data.name}
                status={data.type}
              />
            ))}
          </CardScrollHorizontal>
        </Card>
        {/* End Section Card Report Overtime this Month */}

        {/* Section Card Report Overtime this Month */}
        <Card addClass="mt-10">
          <CardHeadingMobile heading="Document Review" />

          <CardGridMobile>
            {LEMBURAN.status === 'idle' ? (
              <CardLoading />
            ) : LEMBURAN.dataLemburanMonthly.length > 0 ? (
              LEMBURAN.dataLemburanMonthly.map((data) => (
                <CardOvertimeApproval
                  key={Math.random()}
                  date={data.detail_overtime?.[0]?.jam}
                  status={data.status}
                  title={data.subject}
                  timeIn={data.detail_overtime?.[0]?.jam}
                  timeOut={data.detail_overtime?.[1]?.jam}
                />
              ))
            ) : (
              'Data Kosong'
            )}
          </CardGridMobile>
        </Card>
        {/* End Section Card Report Overtime this Month */}
      </div>
    </LayoutMobile>
  );
};

export default LemburanMobile;
