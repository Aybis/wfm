import React from 'react';

export default function DetailCeoMessage(props) {
  return (
    <div className="flex flex-col gap-8 bg-white rounded-lg w-full h-1/2 overflow-auto  p-4">
      <div className="w-full bg-gradient-to-br from-lightBlue-400 to-indigo-500 p-4 rounded-lg flex items-center gap-4">
        <img
          loading="lazy"
          src={`${process.env.PUBLIC_URL}/assets/images/hc.png`}
          alt="imageDirut"
          className={`h-20 w-20 rounded-full p-1 object-top object-cover bg-white`}
        />

        <div className="flex flex-col">
          <h1 className="font-semibold text-white text-xl capitalize">
            Henry Christiadi
          </h1>
          <p className="text-gray-100">CEO of PINS</p>
          <p className="text-xs font-light text-gray-50 mt-3">
            {props.data.date}
          </p>
        </div>
      </div>
      <div
        className="flex text-gray-600 text-left text-sm"
        dangerouslySetInnerHTML={{ __html: props.data.message }}
      />
    </div>
  );
}
