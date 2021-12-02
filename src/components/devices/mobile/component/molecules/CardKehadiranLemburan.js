import { ChevronRightIcon } from '@heroicons/react/solid';
import CardOvertimeApproval from 'components/devices/desktop/molecules/CardOvertimeApproval';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function CardKehadiranLemburan() {
  const ABSENSI = useSelector((state) => state.presence);
  const USER = useSelector((state) => state.users);
  const LEMBURAN = useSelector((state) => state.lemburan);
  const history = useHistory();

  const handlerClickGotoPage = () => {
    if (ABSENSI?.dataOut?.jam) {
      history.push('/overtime-in');
    } else {
      history.push(`/check-out/${ABSENSI?.data?.id}`);
    }
  };

  return Object.values(LEMBURAN?.checkIn).length > 0 ? (
    Object.values(LEMBURAN.checkOut).length > 0 ? (
      <div className="mt-20 relative mb-4">
        <CardOvertimeApproval
          date={LEMBURAN.checkIn.jam}
          status={LEMBURAN.dataLemburanToday.status}
          title={LEMBURAN.dataLemburanToday.subject}
          timeIn={LEMBURAN.checkIn.jam}
          timeOut={LEMBURAN?.checkOut?.jam}
          isSend={true}
        />
      </div>
    ) : (
      <div className="mt-20 relative mb-4">
        <CardOvertimeApproval
          date={LEMBURAN.checkIn.jam}
          status={LEMBURAN.dataLemburanToday.status}
          title={LEMBURAN.dataLemburanToday.subject}
          timeIn={LEMBURAN.checkIn.jam}
          timeOut={LEMBURAN?.checkOut?.jam}
          link={`/overtime-out/${LEMBURAN.dataLemburanToday.id}`}
        />
      </div>
    )
  ) : (
    <motion.div
      whileTap={ABSENSI?.dataOut?.jam && { scale: 0.9 }}
      onClick={() => handlerClickGotoPage()}
      className="relative mt-20 mb-4">
      <div className="flex bg-white rounded-lg p-4 shadow-xl">
        <div className="flex justify-center items-start gap-4 w-4/5 ">
          <div className="bg-gray-500 bg-opacity-10 rounded-md p-2">
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

        <div className={`p-1 flex justify-end items-center w-1/5`}>
          <ChevronRightIcon
            className={`${
              ABSENSI?.dataOut?.jam ? 'text-gray-800' : 'text-gray-800'
            } h-10 p-1`}
          />
        </div>
      </div>
    </motion.div>
  );
}
