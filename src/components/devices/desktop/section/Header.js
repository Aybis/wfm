import { BellIcon } from '@heroicons/react/outline';
import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const USER = useSelector((state) => state.users);
  return (
    <header className="flex justify-between top-0 inset-x-0 mb-12">
      <div className="flex gap-1 items-center">
        <h1 className="block text-apps-text text-opacity-40">
          Kamis, 10 Juni 2021
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <div className="grid grid-cols-1">
          <BellIcon className="h-8 w-8 p-1 text-apps-text " />
          <span className="h-2 w-2 rounded-full bg-apps-red absolute ml-4 mt-1"></span>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="relative">
            {USER.avatar ? (
              <img
                loading="lazy"
                height={10}
                width={10}
                src={USER.avatar}
                alt="avatar"
                className="h-10 w-10 rounded"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${USER.name}&background=0062FF&color=fff`}
                alt="avatar"
                loading="lazy"
                height={10}
                width={10}
                className="h-10 w-10 rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col -gap-2">
            <h2 className="font-semibold text-apps-text transform capitalize">
              {USER ? USER.name.toLowerCase() : ''}
            </h2>
            <h3 className="text-xs font-medium text-apps-text transform uppercase">
              {USER ? USER.position.toLowerCase() : ''}
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
