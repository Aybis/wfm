import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import {
  CashIcon,
  ClockIcon,
  FingerPrintIcon,
  KeyIcon,
  LightningBoltIcon,
  MapIcon,
  PhoneMissedCallIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import HeadingMobile from './HeadingMobile';
import { ChartBarIcon } from '@heroicons/react/outline';

export default function ModalModules({ open, handlerClose, children }) {
  let completeButtonRef = useRef(null);
  const history = useHistory();

  const modules = [
    {
      name: 'Presensi',
      link: '/presensi',
      icon: FingerPrintIcon,
      isActive: true,
      backgroundColor: 'bg-apps-primary bg-opacity-10',
      textColor: 'text-apps-primary ',
    },
    {
      name: 'Lemburan',
      link: '/overtime',
      icon: ClockIcon,
      isActive: true,
      backgroundColor: 'bg-apps-pink bg-opacity-10',
      textColor: 'text-apps-pink',
    },
    {
      name: 'Inforekan',
      link: '/inforekan',
      icon: UserGroupIcon,
      isActive: true,
      backgroundColor: 'bg-apps-green bg-opacity-10',
      textColor: 'text-apps-green',
    },
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: ChartBarIcon,
      isActive: true,
      backgroundColor: 'bg-lightBlue-100',
      textColor: 'text-lightBlue-600',
    },
    {
      name: 'Hari Libur',
      link: '/presence',
      icon: LightningBoltIcon,
      isActive: false,
      backgroundColor: 'bg-apps-yellow bg-opacity-10',
      textColor: 'text-apps-yellow',
    },
    {
      name: 'Reimburse',
      link: '/presence',
      icon: CashIcon,
      isActive: false,
      backgroundColor: 'bg-apps-purple bg-opacity-10',
      textColor: 'text-apps-purple',
    },
    {
      name: 'Cuti',
      link: '/presence',
      icon: PhoneMissedCallIcon,
      isActive: false,
      backgroundColor: 'bg-apps-orange bg-opacity-10',
      textColor: 'text-apps-orange ',
    },
    {
      name: 'SPPD',
      link: '/presence',
      icon: MapIcon,
      isActive: false,
      backgroundColor: 'bg-apps-text bg-opacity-10',
      textColor: 'text-apps-text ',
    },
    {
      name: 'Driver',
      link: '/presence',
      icon: KeyIcon,
      isActive: false,
      backgroundColor: 'bg-apps-red bg-opacity-10',
      textColor: 'text-apps-red ',
    },
  ];

  const handlerClickGoToPage = (event, item) => {
    if (item.isActive) {
      history.push(item.link);
    } else {
      swal({
        text: "Masih On Progress Yah :') 🙏",
        buttons: 'Close',
        icon: 'info',
      });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={completeButtonRef}
        className="fixed z-30 inset-0 overflow-y-auto"
        onClose={handlerClose}>
        <div className="flex items-end justify-center min-h-screen text-center m-0 inset-x-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-t-xl border-t-2 border-gray-200 p-4 text-left shadow-xl transform transition-all h-auto min-h-full w-full">
              <div className="p-2">
                <HeadingMobile heading="List Modules" />
                <div className="grid grid-cols-3 gap-4 mt-4 -mx-6 pb-10">
                  {modules.map((module) => (
                    <motion.div
                      onClick={(e) => handlerClickGoToPage(e, module)}
                      key={Math.random()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.85 }}>
                      <div
                        className="flex flex-col gap-2 justify-center items-center p-2"
                        aria-disabled={!module.isActive}>
                        <span
                          className={`h-12 w-12 rounded-md flex items-center justify-center ${
                            !module.isActive
                              ? 'bg-coolGray-200'
                              : module.backgroundColor
                          } p-2`}>
                          <module.icon
                            className={`h-8 w-8 ${module.textColor} ${
                              !module.isActive && 'text-opacity-50'
                            }`}
                          />
                        </span>
                        <span className="text-warmGray-700 text-sm font-normal">
                          {module.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  ref={completeButtonRef}
                  onClick={handlerClose}
                  className="bg-warmGray-100 opacity-0 -mt-4 h-0 w-0 hidden"></button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
