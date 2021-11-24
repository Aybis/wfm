import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import SetMaps from 'components/devices/universal/atoms/SetMaps';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import CardKehadiranDekstop from './CardKehadiranDekstop';

export default function CardMapCheck({ type, link }) {
  const ABSEN = useSelector((state) => state.presence);
  const USER = useSelector((state) => state.users);

  const belumAbsen = Object.entries(ABSEN.data).length === 0;
  const isCheckIn = Object.entries(ABSEN.dataIn).length > 0;
  const isCheckOut = Object.entries(ABSEN.dataOut).length > 0;

  const sendAddress = (value) => {
    return value;
  };

  const sendLonglat = (value) => {
    return value;
  };

  const variants = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  return USER ? (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative grid grid-cols-1 rounded-md mb-8 mt-8">
      {!isCheckOut ? (
        <>
          <SetMaps
            height="100%"
            className="relative h-28 lg:h-64 rounded-t-lg z-0 shadow-md border-2 border-gray-300"
            sendAddress={sendAddress}
            sendlongLat={sendLonglat}
            showButton={false}
          />

          <div className="rounded-b-md grid grid-cols-3 gap-4 bg-white justify-between py-3 px-4 z-10 -mt-5">
            <div className="flex flex-col gap-1">
              <h4 className="text-base text-gray-400">Current</h4>
              <h4 className={`text-base font-semibold text-gray-700`}>
                {belumAbsen && 'Belum Absen'}
                {isCheckIn && ABSEN.data.kehadiran}
              </h4>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-base text-gray-400">Status</h4>
              <span
                className={`text-base font-medium  rounded-md text-green-500`}>
                Available
              </span>
            </div>
            <div className="flex justify-center items-center text-sm ">
              <p className="text-lg font-semibold text-red-600">
                Smartphone Only!
              </p>
            </div>
          </div>
        </>
      ) : (
        <CardKehadiranDekstop />
      )}
    </motion.div>
  ) : (
    <CardLoading />
  );
}
