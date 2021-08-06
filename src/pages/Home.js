import Heading from 'components/atoms/Heading';
import LoadingCircle from 'components/atoms/LoadingCircle';
import Modal from 'components/atoms/Modal';
import TableWithoutHeader from 'components/atoms/TableWithoutHeader';
import CardDaily from 'components/molecules/CardDaily';
import CardDay from 'components/molecules/CardDay';
import CardPresence from 'components/molecules/CardPresence';
import Carousel from 'components/molecules/Carousel';
import { motion } from 'framer-motion';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MobileHeader from 'section/MobileHeader';
import MobileMenu from 'section/MobileMenu';
import absensi from '../constants/api/absensi';

const Home = () => {
  const [dataPersonal, setdataPersonal] = useState(false);
  const [dataWeeklyPersonal, setdataWeeklyPersonal] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const users = useSelector((state) => state.users);

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

  const CardCheckInStatus = ({ absensi }) => {
    if (!absensi) {
      return <CardPresence link="/check-in" />;
    } else {
      if (absensi.detail_absensi[1]) {
        return <CardPresence status="out" />;
      } else if (absensi.detail_absensi[0]) {
        return <CardPresence status="in" link={`/check-out/${absensi.id}`} />;
      }
    }
  };

  const getDataWeeklyPersonal = () => {
    absensi
      .weeklyPersonal(users?.id)
      .then((res) => {
        setdataWeeklyPersonal(res.length > 0 ? res : null);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  const getDataDailyPersonal = () => {
    absensi
      .dailyPersonal(users?.id)
      .then((res) => {
        setdataPersonal(res.user_id ? res : null);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  useEffect(() => {
    setshowModal(true);
    const timeOut = setTimeout(() => {
      getDataDailyPersonal();
      getDataWeeklyPersonal();
      setshowModal(true);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return users ? (
    <div className="relative mb-12 lg:mb-0">
      <MobileHeader />
      <MobileMenu />

      <Modal
        title="Berita Hari Ini"
        isShowModal={() => setshowModal(false)}
        show={showModal}>
        <Carousel />
      </Modal>

      {/* Code Block Asynchrounous Data Absensi Today  */}
      {dataPersonal ? (
        <div
          className={`${
            isDesktop ? 'my-24 ' : 'my-0'
          } relative transition-all duration-300 ease-in-out`}>
          <CardCheckInStatus absensi={dataPersonal} />
          <div className="mt-8 relative">
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="mt-2">
              {dataPersonal && isMobile && (
                <CardDay
                  type={dataPersonal.kehadiran}
                  locIn={dataPersonal.detail_absensi[0].lokasi}
                  timeIn={dataPersonal.detail_absensi[0].jam}
                  locOut={
                    dataPersonal.detail_absensi[1]
                      ? dataPersonal.detail_absensi[1].lokasi
                      : 'On Duty'
                  }
                  timeOut={
                    dataPersonal.detail_absensi[1]
                      ? dataPersonal.detail_absensi[1].jam
                      : 'On Duty'
                  }
                />
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        <CardCheckInStatus absensi={dataPersonal} />
      )}
      {/* End Code Block Asynchrounous Data Absensi Today  */}

      {/* Start Code Block Asynchrounous Data Weekly Absensi   */}
      <div
        className={`${
          isDesktop ? 'mt-24' : 'mt-8'
        } relative transition-all duration-300 ease-in-out`}>
        {dataWeeklyPersonal ? (
          <>
            {isMobile && <Heading heading="Weekly Report" />}

            <div
              className={`overflow-x-auto hidden-scroll gap-4 mt-2 py-4 transition-all duration-300 ease-in-out ${
                isDesktop ? 'grid grid-cols-5' : 'flex '
              } `}>
              {dataWeeklyPersonal.map((item, index) => (
                <CardDaily
                  key={index}
                  hari={item.hari}
                  kehadiran={item.kehadiran}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="mx-24">
            <Heading heading="Weekly Report" />
            <p className="mt-2 text-sm text-apps-gray">
              Anda belum absensi minggu ini ...
            </p>
          </div>
        )}
      </div>
      {/* End Code Block Asynchrounous Data Weekly Absensi */}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-white">
      <LoadingCircle />
    </div>
  );
};

export default Home;
