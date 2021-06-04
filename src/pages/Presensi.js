/** @format */

import Download from "components/atoms/Download";
import Select from "components/atoms/Select";
import CardDay from "components/molecules/CardDay";
import CardTitlePage from "components/molecules/CardTitlePage";
import useForm from "helpers/hooks/useForm";
import React, { useEffect, useState } from "react";

export default function Presensi({ history }) {
  const timeStamp = new Date();
  const [didMount, setDidMount] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setDidMount(!didMount);
    }, 500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-gray-50 min-h-screen h-full p-6">
      <CardTitlePage goBack={history.goBack} title="presensi" />

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

      <div className="flex gap-1 justify-end mt-4">
        <Download onClick={() => alert("Download excel")} />
      </div>

      <div className="grid grid-cols-1 gap-1 overflow-auto hidden-scroll h-full">
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
      </div>
    </div>
  );
}
