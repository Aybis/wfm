import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import { useSelector } from 'react-redux';
import CardLoading from './CardLoading';

export default function CardDay() {
  const ABSEN = useSelector((state) => state.presence);
  const USER = useSelector((state) => state.users);

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return USER && ABSEN.status === 'ok' ? (
    <motion.div
      variants={item}
      className={`flex flex-col w-full gap-4 bg-white rounded-xl mt-4 `}>
      <div className={`flex gap-4  w-full p-4 h-auto `}>
        {/* in */}
        <div className="flex flex-col gap-2 justify-start w-1/3">
          <h2 className="font-bold text-apps-primary text-lg">IN</h2>
          <h3 className="text-sm font-normal text-gray-500">
            {ABSEN.dataIn.lokasi ?? 'Belum Absen'}
          </h3>
          <h3 className="text-sm lg:text-base font-semibold mt-2 text-gray-700">
            {ABSEN.dataIn.jam ? convertDate('fullTime', ABSEN.dataIn.jam) : ''}
          </h3>
        </div>
        {/* icon */}
        <div className="flex items-center justify-center w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-apps-primary text-opacity-40 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        {/* out  */}

        <div className="flex flex-col gap-2 text-right w-1/3 justify-between">
          <h2 className="font-bold text-apps-primary text-lg">
            {ABSEN.data.kehadiran ?? 'OTW'}
          </h2>
          <h3 className={`text-sm lg:text-base text-gray-500`}>
            {ABSEN.dataOut.jam ? ABSEN.dataOut.lokasi : ''}
          </h3>
          <h4
            className={`text-sm lg:text-base font-semibold mt-2 text-gray-700 `}>
            {ABSEN.dataOut.jam
              ? convertDate('fullTime', ABSEN.dataOut.jam)
              : ''}
          </h4>
        </div>
      </div>
    </motion.div>
  ) : (
    <CardLoading />
  );
}
