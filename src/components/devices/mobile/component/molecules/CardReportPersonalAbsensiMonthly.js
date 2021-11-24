import React, { useState } from 'react';
import ModalImage from './ModalImage';
import convertDate from 'helpers/hooks/convertDate';

export default function CardReportPersonalAbsensiMonthly({ data, photoIn }) {
  const [sourceImage, setsourceImage] = useState(undefined);
  const [showModal, setshowModal] = useState(false);

  const handlerClickShowModalImage = (image) => {
    setsourceImage(image);
    setshowModal(true);
  };

  return (
    <>
      <div className="relative flex flex-col gap-4 bg-white rounded-lg p-4">
        <div
          className={[
            'absolute top-3 right-4 rounded-md text-xs px-2 py-1 ',
            data.kehadiran === 'WFH' && 'bg-green-500 text-white',
            data.kehadiran === 'WFO' && 'bg-blue-500 text-white',
            data.kehadiran === null && 'bg-red-500  text-white',
          ].join(' ')}>
          {data.kehadiran === 'WFH' && 'At Home'}
          {data.kehadiran === 'WFO' && 'At Office'}
          {data.kehadiran === null && data.kondisi}
        </div>
        <div className="flex gap-3">
          <div
            className="flex w-1/6"
            onClick={() =>
              handlerClickShowModalImage(
                `${process.env.REACT_APP_API_IMAGE_ABSENSI}/${photoIn}`,
              )
            }>
            <img
              src={`${process.env.REACT_APP_API_IMAGE_ABSENSI}/${photoIn}`}
              alt={data.detail_absensi[0].photo}
              className="h-16 w-16 rounded-md object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=NotFound&background=F3F3F3&color=000`;
              }}
            />
          </div>
          <div className="flex flex-col gap-1 w-5/6">
            <p className="text-xs font-medium text-gray-600">
              {convertDate('fullDayMonthYear', data.detail_absensi[0].jam)}
            </p>
            <div className="flex items-center">
              <p className="text-sm font-semibold text-gray-800">
                {convertDate('timeAm', data.detail_absensi[0].jam)}
              </p>
              <p
                className={`text-sm font-medium ml-1 ${
                  data.kehadiran !== null && data.keterangan
                    ? 'text-red-500'
                    : 'text-apps-primary'
                }`}>
                {data.kehadiran !== null && data.keterangan
                  ? '- Tidak Disiplin '
                  : '- Disiplin'}
              </p>
            </div>
            <p className="text-xs font-light text-gray-400">
              {data.detail_absensi[0].lokasi}
            </p>
            <p className="text-xs font-medium text-red-400">
              {data.keterangan !== null && data.keterangan}
            </p>
          </div>
        </div>
        <hr className="border border-gray-100 rounded-full ml-16" />
        {data.detail_absensi[1] ? (
          <div className="flex gap-3">
            <div
              className="flex w-1/6 rounded-lg"
              onClick={() =>
                handlerClickShowModalImage(
                  `${process.env.REACT_APP_API_IMAGE_ABSENSI}/${data.detail_absensi[1].photo}`,
                )
              }>
              <img
                src={`${process.env.REACT_APP_API_IMAGE_ABSENSI}/${data.detail_absensi[1].photo}`}
                alt={data.detail_absensi[1].photo}
                className="h-16 w-16 rounded-lg object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=NotFound&background=F3F3F3&color=000`;
                }}
              />
            </div>
            <div className="flex flex-col gap-1 w-5/6">
              <p className="text-xs font-medium text-gray-600">
                {convertDate('fullDayMonthYear', data.detail_absensi[1].jam)}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {convertDate('timeAm', data.detail_absensi[1].jam)}
              </p>
              <p className="text-xs font-light text-gray-400">
                {data.detail_absensi[1].lokasi}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-sm font-semibold text-gray-800">On Duty</h1>
          </div>
        )}
      </div>
      <ModalImage
        open={showModal}
        handlerClose={() => setshowModal(false)}
        src={sourceImage}
      />
    </>
  );
}
