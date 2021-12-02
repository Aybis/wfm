import Select from 'components/devices/universal/atoms/Select';
import { motion } from 'framer-motion';
import useForm from 'helpers/hooks/useForm';
import React from 'react';

export default function CardFilterMonthAndYear({
  handlerOnChange,
  border = false,
}) {
  const timeStamp = new Date();
  const [{ bulan, tahun }, setState] = useForm({
    bulan: new Date().getMonth() + 1,
    tahun: new Date().getFullYear(),
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

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 mt-8 lg:mt-14 gap-2 mx-6 lg:container lg:mx-auto lg:w-1/3 justify-center items-center">
      <Select
        fallbackText={monthNames[bulan]}
        name="bulan"
        value={bulan}
        onClick={setState}
        border={border}
        handlerChange={handlerOnChange}>
        {monthNames.map((item, index) => (
          <option key={index} value={index + 1}>
            {item}
          </option>
        ))}
        <option value="all">All</option>
      </Select>
      <Select
        fallbackText={`${tahun}`}
        name="tahun"
        value={tahun}
        onClick={setState}
        border={border}
        handlerChange={handlerOnChange}>
        <option value={timeStamp.getFullYear() - 1}>
          {timeStamp.getFullYear() - 1}
        </option>
        <option value={timeStamp.getFullYear()}>
          {timeStamp.getFullYear()}
        </option>
      </Select>
    </motion.div>
  );
}
