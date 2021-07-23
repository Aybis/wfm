import { LightningBoltIcon } from '@heroicons/react/outline';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import Label from 'components/atoms/Label';
import SetMaps from 'components/atoms/SetMaps';
import absensi from 'constants/api/absensi';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CheckOut = ({ history }) => {
  const [didMount, setDidMount] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState(null);
  const { id } = useParams();
  const date = new Date();

  const dateTime =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();

  const [state] = useForm({
    lokasi: '',
    long_lat: '',
    image: '',
    jam: dateTime,
    absensi_id: id,
  });

  const inputPhoto = (event) => {
    let fileValue = event.target.files[0] ? event.target.files[0] : null;
    createImage(fileValue);

    if (fileValue) {
      let source = URL.createObjectURL(fileValue);
      setPhoto(source);
    }
  };

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      state.image = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const sendlongLat = (value) => {
    state.long_lat = value;
  };

  const sendAddress = (value) => {
    setAddress(value);
    state.lokasi = value;
  };

  const submitFunction = (event) => {
    event.preventDefault();

    absensi
      .checkOut(state, id)
      .then((res) => {
        ToastHandler('success', res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        ToastHandler('error', err.response.data ? err.response.data : err);
      });
  };

  useEffect(() => {
    setDidMount(true);
    const timeOut = setTimeout(() => {
      setPopUp(true);
    }, 500);
    return () => {
      setDidMount(false);
      clearInterval(timeOut);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <>
      <div className="hiddden container lg:flex flex-col gap-4 justify-center items-center h-screen transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-semibold -mt-8">
          Maaf halaman ini hanya dapat diakses melalui smartphone dan tablet
        </h1>
        <button
          className="text-xl underline text-blue-600"
          onClick={history.goBack}>
          Kembali
        </button>
      </div>
      <div
        className={`${
          popUp ? 'pt-20 lg:hidden' : 'pt-0'
        } transition-all duration-300 ease-in-out`}>
        <button
          onClick={history.goBack}
          className="absolute z-40 left-4 rounded-full transition-all duration-500"
          style={{ top: `${popUp ? '44%' : '11%'}` }}>
          <ChevronLeftIcon className="h-8 w-8 bg-white rounded p-1" />
        </button>

        <SetMaps
          popup={popUp}
          sendlongLat={sendlongLat}
          sendAddress={sendAddress}
        />

        <div
          className={`fixed transition-all duration-500 ease-in-out bottom-0 inset-x-0 bg-apps-yellow rounded-t-xl ${
            popUp ? 'h-1/2' : 'h-5/6 mt-20'
          }`}>
          <div className="flex justify-between text-apps-text bg-apps-yellow  px-4 py-2 rounded-t-xl z-10">
            <div className="inline-flex">
              <LightningBoltIcon className="h-5 w-5 " />
              <h4 className="font-light text-sm ml-2">Check Out</h4>
            </div>

            <ChevronDownIcon
              className={`mr-2 h-6 w-6 transform transition duration-300 rounded-full ${
                popUp ? 'rotate-180' : 'rotate-0'
              }`}
              onClick={() => setPopUp(!popUp)}
            />
          </div>

          <div className="flex flex-col p-4 rounded-t-xl z-10 overflow-y-auto hidden-scroll h-full bg-white">
            <form
              className="flex flex-col gap-4 mt-2 mb-12"
              onSubmit={submitFunction}>
              <div className="flex flex-col gap-2 text-sm">
                <Label labelName="Lokasi" />
                <p className="font-normal text-gray-400 w-full">{address}</p>
              </div>

              <div className="flex flex-col gap-2 text-sm ">
                <label
                  htmlFor="image"
                  className="text-apps-text text-opacity-70 font-semibold">
                  Photo
                  {photo ? (
                    <img
                      src={photo}
                      alt="file"
                      className=" rounded-lg cursor-pointer mt-2"
                    />
                  ) : (
                    <UserCircleIcon
                      tabIndex="0"
                      className="h-64 w-full rounded-lg bg-gray-100 text-gray-400 p-2 cursor-pointer mt-2 pb-12"
                    />
                  )}
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  capture="camera"
                  id="image"
                  className="hidden"
                  onChange={(event) => inputPhoto(event)}
                />
              </div>
              {photo && (
                <button className="p-3 text-lg font-semibold bg-apps-red w-full text-center rounded-lg text-white">
                  Check Out
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
