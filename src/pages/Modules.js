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
} from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import MobileMenu from "section/MobileMenu";
import { motion } from "framer-motion";

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
    <div className="relative bg-gray-50 min-h-screen h-full p-6 pb-20">
      <MobileMenu />

      <div className="relative mt-4 p-4">
        <h2 className="text-apps-text font-semibold text-xl">
          List of Modules
        </h2>
      </div>
      <motion.div
        className="grid grid-cols-2 gap-4 content-center mt-10 pb-20"
        variants={container}
        initial="hidden"
        animate="visible">
        <motion.div variants={item}>
          <Link
            to="/presensi"
            className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
            <FingerPrintIcon className="p-2 h-16 w-16 text-apps-primary rounded-lg bg-apps-primary bg-opacity-10 " />
            <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
              Presensi
            </h4>
          </Link>
        </motion.div>
        <motion.div variants={item}>
          <Link
            to="/overtime"
            className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
            <ClockIcon className="p-2 h-16 w-16 text-apps-pink rounded-lg bg-apps-pink bg-opacity-10 " />
            <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
              Lemburan
            </h4>
          </Link>
        </motion.div>
        <motion.div variants={item}>
          <Link
            to="/inforekan"
            className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
            <UserGroupIcon className="p-2 h-16 w-16 text-apps-green rounded-lg bg-apps-green bg-opacity-10 " />
            <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
              Inforekan
            </h4>
          </Link>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <LightningBoltIcon className="p-2 h-16 w-16 text-apps-yellow rounded-lg bg-apps-yellow bg-opacity-10 " />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
            Hari Libur
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <CashIcon className="p-2 h-16 w-16 text-apps-purple rounded-lg bg-apps-purple bg-opacity-10 " />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
            Reimburse
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <PhoneMissedCallIcon className="p-2 h-16 w-16 text-apps-orange rounded-lg bg-apps-orange bg-opacity-10" />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
            Cuti
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <MapIcon className="p-2 h-16 w-16 text-apps-text rounded-lg bg-apps-text bg-opacity-10 " />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
            SPPD
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <KeyIcon className="p-2 h-16 w-16 text-apps-red rounded-lg bg-apps-red bg-opacity-10 " />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
            Driver
          </h4>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col bg-white items-center p-4 justify-center rounded-lg">
          <IdentificationIcon className="p-2 h-16 w-16 text-apps-red rounded-lg bg-apps-red bg-opacity-10 " />
          <h4 className="font-semibold text-apps-text text-sm text-left mt-2">
            Me
          </h4>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Modules;
