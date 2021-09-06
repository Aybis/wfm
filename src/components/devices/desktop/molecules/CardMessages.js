import React from 'react';

export default function CardMessages({ name, type }) {
  return (
    <div className="bg-white rounded-lg p-4 w-xs md:w-md lg:w-lg">
      <div className="flex flex-col gap-10 justify-between h-auto xl:max-h-72">
        <div className="bg-gradient-to-br from-lightBlue-400 to-indigo-500 p-4 rounded-lg flex items-center gap-4">
          <img
            loading="lazy"
            src={`https://ui-avatars.com/api/?name=${
              name ? name : 'Henry Christiadi'
            }&background=${type === 'ceo' ? '0062FF' : '000'}&color=fff`}
            alt=""
            className={`h-16 w-16 rounded-full p-1`}
          />

          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-white tracking-wide text-xl">
              Henry Christiadi
            </h1>
            <p className="font-medium text-gray-100">CEO of PINS</p>
          </div>
        </div>

        <div className="text-gray-600 text-left tracking-wide text-lg">
          <p>
            "Assalamu'alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera,
            Semangat Pagiiiii 💪💪 Salam Sehat dan Bahagia Selalu. PINS.. ON
            FIRE!!"{' '}
            <small className="text-blue-400 cursor-pointer">read more.</small>
          </p>
        </div>

        <div className="-mt-4 text-sm text-apps-gray text-left">
          <p>Monday, 17 Juli 2021</p>
        </div>
      </div>
    </div>
  );
}
