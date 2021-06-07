/** @format */

import Download from "components/atoms/Download";
import Select from "components/atoms/Select";
import CardOvertime from "components/molecules/CardOvertime";
import CardStartLembur from "components/molecules/CardStartLembur";
import CardTitlePage from "components/molecules/CardTitlePage";
import useForm from "helpers/hooks/useForm";
import React, { useEffect, useState } from "react";

export default function Overtime({ history }) {
  const timeStamp = new Date();
  const [popUp, setPopUp] = useState(null);

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

  useEffect(() => {
    const interval = setTimeout(() => {
      setPopUp(!popUp);
    }, 500);
    return () => clearTimeout(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-coolGray-50-50 min-h-screen h-full p-6 pb-12">
      <CardTitlePage goBack={history.goBack} title="Lemburan" />

      <CardStartLembur
        link="/overtime-in"
        type="in"
        title="Abdul Muchtar Astria"
        date="Wednesday, 19 May"
        status={true}
      />
      <CardStartLembur
        link="/overtime-out"
        type="out"
        date="Wednesday, 19 May"
        title="Make Design and FE for POP"
        time="19 : 32"
      />

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
        {overtimes.map((item, index) => (
          <CardOvertime
            key={index}
            date={item.date}
            hours={item.hours}
            status={item.status}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
}
