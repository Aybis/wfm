import { LogoutIcon } from '@heroicons/react/outline';
import React from 'react';
import { Redirect } from 'react-router';
import notify from 'helpers/hooks/toast';

export default function MobileHeader({ user, history }) {
  const logOoutUser = () => {
    notify('info', 'Logout success 👋');
    // remove token
    localStorage.removeItem('WFM:token');
    // remove cookies
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    // redirect link
    <Redirect push to="/login" />;
    // reload page
    window.location.reload();
  };

  return (
    <div className="flex lg:hidden justify-between items-center mb-4 transition-all duration-300 ease-in-out">
      <div className="flex gap-2 items-center justify-center">
        <div className="relative">
          {user.avatar ? (
            <img
              loading="lazy"
              height={10}
              width={10}
              src={user.avatar}
              alt="avatar"
              className="h-10 w-10 rounded"
            />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=0062FF&color=fff`}
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
            {user ? user.name.toLowerCase() : ''}
          </h2>
          <h3 className="text-xs font-medium text-apps-text transform uppercase">
            {user ? user.position.toLowerCase() : ''}
          </h3>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-apps-text text-opacity-50">
        <h1 className="lg:block hidden text-apps-text text-lg text-opacity-70">
          Kamis, 10 Juni 2021
        </h1>
        <div className="block lg:hidden">
          <LogoutIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => logOoutUser()}
          />
          <p className="text-xs font-medium ">Logout</p>
        </div>
      </div>
    </div>
  );
}
