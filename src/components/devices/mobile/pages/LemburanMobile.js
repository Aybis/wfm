import {
  ChevronRightIcon,
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
import { Link } from 'react-router-dom';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';
import Card from '../component/molecules/Card';
import CardFilterMonthAndYear from '../component/molecules/CardFilterMonthAndYear';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import LayoutMobile from '../LayoutMobile';

const LemburanMobile = ({ history }) => {
  const dataJson = dataCeoMessages;
  const ABSENSI = useSelector((state) => state.presence);
  const USER = useSelector((state) => state.users);

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

  const getDataLemburan = () => {
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
        console.log('datalembur', response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    absenToday();
    getDataLemburan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER]);

  return (
    <LayoutMobile addClass="bg-gradient-to-r from-blue-100 to-warmGray-100 p-0 pb-0">
      <div
        className="bg-blue-100 h-auto p-4 pb-10 -mt-4 -mx-4 rounded-br-3xl relative"
        style={{ borderBottomRightRadius: '3rem' }}>
        {/* Kehadiran  */}
        <Card addClass="relative mt-20 mb-4">
          <div className="flex bg-white rounded-lg p-4">
            <div className="flex justify-center items-start gap-4 w-4/5 ">
              <div className="bg-apps-gray bg-opacity-10 rounded-md p-2">
                <img
                  src={
                    USER?.image_url
                      ? USER.image_url
                      : `https://ui-avatars.com/api/?name=${USER?.name}&background=F3F3F3&color=000`
                  }
                  alt="myProfile"
                  className="rounded-md h-10 w-10"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <h1 className="font-semibold text-gray-800 capitalize">
                  {USER?.name?.toLowerCase()}
                </h1>
                <p className="text-gray-500 text-xs font-light">
                  {ABSENSI?.dataOut?.jam
                    ? 'Anda dapat mengajukan lembur sekarang!'
                    : 'Silahkan checkout terlebih dahulu.'}
                </p>
              </div>
            </div>

            <Link
              to={ABSENSI?.dataOut?.jam ? '/overtime-in' : '#'}
              className="flex justify-center items-center w-1/5 rounded-md">
              <ChevronRightIcon
                className={`${
                  ABSENSI?.dataOut?.jam ? 'text-apps-primary' : 'text-gray-400'
                } h-8 p-1`}
              />
            </Link>
          </div>
        </Card>
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
        link={history.goBack}
        moreClass="absolute top-3 mx-2 inset-x-0"
      />

      {/* section review */}
      <div
        className="bg-warmGray-100 relative rounded-tl-3xl -mx-4 px-4 pt-2 pb-20"
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
            {dataJson.documentLemburan.map((data) => (
              <CardOvertimeApproval
                key={Math.random()}
                date={data.date}
                hours={data.time}
                status={data.status}
                title={data.title}
              />
            ))}
          </CardGridMobile>
        </Card>
        {/* End Section Card Report Overtime this Month */}
      </div>
    </LayoutMobile>
  );
};

export default LemburanMobile;
