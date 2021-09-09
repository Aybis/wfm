import { UserCircleIcon } from '@heroicons/react/outline';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import { setAuthorizationHeader } from 'configs/axios';
import users from 'constants/api/users';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Card from '../component/molecules/Card';
import CardGridMobile from '../component/molecules/CardGridMobile';
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
      <CardTitlePageMobile title="Inforekan" link={history.goBack} />

      <Card addClass="mb-24">
        <div className="relative bg-transparent h-24">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/hc2.png`}
            alt="dirut"
            className="h-36 absolute left-4 z-10"
          />
          <div
            className="relative top-0 h-36 text-left pl-24 p-2 rounded-l-none rounded-r-xl bg-blue-400 shadow-lg  mr-4"
            style={{ borderTopLeftRadius: '10rem' }}>
            <h1>Henry Chrstiadi</h1>
            <h2>Direktur Utama</h2>
          </div>
        </div>
      </Card>

      <CardGridMobile col={2} isHeading heading="Karyawan">
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
