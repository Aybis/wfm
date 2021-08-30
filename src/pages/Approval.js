import Select from 'components/atoms/Select';
import CardOvertimeApproval from 'devices/desktop/molecules/CardOvertimeApproval';
import Menu from 'devices/desktop/section/Menu';
import MobileMenu from 'devices/mobile/sections/MobileMenu';
import { motion } from 'framer-motion';
import useForm from 'helpers/hooks/useForm';
import React from 'react';
import { isDesktop } from 'react-device-detect';

const Approval = () => {
  window.scroll(0, 0);

  const timeStamp = new Date();

  const [{ bulan, tahun }, setState] = useForm({
    bulan: timeStamp.getMonth() + 1,
    tahun: timeStamp.getFullYear(),
  });

  const documents = [
    {
      date: 'Wednesday, 19 May',
      name: 'Abdul Muchtar Astria',
      title: 'Make design and flow mobile pop',
      hours: '4:72',
    },
    {
      date: 'Tuesday, 18 May',
      name: 'Ahmad Fauzi Hanif',
      title:
        'Make design and flow mobile pop and create backend presensi online',
      hours: '7 : 00',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
    {
      date: 'Monday, 17 May',
      name: 'Bayu Respati',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
    },
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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

  return (
    <div className="relative w-full h-screen bg-coolGray-100">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-24'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        <MobileMenu />
        <div className="relative">
          <h2 className="text-gray-700 font-semibold text-2xl lg:text-4xl mt-8 lg:mt-0">
            List Dokumen Approval
          </h2>
        </div>

        <motion.div className="grid grid-cols-2 mt-8 lg:mt-14 gap-2 lg:container lg:mx-auto lg:w-1/3 justify-center items-center">
          <Select
            fallbackText={monthNames[bulan]}
            name="bulan"
            value={bulan}
            onClick={setState}>
            {monthNames.map((item, index) => (
              <option key={index} value={index + 1}>
                {item}
              </option>
            ))}
          </Select>
          <Select
            fallbackText={`${tahun}`}
            name="tahun"
            value={tahun}
            onClick={setState}>
            <option value={timeStamp.getFullYear()}>
              {timeStamp.getFullYear()}
            </option>
            <option value="all">All</option>
          </Select>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 my-10 lg:grid-cols-4 gap-4 lg:gap-6 ">
          {documents.map((item, index) => (
            <CardOvertimeApproval
              key={index}
              date={item.date}
              hours={item.hours}
              name={item.name}
              title={item.title}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Approval;
