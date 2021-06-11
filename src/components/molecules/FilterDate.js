import Select from "components/atoms/Select";
import useForm from "helpers/hooks/useForm";
import React from "react";

export default function FilterDate() {
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

  return (
    <div className="grid grid-cols-2 mt-8 gap-2 justify-center items-center">
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
  );
}
