import { ClockIcon } from '@heroicons/react/outline';
import {
  GlobeAltIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/solid';
import React from 'react';
import { isDesktop } from 'react-device-detect';
import { MoreVertical } from 'react-feather';
import { Link } from 'react-router-dom';

const CardDaily = ({ kehadiran, hari, url = '/' }) => {
  let nameOfKehadiran;

  if (kehadiran === 'WFH') {
    nameOfKehadiran = 'At Home';
  } else if (kehadiran === 'WFO') {
    nameOfKehadiran = 'At Office';
  } else if (kehadiran === 'Satelit') {
    nameOfKehadiran = 'At Satelit';
  } else {
    nameOfKehadiran = 'Day Off';
  }

  const ShowIconDaily = () => {
    if (kehadiran === 'WFH') {
      nameOfKehadiran = 'At Home';
      return (
        <HomeIcon className="h-10 w-10 p-2 text-apps-primary bg-apps-primary bg-opacity-20 rounded-full" />
      );
    } else if (kehadiran === 'WFO') {
      return (
        <OfficeBuildingIcon className="h-10 w-10 p-2 text-apps-green bg-apps-green bg-opacity-20 rounded-full" />
      );
    } else if (kehadiran === 'Satelit') {
      nameOfKehadiran = 'At Satelit';

      return (
        <GlobeAltIcon className="h-10 w-10 p-2 text-apps-orange bg-apps-orange bg-opacity-20 rounded-full" />
      );
    } else {
      return (
        <ClockIcon className="h-10 w-10 p-2 text-apps-primary bg-apps-primary bg-opacity-20 rounded-full" />
      );
    }
  };

  return (
    <Link
      to={url}
      className={`flex items-start gap-8 flex-col justify-between flex-none bg-white rounded-lg p-4 ${
        isDesktop ? 'w-full' : 'w-52'
      }`}>
      <div className="flex justify-between  w-full">
        <ShowIconDaily />
        <MoreVertical className="h-5 w-5 text-apps-gray -mr-2" />
      </div>
      <div className="flex flex-col items-start justify-center ">
        <h2 className="font-semibold text-gray-700 tracking-wide">
          {nameOfKehadiran}
        </h2>
        <h2 className="font-medium text-gray-400 text-sm">{hari}</h2>
      </div>
    </Link>
  );
};

export default CardDaily;
