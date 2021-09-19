import CardOvertimeApproval from 'components/devices/desktop/molecules/CardOvertimeApproval';
import CardFilterMonthAndYear from 'components/devices/mobile/component/molecules/CardFilterMonthAndYear';
import { motion } from 'framer-motion';
import React from 'react';

export default function Lemburan() {
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

  const handlerOnChange = (type, value) => {
    console.log(value);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <>
      {/* Start Filter Month And Year  */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} />
      {/* End Filter Month And Year  */}
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
    </>
  );
}
