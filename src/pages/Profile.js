import { ChevronRightIcon } from '@heroicons/react/solid';
import Menu from 'components/devices/desktop/section/Menu';
import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import MobileMenu from 'components/devices/mobile/sections/MobileMenu';
import { motion } from 'framer-motion';
import dataJson from 'json/dataCeoMessages';
import React, { useEffect } from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';

export default function Profile({ history }) {
  const USER = useSelector((state) => state.users);
  const menuProfiles = dataJson.dataMenuProfiles;
  console.log(USER);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER]);

  return USER ? (
    <div className="relative w-full h-screen bg-coolGray-50">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-24'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        <MobileMenu />

        <div className="relative mx-auto my-4 mt-8 p-4 bg-gradient-to-b from-coolGray-50 to-white rounded-b-lg">
          <div className="flex flex-col gap-2 justify-center items-center">
            {USER?.image_url ? (
              <img
                loading="lazy"
                height={10}
                width={10}
                src={USER?.image_url}
                alt="avatar"
                className="h-32 w-32 rounded-lg shadow-lg"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${USER?.name}&background=0062FF&color=fff`}
                alt="avatar"
                loading="lazy"
                height={10}
                width={10}
                className="h-32 w-32 rounded-lg"
              />
            )}
            <h1 className="capitalize text-gray-800 font-semibold mt-4">
              {USER?.name?.toLowerCase()}
            </h1>
            <h2 className="capitalize -mt-1 text-gray-400 text-xs text-center">
              {USER?.position}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-medium text-gray-600 text-sm">{USER?.nik}</h1>
              <h2 className="text-gray-400 text-xs">NIK</h2>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-medium text-gray-600 text-sm">
                {USER?.username}
              </h1>
              <h2 className="text-gray-400 text-xs">Email</h2>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-medium text-gray-600 text-sm capitalize">
                {USER?.workplace?.toLowerCase() ?? ''}
              </h1>
              <h2 className="text-gray-400 text-xs">Workplace</h2>
            </div>
          </div>
        </div>

        <h1 className="text-lg font-semibold text-gray-600 mt-8">
          Setting Account
        </h1>

        <div className="grid grid-cols-1 gap-4 my-4">
          {menuProfiles.map((menu) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center p-6 bg-white w-full rounded-lg"
              key={Math.random()}>
              <div className="min-w-0 flex-1 flex items-center r">
                <div className="flex-shrink-0">{menu.icon}</div>
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {menu.name}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-400">
                      <span className="truncate">{menu.detail}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-600"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <CardLoading />
  );
}
