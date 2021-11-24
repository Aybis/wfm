import { UserCircleIcon } from '@heroicons/react/outline';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import { setAuthorizationHeader } from 'configs/axios';
import users from 'constants/api/users';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import HeadingMobile from '../component/atoms/HeadingMobile';
import Card from '../component/molecules/Card';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import LayoutMobile from '../LayoutMobile';

export default function InforekanMobile({ history }) {
  const [dataList, setdataList] = useState([]);
  const [items, setitems] = useState(10);
  const [isLoading, setisLoading] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const session = localStorage['WFM:token']
    ? JSON.parse(localStorage['WFM:token'])
    : null;

  const getDataUser = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);
    users
      .allTroops()
      .then((res) => {
        setdataList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* code for infinite scroll */
  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreData();
    }
  };

  const loadMoreData = () => {
    if (isLoading) {
      return;
    }
    setisLoading(true);
    setTimeout(() => {
      setitems((prev) => {
        return prev + 10;
      });
      setisLoading(false);
      getDataUser();
    }, 1000);
  };

  useEffect(() => {
    getDataUser();
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, items]);

  if (!didMount) {
    return null;
  }
  return (
    <LayoutMobile isShow={false}>
      <CardTitlePageMobile title="Inforekan" link={history.push('/')} />

      <Card>
        <HeadingMobile
          heading="Board of Directors"
          moreClass="text-center mb-4"
        />
        <CardScrollHorizontal>
          <div className="flex w-full flex-none">
            <div className="relative h-auto">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/hc.png`}
                alt="dirut"
                className="h-36 absolute left-4 z-10"
              />
              <div className="absolute right-0 z-10 rounded-tr-lg rounded-bl-full bg-white w-20 pl-6 py-1 pr-2">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                  loading="lazy"
                  alt="logo"
                  className="h-6 w-10 transition-all duration-500 ease-in-out"
                />
              </div>
              <div
                className="relative top-0 h-36 text-left pl-28 p-2 rounded-l-xl rounded-r-xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg"
                style={{ borderTopLeftRadius: '10rem' }}>
                <h1 className="pl-2 text-lg text-white tracking-wide font-semibold">
                  Henry Christiadi
                </h1>
                <h2 className="pl-2 text-sm tracking-wide text-gray-100 -mt-1">
                  Direktur Utama | 720465
                </h2>
                <h4 className="pl-2 text-xs mt-4 text-gray-50 tracking-wide">
                  Henry Christiadi lahir di Pati, pada tahun 1972. Diangkat
                  sebagai Direktur Utama PT PINS Indonesia pada tanggal 4
                  November 2019.
                </h4>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-none">
            <div className="relative h-auto">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/heru.png`}
                alt="dirut"
                className="h-36 absolute left-1 z-10"
              />
              <div className="absolute right-0 z-10 rounded-tr-lg rounded-bl-full bg-white w-20 pl-6 py-1 pr-2">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                  loading="lazy"
                  alt="logo"
                  className="h-6 w-10 transition-all duration-500 ease-in-out"
                />
              </div>
              <div
                className="relative top-0 h-36 text-left pl-28 p-2 rounded-l-xl rounded-r-xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg"
                style={{ borderTopLeftRadius: '10rem' }}>
                <h1 className="pl-1 text-lg text-white tracking-wide font-semibold">
                  Heru Adryana
                </h1>
                <h2 className="pl-1 text-sm tracking-wide text-gray-100 -mt-1">
                  Direktur FBS | ******
                </h2>
                <h4 className="pl-1 text-xs mt-4 text-gray-50 tracking-wide">
                  Heru Adryana lahir di Bandung pada tahun 1971. Menjabat
                  sebagai Direktur Finance & Business Support PT PINS Indonesia
                  sejak bulan Juni 2021.
                </h4>
              </div>
            </div>
          </div>
        </CardScrollHorizontal>
      </Card>

      <CardGridMobile
        col={2}
        isHeading
        heading="Karyawan"
        subheading={`Result : ${dataList.length} Karyawan`}>
        {dataList.length === 0 && <LoadingCircle />}
        {dataList.slice(0, items).map((data) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={Math.random()}
            className="flex shadow-sm p-4 flex-col justify-center items-center rounded-lg bg-gray-50 cursor-pointer">
            <UserCircleIcon className="h-28 w-28 text-gray-400 border border-gray-200 rounded-full" />
            <h1 className="mt-4 text-sm font-semibold text-gray-800 tracking-wide text-center capitalize">
              {data.name.toLowerCase()}
            </h1>
            <h1 className="mt-1 text-xs text-gray-400">{data.nik}</h1>
          </motion.div>
        ))}
      </CardGridMobile>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <LoadingCircle />
        </div>
      ) : (
        ''
      )}
    </LayoutMobile>
  );
}
