/** @format */

import { LightningBoltIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import Label from 'components/atoms/Label';
import SetMaps from 'components/atoms/SetMaps';
import Textarea from 'components/atoms/Textarea';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';

const OvertimeOut = ({ history }) => {
  const [didMount, setDidMount] = useState(false);
  const [popup, setpopup] = useState(false);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [timeStamp, settimeStamp] = useState(null);

  const [state, setState] = useForm({
    longLat: '',
    address: '',
    subject: '',
    keterangan: '',
  });

  const getHoursAndTime = () => {
    let timeCurrent = new Date();
    settimeStamp(
      `${timeCurrent.getHours()} : ${
        timeCurrent.getMinutes() < 10
          ? `0${timeCurrent.getMinutes()}`
          : timeCurrent.getMinutes()
      }`,
    );
  };

  const submitFunction = (event) => {
    event.preventDefault();
    getHoursAndTime();

    state.longLat = longLat;
    state.address = address;
    ToastHandler(
      'success',
      `
      Alamat : ${state.address},
      Title : ${state.subject},
      Longitude : ${state.longLat.lng},
      Latitude : ${state.longLat.lat}
    `,
    );
  };

  const sendlongLat = (value) => {
    setlongLat(value);
  };

  const sendAddress = (value) => {
    setAddress(value);
  };

  useEffect(() => {
    setDidMount(true);
    const timeOut = setTimeout(() => {
      setpopup(true);
    }, 500);
    return () => {
      setDidMount(false);
      clearTimeout(timeOut);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <>
      <div className="hiddden container lg:flex justify-center items-center">
        <h1>
          Maaf halaman ini hanya dapat diakses melalui smartphone dan tablet
        </h1>
      </div>
      <div className={popup ? 'pt-20 lg:hidden' : 'pt-0'}>
        <button
          onClick={history.goBack}
          className="absolute z-40 left-4 rounded-full transition-all duration-500"
          style={{ top: `${popup ? '44%' : '11%'}` }}>
          <ChevronLeftIcon className="h-8 w-8 bg-white rounded p-1" />
        </button>

        <SetMaps
          popup={popup}
          sendlongLat={sendlongLat}
          sendAddress={sendAddress}
        />

        <div
          className={`fixed transition-all duration-500 ease-in-out bottom-0 inset-x-0 bg-yellow-500 rounded-t-xl ${
            popup ? 'h-1/2' : 'h-5/6 mt-20'
          }`}>
          <div className="flex justify-between text-white bg-yellow-500  px-4 py-2 rounded-t-xl z-10">
            <div className="inline-flex">
              <LightningBoltIcon className="h-5 w-5 " />
              <h4 className="font-light text-sm ml-2">Overtime Finish</h4>
            </div>

            <ChevronDownIcon
              className={`mr-2 h-6 w-6 transform transition duration-300 rounded-full ${
                popup ? 'rotate-180' : 'rotate-0'
              }`}
              onClick={() => setpopup(!popup)}
            />
          </div>

          <div className="flex flex-col p-4 rounded-t-xl z-10 overflow-y-auto hidden-scroll h-full bg-white">
            <form
              className="flex flex-col gap-4 mt-2 mb-12"
              onSubmit={submitFunction}>
              <div className="flex flex-col gap-2 text-sm">
                <Label name="lokasi" labelName="Lokasi" />
                <p className="font-medium text-gray-800 w-full">{address}</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <Label name="subject" labelName="Subject" />
                <p className="font-medium text-gray-800 w-full">
                  Membuat Aplikasi POP
                </p>
              </div>

              <Textarea
                labelName="Keterangan"
                name="keterangan"
                placeholder="Detail Pekerjaan Lembur ?"
                value={state.keterangan}
                onChange={setState}
              />

              <div className="grid grid-cols-2 gap-2 -mt-2 justify-items-center">
                <div className="flex flex-col  gap-1">
                  <Label labelName="Start Overtime" />
                  <h4 className="text-gray-800 text-sm font-semibold">
                    19 : 32
                  </h4>
                </div>
                <div className="flex flex-col gap-1">
                  <Label labelName="Finish Overtime" />
                  <h4 className="text-gray-800 text-sm font-semibold">
                    {timeStamp}
                  </h4>
                </div>
              </div>

              {state.keterangan && (
                <button className="p-3 text-lg font-semibold bg-apps-primary w-full text-center rounded-lg text-white mt-2">
                  Finish
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OvertimeOut;
