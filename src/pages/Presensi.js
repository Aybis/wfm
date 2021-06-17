import Download from "components/atoms/Download";
import Loading from "components/atoms/Loading";
import Select from "components/atoms/Select";
import CardDay from "components/molecules/CardDay";
import CardReportKehadiran from "components/molecules/CardReportKehadiran";
import CardReportWork from "components/molecules/CardReportWork";
import CardTitlePage from "components/molecules/CardTitlePage";
import useForm from "helpers/hooks/useForm";
import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
// import CardMapCheck from "components/molecules/CardMapCheck";
const CardMapCheck = lazy(
  () => import("components/molecules/CardMapCheck"),
  500,
);

export default function Presensi({ history }) {
  const timeStamp = new Date();

  const [{ bulan, tahun }, setState] = useForm({
    bulan: timeStamp.getMonth() + 1,
    tahun: timeStamp.getFullYear(),
  });

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

  const reportMe = [
    {
      status: "hadir",
      hari: 13,
    },
    {
      status: "telat",
      hari: 13,
    },
    {
      status: "izin",
      hari: 13,
    },
    {
      status: "sakit",
      hari: 13,
    },
    {
      status: "sppd",
      hari: 13,
    },
    {
      status: "cuti",
      hari: 13,
    },
  ];

  const workMe = [
    {
      status: "WFH",
      hari: 15,
    },
    {
      status: "WFO",
      hari: 4,
    },
    {
      status: "Satelit",
      hari: 1,
    },
  ];

  const reports = [
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
    {
      type: "WFH",
      in: "07 : 14",
      locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      out: "21 : 32",
      locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
      date: "Wednesday, 19 May",
    },
  ];

  return (
    <div className="relative bg-gray-50 min-h-screen h-full p-6">
      <CardTitlePage goBack={history.goBack} title="presensi" />
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        }>
        <CardMapCheck status={true} current="WFH" />
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
        <h2 className="font-semibold text-apps-text ">Resume Presence</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto hidden-scroll flex gap-4 mt-4 sm:grid sm:grid-cols-3 md:grid-cols-6 transition-all duration-300 ease-in-out">
          {/* card daily */}
          {reportMe.map((item, index) => (
            <CardReportKehadiran
              key={index}
              hari={item.hari}
              name={item.status}
            />
          ))}
          {/* end card daily */}
        </motion.div>
      </div>

      <div className="flex flex-col mt-8">
        <h2 className="font-semibold text-apps-text ">Resume Work</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="gap-4 mt-4 grid grid-cols-3 justify-items-center transition-all duration-300 ease-in-out">
          {/* card daily */}
          {workMe.map((item, index) => (
            <CardReportWork key={index} day={item.hari} name={item.status} />
          ))}
          {/* end card daily */}
        </motion.div>
      </div>

      <div className="relative mt-8">
        <div className="flex gap-1 justify-between items-center">
          <h2 className="font-semibold text-apps-text ">List Presence</h2>
          <Download onClick={() => alert("Download excel")} />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-1 overflow-auto hidden-scroll h-full mt-4">
          {reports.map((report, index) => (
            <CardDay
              key={index}
              border
              date={report.date}
              locIn={report.locIn}
              locOut={report.locOut}
              timeIn={report.in}
              timeOut={report.out}
              type={report.type}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
