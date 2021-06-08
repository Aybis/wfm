/** @format */
import Heading from "components/atoms/Heading";
import Loading from "components/atoms/Loading";
import CardDaily from "components/molecules/CardDaily";
import CardDay from "components/molecules/CardDay";
import CardOvertime from "components/molecules/CardOvertime";
import CardPresence from "components/molecules/CardPresence";
import CardTeam from "components/molecules/CardTeam";
import React from "react";
import MobileHeader from "section/MobileHeader";
import MobileMenu from "section/MobileMenu";

const Home = ({ user }) => {
  const presensi = [
    {
      name: "Senin",
      in: "07 : 14",
      out: "21 : 14",
      type: "satelit",
    },
    {
      name: "Selasa",
      in: "07 : 14",
      out: "21 : 14",
      type: "wfh",
    },
    {
      name: "Rabu",
      in: "07 : 14",
      out: "21 : 14",
      type: "wfo",
    },
    {
      name: "Kamis",
      in: "07 : 14",
      out: "21 : 14",
      type: "wfo",
    },
    {
      name: "Jumat",
      in: "07 : 14",
      out: "21 : 14",
      type: "wfh",
    },
  ];

  const dayPresent = {
    type: "WFH",
    in: "07 : 14",
    locIn: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
    out: "21 : 32",
    locOut: "Jalan Delima 3, H4/23, Kabupaten Karawang, Jawa Barat",
  };

  const teams = [
    {
      name: "Abdul Muchtar Astria",
      in: null,
      thumbnail: "https://i.pravatar.cc/300",
    },
    {
      name: "Ahmad Fauzi Hanif",
      in: "07 : 14",
      thumbnail: "https://i.pravatar.cc/300",
    },
    {
      name: "Bayu Respati",
      in: null,
      thumbnail: "https://i.pravatar.cc/300",
    },
    {
      name: "Efraim Teho",
      in: false,
      thumbnail: "https://i.pravatar.cc/300",
    },
  ];

  const overtimes = [
    {
      date: "Wednesday, 19 May",
      title: "Make design and flow mobile pop",
      hours: null,
      status: null,
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
  ];
  return user ? (
    <div className="relative bg-coolGray-50  min-h-screen h-full">
      <div className="relative h-full min-h-screen p-6 lg:hidden pb-32">
        <MobileHeader user={user} />
        <MobileMenu />

        {/* card check in  */}
        <CardPresence link="/check-in" />
        <CardPresence link="/check-out" status="out" />

        <div className="relative mt-8">
          <Heading heading="Weekly Report" />
          <div className="overflow-x-auto hidden-scroll flex gap-4 mt-4 -ml-6 -mr-3 pl-6 pr-6">
            {/* card daily */}
            {presensi.map((item) => (
              <CardDaily
                key={item.name}
                day={item.name}
                timeIn={item.in}
                timeOut={item.out}
                type={item.type}
              />
            ))}
            {/* end card daily */}
          </div>
        </div>

        {/* card daily team report  */}
        <div className="relative mt-8">
          <Heading heading="Team Report" />
          <div className="overflow-x-auto hidden-scroll flex gap-4 mt-4 pb-2">
            {/* card team */}
            {teams.map((team, index) => (
              <CardTeam
                key={index}
                name={team.name}
                timeIn={team.in}
                thumbnail={team.thumbnail}
              />
            ))}
            {/* end card team */}
          </div>
        </div>

        {/* card daily progress  */}
        <div className="relative mt-8">
          <Heading heading="Daily Progress" />
          <CardDay
            type={dayPresent.type}
            locIn={dayPresent.locIn}
            locOut={dayPresent.locOut}
            timeIn={dayPresent.in}
            timeOut={dayPresent.out}
          />
        </div>
        {/* end card daily progress   */}

        {/* card overtime  */}
        <div className="relative mt-8">
          <Heading heading="Overtime" title="View more" />
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
        {/* end card overtime */}

        {/* card holiday  */}
        <div className="relative mt-8">
          <Heading heading="Day Off" title="View more" />
         
          {overtimes.map((item, index) => (
            <div key={index} className="flex w-full  items-center bg-white px-4 py-2 mt-4 rounded-md divide-x-2 divide-coolGray-200 divide-dashed">
            <div className="flex flex-col items-center px-2 pr-4">
              <h4 className="text-apps-red font-semibold text-opacity-60">15</h4>
              <h4 className="text-apps-red font-regular text-sm text-opacity-40">Mei</h4>
            </div>
            <div className="flex flex-col items-start px-4"> 
                <h2 className="text-apps-text font-medium text-sm">Hari Raya Idul Fitri 1442 Hijriyah</h2>
                <h5 className="text-apps-text text-opacity-40 text-xs">Libur Nasional - Jumat</h5>
            </div>
        </div>
          ))}
        </div>
        {/* end card holiday */}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-dark">
      <Loading />
    </div>
  );
};

export default Home;
