import { UserCircleIcon } from '@heroicons/react/solid';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import { setAuthorizationHeader } from 'configs/axios';
import users from 'constants/api/users';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from 'store/actions/employee';
import LayoutDekstop from '../LayoutDekstop';
import CardContainer from '../molecules/CardContainer';
import CardGridDekstop from '../molecules/CardGridDekstop';
import FilterInforekan from '../molecules/FilterInforekan';
import TitlePageDesktop from '../molecules/TitlePageDesktop';

export default function InforekanDekstop({ history }) {
  const [dataList, setdataList] = useState([]);
  const [items, setitems] = useState(10);
  const [isLoading, setisLoading] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const EMPLOYEE = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const session = localStorage['WFM:token']
    ? JSON.parse(localStorage['WFM:token'])
    : null;

  const getDataUser = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);
    users
      .allTroops()
      .then((res) => {
        dispatch(fetchAll(res.data));
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
  }, [dispatch, isLoading, items]);

  if (!didMount) {
    return null;
  }

  return (
    <LayoutDekstop moreClass="hidden-scroll">
      <CardContainer>
        <TitlePageDesktop link={history.goBack} title="Inforekan" />
      </CardContainer>

      <CardContainer moreClass="-mt-6">
        <div className="grid grid-cols-1 h-auto place-items-center">
          <div className="flex justify-center inset-x-0 absolute top-12">
            <h1 className="text-2xl font-bold text-gray-800 ">
              Board of Directors
            </h1>
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/jumbotron.png`}
            className="w-full object-cover bg-white h-80 rounded-2xl shadow-xl"
            alt="jumbotron"
            loading="lazy"
          />

          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 h-auto md:w-2xl lg:w-4xl xl:w-7xl max-w-7xl rounded-3xl lg:-mt-56 shadow-2xl p-8">
            <div className="grid grid-cols-3">
              <div className="flex flex-col justify-center">
                <h1 className="font-bold text-2xl r text-gray-800">
                  Henry Christiadi
                </h1>
                <h2 className="mt-1  text-gray-400">Direktur Utama | 720465</h2>
                <h4 className="text-sm text-gray-500 mt-10 r ">
                  Henry Christiadi lahir di Pati, pada tahun 1972. Diangkat
                  sebagai Direktur Utama PT PINS Indonesia pada tanggal 4
                  November 2019.
                </h4>

                <div className="flex gap-4 mt-20">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/HC.jpeg`}
                    className="h-16 w-16 object-top object-cover rounded"
                    alt="jumbotron"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="h-72 w-72 rounded-full">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/HC.jpeg`}
                    className="w-72 h-72 object-top object-cover rounded-full p-2 border-2 border-gray-200"
                    alt="jumbotron"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 justify-items-start">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-gray-800">2019</h1>
                  <h2 className="text-xs text-gray-400">
                    Direktur Utama PT PINS Indonesia
                  </h2>
                </div>
                <div className="flex flex-col textlf">
                  <h1 className="font-semibold text-gray-800">2012 - 2019</h1>
                  <h2 className="text-xs text-gray-400">
                    Vice President Regulatory Management PT. Telekomunikasi
                    Indonesia
                  </h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-gray-800">2014</h1>
                  <h2 className="text-xs text-gray-400">
                    Satyalancana Wira Karya oleh Presiden Republik Indonesia
                  </h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-gray-800">2007 - 2012</h1>
                  <h2 className="text-xs text-gray-400">
                    General Manager Unit Enterprise Government, Army and Police
                    Divisi Enterprise Service PT. Telekomunikasi Indonesia
                  </h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-gray-800">2010 - 2011</h1>
                  <h2 className="text-xs text-gray-400">
                    “The Best Unit” dalam pengelolaan risiko Divisi Enterprise
                    Service
                  </h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-gray-800">2006 - 2007</h1>
                  <h2 className="text-xs text-gray-400">
                    Deputy General Manager Jakarta Pusat PT. Telekomunikasi
                    Indonesia
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContainer>

      {/* Section End Report Monthly */}
      <CardContainer
        moreClass="mt-12"
        heading="Employee"
        subheading={`Result : ${dataList.length} Karyawan`}>
        {dataList.length === 0 && <LoadingCircle />}
        {/* Section Filter Grouping  */}
        <CardGridDekstop
          col={6}
          moreClass="my-8 justify-center items-center container mx-auto  p-2 divide-x-2 divide-coolGray-100 bg-white rounded-lg shadow-md">
          <FilterInforekan data={EMPLOYEE} />
        </CardGridDekstop>
        {/* Section End Filter Grouping  */}

        <CardGridDekstop moreClass="my-4 pt-4 lg:grid-cols-4 2xl:grid-cols-5 mb-4">
          {dataList.slice(0, items).map((data) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={Math.random()}
              className="flex p-4 flex-col justify-center items-center rounded-lg bg-gray-50 cursor-pointer">
              <UserCircleIcon className="h-28 w-28 text-gray-400 border border-gray-200 rounded-full" />
              <h1 className="mt-4 font-semibold text-gray-800  text-center capitalize">
                {data.name.toLowerCase()}
              </h1>
              <h1 className="mt-1 text-gray-400">{data.nik}</h1>
            </motion.div>
          ))}
        </CardGridDekstop>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : (
          ''
        )}
      </CardContainer>
      {/* Section End Report Monthly */}
    </LayoutDekstop>
  );
}
