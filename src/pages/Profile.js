import Menu from 'components/devices/desktop/section/Menu';
import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import CardTitlePageMobile from 'components/devices/mobile/component/molecules/CardTitlePageMobile';
import React, { useEffect } from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';

export default function Profile({ history }) {
  const USER = useSelector((state) => state.users);

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
        <CardTitlePageMobile title="My Profile" link={history.goBack} />

        <div className="relative mx-auto my-4 mt-8 p-4">
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
            <h2 className="capitalize -mt-1 text-gray-400 font-light text-xs text-center">
              {USER?.position}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-medium text-gray-600 text-sm">{USER?.nik}</h1>
              <h2 className="text-gray-400 text-xs font-light">NIK</h2>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-medium text-gray-600 text-sm">
                {USER?.username}
              </h1>
              <h2 className="text-gray-400 text-xs font-light">Email</h2>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="font-medium text-gray-600 text-sm capitalize">
                {USER?.workplace?.toLowerCase() ?? ''}
              </h1>
              <h2 className="text-gray-400 text-xs font-light">Workplace</h2>
            </div>
          </div>
        </div>

        <div className="fixed h-1/2 inset-x-0 bottom-0 bg-white rounded-t-3xl"></div>
      </div>
    </div>
  ) : (
    <CardLoading />
  );
}
