import Heading from 'components/atoms/Heading';
import Loading from 'components/atoms/Loading';
import CardDaily from 'components/molecules/CardDaily';
import CardDay from 'components/molecules/CardDay';
import CardDayOff from 'components/molecules/CardDayOff';
import CardOvertime from 'components/molecules/CardOvertime';
import CardPresence from 'components/molecules/CardPresence';
import CardTeam from 'components/molecules/CardTeam';
import { motion } from 'framer-motion';
import React from 'react';
import absensi from '../constants/api/absensi';

const Home = ({ user }) => {
  window.scroll(0, 0);

  const presensi = [
    {
      name: 'Senin',
      in: '07 : 14',
      out: '21 : 14',
      type: 'satelit',
    },
    {
      name: 'Selasa',
      in: '07 : 14',
      out: '21 : 14',
      type: 'wfh',
    },
    {
      name: 'Rabu',
      in: '07 : 14',
      out: '21 : 14',
      type: 'wfo',
    },
    {
      name: 'Kamis',
      in: '07 : 14',
      out: '21 : 14',
      type: 'wfo',
    },
    {
      name: 'Jumat',
      in: '07 : 14',
      out: '21 : 14',
      type: 'wfh',
    },
  ];

  const dayPresent = {
    type: 'WFH',
    in: '07 : 14',
    locIn: 'Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat',
    out: '21 : 32',
    locOut: 'Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat',
  };

  const teams = [
    {
      name: 'Abdul Muchtar Astria',
      in: null,
      thumbnail: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Ahmad Fauzi Hanif',
      in: '07 : 14',
      thumbnail: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Bayu Respati',
      in: null,
      thumbnail: 'https://i.pravatar.cc/300',
    },
    {
      name: 'Efraim Teho',
      in: false,
      thumbnail: 'https://i.pravatar.cc/300',
    },
  ];

  const overtimes = [
    {
      date: 'Wednesday, 19 May',
      title: 'Make design and flow mobile pop',
      hours: null,
      status: null,
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
      status: 'leader',
    },
  ];

  const dayOff = [
    {
      date: 13,
      title: 'Hari Raya Idul Fitri 1442 Hijriyah',
      detail: 'Libur Nasional',
      month: 'Mei',
      day: 'Kamis',
    },
    {
      date: 14,
      title: 'Hari Kenaikan Isa Al Masih',
      detail: 'Libur Nasional',
      month: 'Mei',
      day: 'Kamis',
    },
    {
      date: 26,
      title: 'Hari Raya Waisak',
      detail: 'Libur Nasional',
      month: 'Mei',
      day: 'Rabu',
    },
    {
      date: 1,
      title: 'Hari Lahir pancasila',
      detail: 'Libur Nasional',
      month: 'Juni',
      day: 'Selasa',
    },
    {
      date: 1,
      title: 'Hari Lahir pancasila',
      detail: 'Libur Nasional',
      month: 'Juni',
      day: 'Selasa',
    },
  ];

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const dailyPersonal = () => {
    absensi.all().then((res) => {
      console.log('absensi all', res);
    });

    absensi.dailyPersonal(134).then((res) => {
      console.log('daily personal', res);
    });
  };

  dailyPersonal();
  return user ? (
    <div className="relative mb-12 ">
      {/* card check in  */}
      <div className="mt-8">
        <CardPresence link="/check-in" />
      </div>

      <div className="relative mt-8">
        <Heading heading="Presensi Mingguan" />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto hidden-scroll flex gap-4 mt-4 sm:grid sm:grid-cols-3 md:grid-cols-5 transition-all duration-300 ease-in-out">
          {/* card daily */}
          {presensi.map((item) => (
            <CardDaily
              key={item.name}
              day={item.name}
              timeIn={item.in}
              timeOut={item.out}
              type={item.type}
            />
          ))}
          {/* end card daily */}
        </motion.div>
      </div>

      {/* card daily team report  */}
      <div className="relative mt-8">
        <Heading heading="Presenti Team" />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto hidden-scroll flex gap-4 mt-4 p-2">
          {/* card team */}
          {teams.map((team, index) => (
            <CardTeam
              key={index}
              name={team.name}
              timeIn={team.in}
              thumbnail={team.thumbnail}
            />
          ))}
          {/* end card team */}
        </motion.div>
      </div>

      {/* card daily progress  */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mt-8">
        <Heading heading="Presensi Hari Ini" />
        <CardDay
          type={dayPresent.type}
          locIn={dayPresent.locIn}
          locOut={dayPresent.locOut}
          timeIn={dayPresent.in}
          timeOut={dayPresent.out}
        />
      </motion.div>
      {/* end card daily progress   */}

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 lg:mt-4">
        {/* card overtime  */}
        <div className="relative mt-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 ">
            <Heading heading="Lemburan" title="View more" />
            {overtimes.map((item, index) => (
              <CardOvertime
                key={index}
                date={item.date}
                hours={item.hours}
                status={item.status}
                title={item.title}
              />
            ))}
          </motion.div>
        </div>
        {/* end card overtime */}

        {/* card holiday  */}
        <div className="relative mt-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 ">
            <Heading heading="Hari Libur" title="View more" />
            {dayOff.map((item, index) => (
              <CardDayOff
                key={index}
                date={item.date}
                day={item.day}
                detail={item.detail}
                month={item.month}
                title={item.title}
              />
            ))}
          </motion.div>
        </div>
        {/* end card holiday */}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-dark">
      <Loading />
    </div>
  );
};

export default Home;
