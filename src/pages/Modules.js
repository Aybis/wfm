import {
  CashIcon,
  ClockIcon,
  FingerPrintIcon,
  IdentificationIcon,
  KeyIcon,
  LightningBoltIcon,
  MapIcon,
  PhoneMissedCallIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MobileMenu from 'section/MobileMenu';

const Modules = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.09,
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="relative">
      <MobileMenu />

      <div className="relative lg:mt-12">
        <h1 className="text-gray-700 lg:text-4xl text-2xl font-semibold">
          List of Modules
        </h1>
      </div>
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-3 gap-6 content-center mt-8 pb-12 px-6"
        variants={container}
        initial="hidden"
        animate="visible">
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <Link
            to="/presensi"
            className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
            <FingerPrintIcon className="p-2 h-16 w-16 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 lg:h-24 lg:w-24" />
            <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
              Presensi
            </h4>
          </Link>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <Link
            to="/overtime"
            className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
            <ClockIcon className="p-2 h-16 w-16 text-apps-pink rounded-lg bg-apps-pink bg-opacity-10 lg:h-24 lg:w-24" />
            <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
              Lemburan
            </h4>
          </Link>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <Link
            to="/inforekan"
            className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
            <UserGroupIcon className="p-2 h-16 w-16 text-apps-green rounded-lg bg-apps-green bg-opacity-10 lg:h-24 lg:w-24" />
            <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
              Inforekan
            </h4>
          </Link>
        </motion.div>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <LightningBoltIcon className="p-2 h-16 w-16 text-apps-yellow rounded-lg bg-apps-yellow bg-opacity-10 lg:h-24 lg:w-24" />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
            Hari Libur
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <CashIcon className="p-2 h-16 w-16 text-apps-purple rounded-lg bg-apps-purple bg-opacity-10  lg:h-24 lg:w-24" />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
            Reimburse
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <PhoneMissedCallIcon className="p-2 h-16 w-16 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10 lg:h-24 lg:w-24" />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
            Cuti
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <MapIcon className="p-2 h-16 w-16 text-apps-text rounded-lg bg-apps-text bg-opacity-10 lg:h-24 lg:w-24 " />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
            SPPD
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <KeyIcon className="p-2 h-16 w-16 text-apps-red rounded-lg bg-apps-red bg-opacity-10 lg:h-24 lg:w-24 " />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
            Driver
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <IdentificationIcon className="p-2 h-16 w-16 text-apps-red rounded-lg bg-apps-red bg-opacity-10 lg:h-24 lg:w-24" />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2 lg:text-lg">
            Me
          </h4>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Modules;
