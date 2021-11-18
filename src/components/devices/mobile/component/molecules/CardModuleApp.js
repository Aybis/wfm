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
import React from 'react';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import CardHeadingMobile from './CardHeadingMobile';

export default function CardModuleApp() {
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
    <div className="relative mt-4">
      <CardHeadingMobile heading="" />

      <div className="grid grid-cols-4 gap-4 mt-4">
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
                className={`h-10 w-10 rounded-md flex items-center justify-center ${
                  !module.isActive ? 'bg-coolGray-200' : module.backgroundColor
                } p-2`}>
                <module.icon
                  className={`h-7 w-7 ${module.textColor} ${
                    !module.isActive && 'text-opacity-50'
                  }`}
                />
              </span>
              <span className="text-warmGray-700 text-xs font-medium">
                {module.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
