import { ChevronRightIcon } from "@heroicons/react/solid";
import Download from "components/atoms/Download";
import Select from "components/atoms/Select";
import SetMaps from "components/atoms/SetMaps";
import CardOvertime from "components/molecules/CardOvertime";
import CardStartLembur from "components/molecules/CardStartLembur";
import CardTitlePage from "components/molecules/CardTitlePage";
import useForm from "helpers/hooks/useForm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Overtime({ history }) {
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

  const sendAddress = (value) => {
    console.log(value);
  };

  const sendLonglat = (value) => {
    console.log(value);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <div className="relative bg-coolGray-50 min-h-screen h-full p-6 pb-12">
      <CardTitlePage goBack={history.goBack} title="Lemburan" />

      <div className="relative grid grid-cols-1 bg-white rounded-md mb-8 mt-4 shadow-md">
        <SetMaps
          height="100%"
          className="relative h-28 rounded-t-lg z-0"
          sendAddress={sendAddress}
          sendlongLat={sendLonglat}
          showButton={false}
        />
        <div className="rounded-b-md flex bg-white justify-between py-3 px-4 z-10 -mt-5">
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-medium text-apps-text text-opacity-40">
              Current
            </h4>
            <h4 className="text-xs font-semibold text-apps-text">WFO</h4>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-medium text-apps-text text-opacity-40">
              Status
            </h4>
            <span className="text-xs font-semibold text-apps-green rounded-md w-16">
              Available
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Link to="/" className="ml-7">
              <ChevronRightIcon className="h-8 w-8 text-apps-primary   bg-apps-primary bg-opacity-10 p-1 rounded" />
            </Link>
          </div>
        </div>
      </div>

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
