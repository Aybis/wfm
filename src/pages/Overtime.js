import Download from "components/atoms/Download";
import Select from "components/atoms/Select";
import CardOvertime from "components/molecules/CardOvertime";
import CardTitlePage from "components/molecules/CardTitlePage";
import useForm from "helpers/hooks/useForm";
import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import CardReportWork from "components/molecules/CardReportWork";

const CardMapCheck = lazy(
  () => import("components/molecules/CardMapCheck"),
  500,
);

export default function Overtime({ history }) {
  window.scroll(0, 0);

  const timeStamp = new Date();

  const [{ bulan, tahun }, setState] = useForm({
    bulan: timeStamp.getMonth() + 1,
    tahun: timeStamp.getFullYear(),
  });

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

  const overtimes = [
    {
      date: "Wednesday, 19 May",
      title: "Make design and flow mobile pop",
      hours: "7 : 00",
      status: "done",
    },
    {
      date: "Tuesday, 18 May",
      title:
        "Make design and flow mobile pop and create backend presensi online",
      hours: "7 : 00",
      status: "done",
    },
    {
      date: "Monday, 17 May",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
      status: "leader",
    },
    {
      date: "Monday, 17 May",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
      status: "leader",
    },
    {
      date: "Monday, 17 May",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
      status: "leader",
    },
    {
      date: "Monday, 17 May",
      title: "Make design and flow mobile pop",
      hours: "5 : 23",
      status: "leader",
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
      name: "Done",
      hari: 8,
    },
    {
      name: "Progress",
      hari: 4,
    },
    {
      name: "Lembur",
      hari: 36,
    },
  ];

  return (
    <div className="relative bg-coolGray-50 min-h-screen h-full p-6 pb-12">
      <CardTitlePage goBack={history.goBack} title="Lemburan" />

      <Suspense fallback={<p>Loading ....</p>}>
        <CardMapCheck status={true} current="WFO" link="/overtime-in" />
      </Suspense>

      <div className="grid grid-cols-2 mt-4 gap-2 justify-center items-center">
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
      </div>

      <div className="flex flex-col mt-4">
        <h2 className="font-semibold text-apps-text ">Resume Work</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto hidden-scroll flex gap-4 mt-4 sm:grid sm:grid-cols-3 md:grid-cols-6 transition-all duration-300 ease-in-out">
          {/* card daily */}
          {workMe.map((item, index) => (
            <CardReportWork key={index} day={item.hari} name={item.name} />
          ))}
          {/* end card daily */}
        </motion.div>
      </div>

      <div className="relative mt-8">
        <div className="flex gap-1 justify-between items-center">
          <h2 className="font-semibold text-apps-text ">List Overtime</h2>
          <Download onClick={() => alert("Download excel")} />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-1 overflow-auto hidden-scroll h-full">
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
    </div>
  );
}
