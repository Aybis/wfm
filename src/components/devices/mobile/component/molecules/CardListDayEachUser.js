import { PaperAirplaneIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import React from 'react';

export default function CardListDayEachUser(props) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={item}
      className={`flex flex-col w-full gap-2 bg-white rounded-xl mt-4 py-2`}>
      <div className="flex justify-between py-4 px-6">
        <div
          className="flex gap-2 absolute inset-x-0 mx-6"
          style={{ marginTop: '7px' }}>
          {Array.from({ length: 15 }).map((item) => (
            <div
              key={Math.random()}
              className="border-t-2 bg-gray-200 w-5"></div>
          ))}
        </div>
        <div className="grid grid-cols-3 w-full h-full z-20">
          <div className="flex flex-col items-start gap-4">
            <div className="flex justify-center items-center h-4 w-4 rounded-full bg-gray-400">
              <span className="bg-white h-2 w-2 rounded-full"></span>
            </div>
            <h2 className="font-medium text-gray-400">IN</h2>
          </div>
          <div className="flex flex-col justify-center items-center px-4 gap-2">
            <PaperAirplaneIcon className="transform rotate-45 h-7 w-10 text-apps-primary white rounded-full -mt-3" />
            <h4 className={`text-sm font-semibold text-gray-600`}>
              {props.data?.detail_absensi[1]?.jam
                ? (
                    convertDate(
                      'hoursMinutes',
                      props.data?.detail_absensi[1]?.jam,
                    ) -
                    convertDate(
                      'hoursMinutes',
                      props.data?.detail_absensi[0]?.jam,
                    )
                  ).toFixed(2) + 'h'
                : 'On Duty'}
            </h4>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex justify-center items-center h-4 w-4 rounded-full bg-apps-primary">
              <span className="bg-white h-2 w-2 rounded-full"></span>
            </div>
            <h2 className="font-medium text-gray-400">
              {props.data.kehadiran ?? props.data.kondisi}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-between py-2 px-6">
        <div className="flex flex-col justify-center items-start">
          <h3
            className={`text-base lg:text-base font-bold ${
              props?.data?.keterangan ? 'text-red-600' : 'text-gray-800'
            }`}>
            {props.data?.detail_absensi[0]?.jam
              ? convertDate('timeAm', props.data?.detail_absensi[0]?.jam)
              : ''}
          </h3>
          <h3 className={`text-sm tracking-wide text-gray-400`}>
            {props.data?.detail_absensi[0]?.jam
              ? convertDate('dateStyle', props.data?.detail_absensi[0]?.jam)
              : ''}
          </h3>
        </div>
        <div className="flex flex-col justify-center items-end">
          <h3 className={`text-base lg:text-base font-bold text-gray-800`}>
            {props.data?.detail_absensi[1]?.jam
              ? convertDate('timeAm', props.data?.detail_absensi[1]?.jam)
              : 'On Duty'}
          </h3>
          <h3 className={`text-sm text-gray-400 tracking-wide`}>
            {props.data?.detail_absensi[1]?.jam
              ? convertDate('dateStyle', props.data?.detail_absensi[1]?.jam)
              : ''}
          </h3>
        </div>
      </div>
      {props?.data?.keterangan ? (
        <div className="relative mt-4">
          <div className="flex justify-center items-center">
            <div className="h-6 w-6 rounded-full bg-warmGray-100 absolute -left-3"></div>
            <div className="flex gap-2 absolute inset-x-0 mx-3">
              {Array.from({ length: 24 }).map((item) => (
                <div
                  key={Math.random()}
                  className="border-t-2 bg-gray-200 w-2"></div>
              ))}
            </div>
            <div className="h-6 w-6 rounded-full bg-warmGray-100 absolute -right-3"></div>
          </div>
          <div className="rounded-b-lg flex w-full justify-center items-center p-2 font-medium text-sm text-red-500 pt-4">
            {props.data.keterangan}
          </div>
        </div>
      ) : (
        ''
      )}
    </motion.div>
  );
}
