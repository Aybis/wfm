import Select from "components/atoms/Select";
import CardOvertimeApproval from "components/molecules/CardOvertimeApproval";
import { motion } from "framer-motion";
import useForm from "helpers/hooks/useForm";
import React from "react";
import MobileMenu from "section/MobileMenu";

const Approval = () => {
  const timeStamp = new Date();

  const [{ bulan, tahun }, setState] = useForm({
    bulan: timeStamp.getMonth() + 1,
    tahun: timeStamp.getFullYear(),
  });

  const documents = [
    {
      date: "Wednesday, 19 May",
      name: "Abdul Muchtar Astria",
      title: "Make design and flow mobile pop",
      hours: "4:72",
    },
    {
      date: "Tuesday, 18 May",
      name: "Ahmad Fauzi Hanif",
      title:
        "Make design and flow mobile pop and create backend presensi online",
      hours: "7 : 00",
    },
    {
      date: "Monday, 17 May",
      name: "Bayu Respati",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
    },
    {
      date: "Monday, 17 May",
      name: "Bayu Respati",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
    },
    {
      date: "Monday, 17 May",
      name: "Bayu Respati",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
    },
    {
      date: "Monday, 17 May",
      name: "Bayu Respati",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
    <div className="relative bg-coolGray-50 min-h-screen h-full p-6 pb-12">
      <MobileMenu />
      <div className="relative mt-4 p-4">
        <h2 className="text-apps-text font-semibold text-xl">
          List of Documents
        </h2>
      </div>

      <motion.div className="grid grid-cols-2 mt-8 gap-2 justify-center items-center">
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
        className="grid grid-cols-1 gap-4 content-center mt-10 mb-20">
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
  );
};

export default Approval;
