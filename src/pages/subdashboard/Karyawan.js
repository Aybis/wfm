import CardGridDekstop from 'components/devices/desktop/molecules/CardGridDekstop';
import absensi from 'constants/api/absensi';
import React, { useEffect } from 'react';

export default function Karyawan() {
  // const [PAGE, setPAGE] = useState(1);
  const PAGE = 1;
  const getDataUserByUnit = () => {
    absensi
      .reportUserByUnit({
        params: {
          unit_id: 9,
          size: 3,
          page: PAGE,
          month: 6,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getDataUserByUnit();
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mt-8">
      <h2 className="text-gray-700 font-semibold text-xl lg:text-2xl">
        List Karyawan By Unit
      </h2>
      {/* Section Filter Grouping  */}
      <CardGridDekstop moreClass="my-8 grid-cols-2 lg:grid-cols-4 justify-center items-center container mx-auto p-2 divide-x-2 divide-coolGray-100 lg:bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-1 px-6 py-2">
          <label htmlFor="Status" className="text-gray-400 font-medium">
            Unit
          </label>
          <select className="p-2 border-none text-gray-800 font-semibold tracking-wide">
            <option value="atasan">Atasan</option>
            <option value="all">All</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 px-6 py-2">
          <label htmlFor="Status" className="text-gray-400 font-medium">
            Month
          </label>
          <select className="p-2 border-none text-gray-800 font-semibold tracking-wide">
            <option value="atasan">Atasan</option>
            <option value="all">All</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 px-6 py-2">
          <label htmlFor="Status" className="text-gray-400 font-medium">
            Year
          </label>
          <select className="p-2 border-none text-gray-800 font-semibold tracking-wide">
            <option value="atasan">Atasan</option>
            <option value="all">All</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 px-6 py-2">
          <button
            onClick={() => alert('nanti ya fungsinya belum dibuat :) ')}
            type="submit"
            className="w-full bg-apps-primary border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apps-primary">
            Search
          </button>
        </div>
      </CardGridDekstop>
      {/* Section End Filter Grouping  */}
    </div>
  );
}
