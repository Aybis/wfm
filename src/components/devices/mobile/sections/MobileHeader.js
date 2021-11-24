import { ChevronRightIcon } from '@heroicons/react/outline';
import {
  DocumentTextIcon,
  HomeIcon,
  MenuAlt2Icon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ModalImage from '../component/molecules/ModalImage';
import StaticProfile from '../pages/StaticProfile';

export default function MobileHeader() {
  const USER = useSelector((state) => state.users);
  const history = useHistory();
  const ABSEN = useSelector((state) => state.presence);
  const [showModal, setshowModal] = useState(false);
  const [sourceImage, setsourceImage] = useState(undefined);
  const [showStaticSidebar, setshowStaticSidebar] = useState(false);

  const handlerClickShowModalImage = (image) => {
    setsourceImage(image);
    setshowModal(true);
  };

  let link;

  const handlerAbsen = () => {
    history.push(link);
  };

  if (Object.entries(ABSEN.data).length === 0) {
    link = `/check-in`;
  } else {
    if (ABSEN.dataOut.jam) {
      if (
        convertDate('dateOnly', ABSEN.dataIn.jam) !== convertDate('dateOnly')
      ) {
        link = `/check-in`;
      }
    } else if (ABSEN.dataIn.jam) {
      link = `/check-out/${ABSEN.data.id}`;
    }
  }

  return (
    isMobile && (
      <>
        <div
          className="relative mb-8 transition-all duration-300 ease-in-out  -m-4 px-6 pt-6 pb-10"
          style={{
            borderBottomLeftRadius: '2rem',
            borderBottomRightRadius: '2rem',
          }}>
          <div className="relative w-10">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center bg-white rounded-md p-1 border-2 border-gray-200 border-opacity-40"
              onClick={() => setshowStaticSidebar(true)}>
              <MenuAlt2Icon className="h-6 w-6  text-gray-800" />
            </motion.div>
          </div>

          <div className="flex gap-2 mt-8 justify-between items-center">
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-normal text-warmGray-400">
                Welcome back,{' '}
              </span>
              <h1 className="text-lg font-semibold text-warmGray-800 -mt-1 capitalize">
                {USER?.name.toLowerCase()}
              </h1>
              <span className="text-xs font-light text-warmGray-400">
                {convertDate('date')}
              </span>
            </div>

            <div className="p-2">
              {USER?.image_url ? (
                <img
                  loading="lazy"
                  height={10}
                  width={10}
                  src={USER?.image_url}
                  onClick={() => handlerClickShowModalImage(USER?.image_url)}
                  alt="avatar"
                  className="h-12 w-12 rounded-md shadow-lg"
                />
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?name=${USER?.name}&background=0062FF&color=fff`}
                  alt="avatar"
                  loading="lazy"
                  height={10}
                  width={10}
                  className="h-12 w-12 rounded-md object-center object-contain"
                />
              )}
            </div>
          </div>

          <div className="absolute flex justify-center items-center inset-x-0 mt-6">
            {convertDate('dateOnly', ABSEN?.dataIn?.jam) ===
            convertDate('dateOnly') ? (
              <div className="bg-white px-4 py-3 border divide-x-2 border-gray-200 border-opacity-75 rounded-lg flex justify-between items-center gap-2">
                <span className="p-0">
                  {ABSEN?.data.kehadiran ? (
                    ABSEN.data.kehadiran === 'WFO' ? (
                      <OfficeBuildingIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <HomeIcon className="h-5 w-5 text-blue-500" />
                    )
                  ) : (
                    <DocumentTextIcon className="h-5 w-5 text-orange-500" />
                  )}
                </span>
                <span className="text-xs font-semibold text-gray-800 pl-2 py-1">
                  {convertDate('timeAm', ABSEN?.dataIn.jam)}
                </span>
                <div className="flex justify-center items-center pl-2">
                  {ABSEN?.dataOut?.jam ? (
                    <span className="text-xs font-semibold text-gray-800">
                      {convertDate('timeAm', ABSEN?.dataOut.jam)}
                    </span>
                  ) : (
                    <button
                      onClick={() => handlerAbsen()}
                      className="text-xs px-3 py-1 bg-red-500 text-white rounded font-normals">
                      Checkout
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div
                onClick={() => handlerAbsen()}
                className="bg-white px-3 py-2 border cursor-pointer border-gray-200 border-opacity-75 rounded-lg flex justify-between items-center gap-2">
                <span className="text-xs font-semibold text-red-500 pl-2 py-1">
                  Anda Belum Absen!
                </span>
                <span className="text-xs px-2 py-1 text-gray-800">
                  <ChevronRightIcon className="h-5 w-5" />
                </span>
              </div>
            )}
          </div>
        </div>

        <ModalImage
          open={showModal}
          handlerClose={() => setshowModal(false)}
          src={sourceImage}
        />

        <StaticProfile
          isOpen={showStaticSidebar}
          handlerClose={() => setshowStaticSidebar(false)}
        />
      </>
    )
  );
}
