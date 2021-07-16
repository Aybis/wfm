import React from 'react';
import { Link } from 'react-router-dom';

export default function CardPresence({ status, link }) {
  let btnClass = 'bg-blue-400';
  let name = '';
  if (status) {
    btnClass = 'bg-apps-red';
    name = 'Check Out';
  } else {
    btnClass = 'bg-apps-blue';
    name = 'Check In';
  }

  return (
    <>
      <div
        className={`flex flex-col gap-2 py-4 px-6 rounded-lg mt-4 items-center bg-white lg:hidden`}>
        <h4 className="font-semibold text-apps-text">
          Let's go to {!status ? 'work' : 'home'}
        </h4>
        <Link
          to={link}
          className={`p-2 w-full rounded-lg text-white font-semibold text-center  ${btnClass}`}>
          <span className=" text-lg">{name}</span>
        </Link>
        <h4 className=" text-apps-text text-sm text-center">
          Budayakan disiplin presensi dari sekarang!
        </h4>
      </div>

      <div className="bg-apps-primary rounded-md">
        <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-50">
            <span className="block text-center">Boost your productivity.</span>
            <span className="block text-gray-50 text-center mt-2">
              Start using Almuazaf today.
            </span>
          </h2>
          <h4 className="mt-5 text-gray-50 text-xl text-opacity-70 text-center">
            Budayakan disiplin presensi dari sekarang!
          </h4>
          <div className="mt-2 flex lg:mt-0 lg:flex-shrink-0">
            <button className="mt-6 inline-flex rounded-md  bg-gray-50 py-3 px-6 font-bold text-apps-primary">
              Check In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
