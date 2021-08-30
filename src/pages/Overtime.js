import Download from 'components/atoms/Download';
import Select from 'components/atoms/Select';
import CardTitlePage from 'components/molecules/CardTitlePage';
import useForm from 'helpers/hooks/useForm';
import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { isDesktop, isMobile } from 'react-device-detect';
import LemburanDekstop from 'devices/desktop/pages/LemburanDekstop';

// const CardMapCheck = lazy(
//   () => import('components/molecules/CardMapCheck'),
//   500,
// );

export default function Overtime({ history }) {
  window.scroll(0, 0);

  const timeStamp = new Date();

  const [{ bulan, tahun }, setState] = useForm({
    bulan: timeStamp.getMonth() + 1,
    tahun: timeStamp.getFullYear(),
  });

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

  const overtimes = [
    {
      date: 'Wednesday, 19 May',
      title: 'Make design and flow mobile pop',
      hours: '7 : 00',
      status: 'done',
    },
    {
      date: 'Tuesday, 18 May',
      title:
        'Make design and flow mobile pop and create backend presensi online',
      hours: '7 : 00',
      status: 'done',
    },
    {
      date: 'Monday, 17 May',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
      status: 'progress',
    },
    {
      date: 'Monday, 17 May',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
      status: 'progress',
    },
    {
      date: 'Monday, 17 May',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
      status: 'progress',
    },
    {
      date: 'Monday, 17 May',
      title: 'Make design and flow mobile pop',
      hours: '5 : 23',
      status: 'reject',
    },
  ];

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const workMe = [
    {
      name: 'Done',
      hari: 8,
    },
    {
      name: 'Progress',
      hari: 4,
    },
    {
      name: 'Reject',
      hari: 2,
    },
    {
      name: 'Lembur',
      hari: 36,
    },
  ];

  return (
    <>
      {isMobile && 'Mobile View'}
      {isDesktop && <LemburanDekstop history={history} />}
    </>
  );
}
