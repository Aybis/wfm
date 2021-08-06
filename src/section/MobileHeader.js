import { LogoutIcon } from '@heroicons/react/outline';
import notify from 'helpers/hooks/toast';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

export default function MobileHeader() {
  const users = useSelector((state) => state.users);
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
    isMobile && (
      <div className="flex justify-between items-center mb-8 transition-all duration-300 ease-in-out">
        <div className="flex gap-2 items-center justify-center">
          <div className="relative">
            {users.image_url ? (
              <img
                loading="lazy"
                height={10}
                width={10}
                src={users.image_url}
                alt="avatar"
                className="h-10 w-10 rounded"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${users.name}&background=0062FF&color=fff`}
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
              {users?.name?.toLowerCase()}
            </h2>
            <h3 className="text-xs font-medium text-apps-text transform uppercase">
              {users?.position?.toLowerCase()}
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-apps-text text-opacity-50">
          <div className="block">
            <LogoutIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => logOoutUser()}
            />
            <p className="text-xs font-medium ">Logout</p>
          </div>
        </div>
      </div>
    )
  );
}
