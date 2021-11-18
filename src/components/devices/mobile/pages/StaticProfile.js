import { Dialog, Transition } from '@headlessui/react';
import { ChevronRightIcon, LogoutIcon, XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import dataJson from 'json/dataCeoMessages';
import { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import swal from 'sweetalert';

export default function StaticProfile({ isOpen, handlerClose }) {
  const USER = useSelector((state) => state.users);
  const menuProfiles = dataJson.dataMenuProfiles;

  const ref = useRef(null);

  const logOoutUser = () => {
    swal({
      title: 'Anda yakin ingin keluar dari aplikasi ini 😭 ?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Logout berhasil!  👋', {
          icon: 'success',
        });

        // remove token
        localStorage.removeItem('WFM:token');
        // remove cookies
        document.cookie.split(';').forEach(function (c) {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(
              /=.*/,
              '=;expires=' + new Date().toUTCString() + ';path=/',
            );
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
      }
    });
    // notify('success', 'Logout success 👋');
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={ref}
        className="fixed inset-0 flex z-40 md:hidden"
        onClose={handlerClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={handlerClose}>
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-2xl font-semibold text-gray-600 ">
                  Profile
                </h1>
              </div>

              <div className="relative mt-12">
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
              </div>
              <div className="space-y-1 px-2 mt-12">
                <div className="grid grid-cols-1 gap-6 my-4">
                  {menuProfiles.map((menu) => (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex justify-between items-center rounded-lg px-3 py-2 border border-gray-200"
                      key={Math.random()}>
                      <div className="flex justify-center items-center gap-2">
                        <div className="flex-shrink-0">{menu.icon}</div>
                        <div className="relative">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {menu.name}
                          </p>
                          <p className="flex items-center text-sm font-light text-gray-400">
                            <span className="truncate">{menu.detail}</span>
                          </p>
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
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 group block">
                <div className="flex items-center">
                  <span
                    onClick={() => logOoutUser()}
                    className="p-2 gap-2 rounded-md text-gray-400 text-sm flex justify-center items-center">
                    <LogoutIcon className="h-6 w-6 text-gray-400" />
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
