import { LogoutIcon } from '@heroicons/react/outline';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import swal from 'sweetalert';

export default function MobileHeader() {
  const users = useSelector((state) => state.users);
  const logOoutUser = () => {
    // notify('success', 'Logout success 👋');
    // remove token
    localStorage.removeItem('WFM:token');
    // remove cookies
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    swal({
      title: 'Logout berhasil!  👋',
      icon: 'success',
      button: 'Close!',
    });

    setTimeout(() => {
      // redirect link
      <Redirect push to="/login" />;
      // reload page
      window.location.reload();
    }, 500);
  };

  return (
    isMobile && (
      <div className="flex justify-between items-center mb-8 transition-all duration-300 ease-in-out">
        <div className="flex gap-3 items-center justify-center">
          <div className="relative">
            {users.image_url ? (
              <img
                loading="lazy"
                height={10}
                width={10}
                src={users.image_url}
                alt="avatar"
                className="h-10 w-10 rounded-lg"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${users.name}&background=0062FF&color=fff`}
                alt="avatar"
                loading="lazy"
                height={10}
                width={10}
                className="h-10 w-10 rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-col -gap-2">
            <h2 className="font-semibold text-gray-800 transform capitalize tracking-wide">
              {users?.name?.toLowerCase()}
            </h2>
            <h3 className="text-sm font-normal text-gray-500 transform uppercase">
              {users?.position?.toLowerCase()}
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-gray-400">
            <LogoutIcon
              className="h-8 w-8 rounded-md cursor-pointer p-1"
              onClick={() => logOoutUser()}
            />
          </div>
        </div>
      </div>
    )
  );
}
