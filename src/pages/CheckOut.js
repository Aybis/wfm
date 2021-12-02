import ButtonSubmit from 'components/devices/mobile/component/atoms/ButtonSubmit';
import Card from 'components/devices/mobile/component/molecules/Card';
import CardBarAbsensi from 'components/devices/mobile/component/molecules/CardBarAbsensi';
import CardInputPhoto from 'components/devices/mobile/component/molecules/CardInputPhoto';
import MobileOnly from 'components/devices/mobile/component/molecules/MobileOnly';
import SetMaps from 'components/devices/universal/atoms/SetMaps';
import Compressor from 'compressorjs';
import absensi from 'constants/api/absensi';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const CheckOut = ({ history }) => {
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState(null);
  const { id } = useParams();
  const date = new Date();
  const USER = useSelector((state) => state.users);
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
    photo: '',
    jam: dateTime,
    absensi_id: id,
    user_id: USER?.id,
  });

  const inputPhoto = (event) => {
    let fileValue = event.target.files[0] ? event.target.files[0] : null;
    if (!fileValue) {
      return;
    } else {
      new Compressor(fileValue, {
        quality: 0.5, // 0.6 can also be used, but its not recommended to go below.
        convertSize: 5000,
        success: (result) => {
          // compressedResult has the compressed file.
          let source = URL.createObjectURL(result);
          setPhoto(source);
          // Use the compressed file to upload the images to your server.
          createImage(result);
        },
      });
    }
  };

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      state.photo = e.target.result;
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
    setisSubmit(true);
    state.user_id = USER?.id;

    absensi
      .checkOut(state, id)
      .then((res) => {
        setisSubmit(false);
        swal({
          title: res.data.message,
          icon: 'success',
          button: 'Close!',
        }).then((val) => {
          setTimeout(() => {
            history.goBack();
          }, 300);
        });
      })
      .catch((err) => {
        setisSubmit(false);
        if (err?.message) {
          ToastHandler(
            'error',
            err?.response?.data?.message?.length > 0 && 'Something happened',
          );
        } else {
          ToastHandler(
            'error',
            err?.response?.data?.message ?? 'Something happened',
          );
        }
      });
  };

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return isMobile ? (
    <div className={`pt-20 transition-all duration-300 ease-in-out`}>
      <CardBarAbsensi link={history.goBack} />

      {/* Kehadiran  */}
      <Card addClass="z-10 mt-6 mx-4">
        <label
          htmlFor="Shifting"
          className="text-sm font-semibold text-warmGray-900 tracking-wide">
          Lokasi
        </label>
        <SetMaps
          height="100%"
          className="relative h-52 rounded-lg z-0 mt-2 shadow-xl"
          sendlongLat={sendlongLat}
          sendAddress={sendAddress}
        />

        <div className="bg-white h-auto p-4 rounded-lg z-30 relative mx-4 -mt-12 shadow-lg flex gap-4">
          <div className="h-24 w-24 rounded-lg flex-none">
            <CardInputPhoto
              photo={photo}
              handlerChangPhoto={(event) => inputPhoto(event)}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <h1
              className={` ${
                !photo ? 'text-red-500' : 'text-warmGray-800'
              } text-sm capitalize font-semibold text-left`}>
              {photo ? USER.name.toLowerCase() : 'Take a Selfie'}
            </h1>
            <p className="text-xs font-light text-warmGray-400 tracking-wide">
              {address}
            </p>
          </div>
        </div>
      </Card>
      <form
        className="flex flex-col gap-8 mt-2 mb-12"
        onSubmit={submitFunction}>
        {photo && (
          <ButtonSubmit
            type="out"
            value="Check Out"
            moreClass="mt-2"
            isSubmit={isSubmit}
          />
        )}
      </form>
    </div>
  ) : (
    <MobileOnly />
  );
};

export default CheckOut;
