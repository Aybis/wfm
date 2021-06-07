/** @format */

import Back from "components/atoms/Back";
import CardApprover from "components/molecules/CardApprover";
import CardMapsInOut from "components/molecules/CardMapsInOut";
import CardTime from "components/molecules/CardTime";
import { useEffect, useState } from "react";

const DetailApproval = ({ history }) => {
  const [popUp, setpopUp] = useState(false);
  const markOne = [
    {
      address:
        "Perumahan Bintang Alam Blok G4 no 10, Telukjambe, East Telukjambe, Karawang Regency, West Java 41361, Indonesia",
      longLat: {
        lat: -6.336465,
        lng: 107.323785,
      },
    },
    {
      address:
        "Perumahan Bintang Alam Blok Mana Gatau Pokoknya no 10, Telukjambe, East Telukjambe, Karawang Regency, West Java 41361, Indonesia",
      longLat: {
        lat: -6.335384,
        lng: 107.3233028,
      },
    },
  ];
  const heightScreen = window.innerHeight;

  const onSubmit = () => {
    alert("Approve");
  };
  const onReject = () => {
    alert("Reject");
  };
  const dataApproval = [
    {
      name: "Abdul Muchtar Astria",
      date: "15, Desember 2021",
      time: "02:12 PM",
      image: null,
      status: true,
    },
    {
      name: "Junaidi Abdillah",
      date: "15, Desember 2021",
      time: "02:12 PM",
      image: null,
      status: true,
    },
    {
      name: "Regina Lenggogeni",
      date: "15, Desember 2021",
      time: "02:12 PM",
      image: null,
      status: false,
    },
  ];

  const reportTime = [
    {
      title: "in",
      time: "19 : 03",
    },
    {
      title: "out",
      time: "24 : 53",
    },
    {
      title: "ovt",
      time: "05 : 50",
    },
  ];
  useEffect(() => {
    window.scroll(0, 10);
    const timeOut = setTimeout(() => {
      setpopUp(true);
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <div className="relative bg-gray-100 min-h-screen h-full ">
      <div className="flex bg-gray-100 h-full">
        <Back
          link={history.goBack}
          inputClassName="z-10 shadow absolute top-6 left-6"
        />
        <CardMapsInOut mark={markOne} />
      </div>
      <div
        className="bg-gray-50 -mt-5 rounded-t-3xl px-6 pt-6 flex flex-col gap-8 overflow-scroll z-20 bottom-0 absolute transition-all duration-300 ease-in-out"
        style={{ maxHeight: popUp ? heightScreen * 0.58 : heightScreen * 0 }}>
        {/* header  */}
        <div className="flex justify-between items-center gap-2">
          <div>
            <h4 className="font-semibold text-apps-text">
              Abdul Muchtar Astria
            </h4>
            <h6 className="text-sm text-apps-text text-opacity-40">
              Operation & Support
            </h6>
          </div>
          <div className="flex flex-col text-xs ">
            <h5 className="font-medium text-apps-text text-right text-opacity-40">
              WFO
            </h5>
            <h5 className=" font-light text-apps-text text-opacity-40">
              Wednesday
            </h5>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-apps-text">Report Time</h2>
          <div className="grid grid-cols-3 gap-6">
            {reportTime.map((item, index) => (
              <CardTime key={index} time={item.time} title={item.title} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-apps-text">
            Create Design and FE POP
          </h2>
          <p className="text-sm  text-apps-text text-opacity-30">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            perspiciatis nam labore officia, nulla vel sequi! Dolor nisi ad
            quaerat quae. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Harum perspiciatis nam labore officia, nulla vel sequi! Dolor
            nisi ad quaerat quae.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-apps-text">Approval</h2>
          <div className="grid grid-cols-1 gap-2">
            {dataApproval.map((item, index) => (
              <CardApprover
                key={index}
                date={item.date}
                image={item.image}
                name={item.name}
                status={item.status}
                time={item.time}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
          <button
            className="uppercase bg-apps-red p-2 rounded-md text-white font-semibold h-12"
            onClick={onReject}>
            Reject
          </button>
          <button
            className="uppercase bg-apps-primary p-2 rounded-md text-white font-semibold h-12"
            onClick={onSubmit}>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailApproval;
