import LoadingCircle from 'components/atoms/LoadingCircle';
import Modal from 'components/atoms/Modal';
import CardDay from 'components/molecules/CardDay';
import CardDayOffDesktop from 'components/molecules/CardDayOffDesktop';
import CardHeadingDesktop from 'components/molecules/CardHeadingDesktop';
import CardMessages from 'components/molecules/CardMessages';
import CardPresence from 'components/molecules/CardPresence';
import CardTesting from 'components/molecules/CardTesting';
import CardUnit from 'components/molecules/CardUnit';
import Carousel from 'components/molecules/Carousel';
import { motion } from 'framer-motion';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import MobileHeader from 'section/MobileHeader';
import MobileMenu from 'section/MobileMenu';
import absensi from '../constants/api/absensi';
import apiUser from '../constants/api/users';

const Home = () => {
  const [dataPersonal, setdataPersonal] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [dataUnit, setdataUnit] = useState(false);
  const [dataHoliday, setdataHoliday] = useState(false);
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

  const getDataHoliday = () => {
    absensi
      .getHoliday()
      .then((res) => {
        setdataHoliday(res.length > 0 ? res : false);
      })
      .catch((err) => {
        ToastHandler('err', err.message);
      });
  };
  const getDataAllUnit = () => {
    apiUser
      .allUnit()
      .then((res) => {
        setdataUnit(res.data);
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
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
    // setshowModal(true);
    const timeOut = setTimeout(() => {
      getDataDailyPersonal();
      getDataAllUnit();
      getDataHoliday();
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
        <LoadingCircle />
      )}
      {/* End Code Block Asynchrounous Data Absensi Today  */}

      {/* Start Card Selebs  */}
      <div className={`${isDesktop ? ' mt-20 pb-6' : 'mt-8 '} relative`}>
        <CardHeadingDesktop
          heading="Our Selebs Today"
          description="List Pegawai Telat Melakukan Absensi"
        />
        <div
          className={`flex overflow-auto ${
            isMobile ? 'hidden-scroll -my-8' : '-m-8'
          }`}>
          <ul className="flex items-center w-full p-8">
            <CardTesting />
            <CardTesting />
            <CardTesting />
            <CardTesting />
            <CardTesting />
            <CardTesting />
            <CardTesting />
            <CardTesting />
          </ul>
        </div>
      </div>
      {/* End Card Selebs  */}

      {/* Start CEO Messages  */}
      <div className={`${isDesktop ? ' mt-24 pb-6' : 'mt-8 '} relative`}>
        <CardHeadingDesktop
          heading="CEO Messages"
          description="Motivation From Our CEO"
        />
        <div
          className={`flex overflow-auto ${
            isMobile ? 'hidden-scroll -my-8' : '-m-8'
          }`}>
          <ul className="flex items-center w-full p-8">
            <CardMessages />
            <CardMessages />
            <CardMessages />
            <CardMessages />
          </ul>
        </div>
      </div>
      {/* End Card CEO Messages  */}

      {/* Start Section Units  */}
      <div
        className={`${
          isDesktop ? ' mt-24 border-b border-gray-200' : 'mt-8 '
        } relative`}>
        <CardHeadingDesktop
          heading="Our Units"
          description="List Unit on This Company"
        />
        <div className="overflow-x-auto hidden-scroll flex lg:grid lg:grid-cols-4 gap-3">
          {dataUnit ? (
            dataUnit.map((data, index) => (
              <CardUnit key={index} name={data.name} />
            ))
          ) : (
            <LoadingCircle />
          )}
        </div>
      </div>
      {/* End Section Units  */}

      {/* Start Section Units  */}
      <div className={`${isDesktop ? ' mt-24' : 'mt-8 '} relative`}>
        <CardHeadingDesktop
          heading="Day Off"
          description="List Day Off in This Year"
        />
        {dataHoliday ? (
          <table
            className={`${
              isDesktop ? 'w-full' : 'flex overflow-x-auto hidden-scroll'
            } whitespace-nowrap`}>
            <tbody>
              {dataHoliday.map((data, index) => (
                <CardDayOffDesktop key={index} data={data} />
              ))}
            </tbody>
          </table>
        ) : (
          <LoadingCircle />
        )}
      </div>
      {/* End Section Units  */}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-white">
      <LoadingCircle />
    </div>
  );
};

export default Home;
