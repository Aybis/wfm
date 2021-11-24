import React from 'react';

export default function CardMessages({ type = 'ceo', onClick, data }) {
  return (
    <>
      {type === 'ceo' && (
        <div className="bg-white rounded-lg p-4 w-xs md:w-md lg:w-lg">
          <div className="flex flex-col gap-10 justify-between h-auto xl:max-h-72">
            <div className="bg-gradient-to-br from-lightBlue-400 to-indigo-500 p-4 rounded-lg flex items-center gap-4">
              <img
                loading="lazy"
                src={`${process.env.PUBLIC_URL}/assets/images/hc.png`}
                // src={`https://ui-avatars.com/api/?name=${
                //   name ? name : 'Henry Christiadi'
                // }&background=${type === 'ceo' ? '0062FF' : '000'}&color=fff`}
                alt=""
                className={`h-16 w-16 rounded-full p-1 object-top object-cover bg-white`}
              />

              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-white text-xl capitalize">
                  Henry Christiadi
                </h1>
                <p className="text-sm text-gray-100">CEO of PINS</p>
              </div>
            </div>

            <div className="text-gray-600 text-left text-lg">
              <p>
                {data.title}
                <button
                  className="text-blue-400 cursor-pointer pl-1"
                  onClick={(e) =>
                    onClick(e, data.tanggal, data.id, data.message)
                  }>
                  read more.
                </button>
              </p>
            </div>

            <div className="-mt-4 text-sm text-apps-gray text-left">
              <p>{data.tanggal ?? 'Monday, 17 Juli 2021'}</p>
            </div>
          </div>
        </div>
      )}

      {type === 'seleb' && (
        <figure className=" rounded-xl flex-none w-xs md:w-md lg:w-lg">
          <blockquote className=" rounded-t-xl bg-apps-card px-4 py-6 md:p-10 text-lg md:text-xl leading-8 md:leading-8 font-semibold text-gray-900">
            <svg className="h-12 w-12 mb-5 fill-current text-red-100">
              <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
            </svg>
            <p className="text-sm lg:text-lg">{data.keterangan}</p>
          </blockquote>

          <figcaption className=" flex items-center space-x-4 p-4 md:px-10 md:py-6 bg-gradient-to-br rounded-b-xl leading-6 font-semibold text-white from-pink-600 to-red-500">
            <div className=" flex-none w-14 h-14 bg-white rounded-full flex items-center justify-center">
              <img
                // src={`${process.env.PUBLIC_URL}/assets/images/img.jpeg`}
                src={`https://ui-avatars.com/api/?name=${
                  data.name ?? 'Anonymous'
                }&background=${type === 'ceo' ? '0062FF' : '000'}&color=fff`}
                alt=""
                className="w-12 h-12 rounded-full bg-cyan-100"
                loading="lazy"
              />
            </div>
            <div className="flex-auto">
              Anonymous
              <br />
              <span className="text-gray-200 text-sm font-light">
                {data.tanggal}
              </span>
            </div>
          </figcaption>
        </figure>
      )}
    </>
  );
}
