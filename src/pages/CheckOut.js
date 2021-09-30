import ButtonBackAbsensi from 'components/devices/mobile/component/atoms/ButtonBackAbsensi';
import ButtonSubmit from 'components/devices/mobile/component/atoms/ButtonSubmit';
import CardBarUpFormAbsensi from 'components/devices/mobile/component/molecules/CardBarUpFormAbsensi';
import CardInputPhoto from 'components/devices/mobile/component/molecules/CardInputPhoto';
import MobileOnly from 'components/devices/mobile/component/molecules/MobileOnly';
import Label from 'components/devices/universal/atoms/Label';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import SetMaps from 'components/devices/universal/atoms/SetMaps';
import Compressor from 'compressorjs';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';

const CheckOut = ({ history }) => {
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
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
    photo: '',
    jam: dateTime,
    absensi_id: id,
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
  const handlerUpForm = () => {
    setPopUp(!popUp);
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
    absensi
      .checkOut(state, id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setisSubmit(false);
          ToastHandler(
            'success',
            res?.data?.message ?? 'Anda Berhasil Checkout',
          );
          setTimeout(() => {
            history.push('/');
          }, 300);
        }
      })
      .catch((err) => {
        setisSubmit(false);
        if (err?.message) {
          ToastHandler(
            'error',
            err?.response?.data?.message ?? 'Something happened',
          );
        } else {
          if (err.response.status === 500) {
            ToastHandler('error', err.response.data.message);
          } else if (err.response.status === 400) {
            let message = err?.response?.data?.message;
            ToastHandler('error', message.toString());
          } else {
            ToastHandler(
              'error',
              err?.response?.data?.message ?? 'Something happened',
            );
          }
          ToastHandler(
            'error',
            err?.response?.data?.message ?? 'Something happened',
          );
        }
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

  return isMobile ? (
    <div
      className={`${
        popUp ? 'pt-20 lg:hidden' : 'pt-0'
      } transition-all duration-300 ease-in-out`}>
      <ButtonBackAbsensi link={history.goBack} popUp={popUp} />

      <SetMaps
        popup={popUp}
        sendlongLat={sendlongLat}
        sendAddress={sendAddress}
      />

      <motion.div
        initial={{
          y: -300,
        }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed transition-all duration-500 ease-in-out bottom-0 inset-x-0 bg-apps-yellow rounded-t-xl z-20 ${
          popUp ? 'h-1/2' : 'h-5/6 mt-20'
        }`}>
        <CardBarUpFormAbsensi
          handlerUp={handlerUpForm}
          type="Out"
          isUp={!popUp}
        />
        <motion.div className="flex flex-col p-4 rounded-t-xl z-10 overflow-y-auto hidden-scroll h-full bg-white ">
          <form
            className="flex flex-col gap-8 mt-2 mb-12"
            onSubmit={submitFunction}>
            <div className="hidden flex-col gap-2 text-sm">
              <Label labelName="Lokasi" />
              <p className="font-normal text-gray-400 w-full">{address}</p>
            </div>
            <CardInputPhoto
              photo={photo}
              handlerChangPhoto={(event) => inputPhoto(event)}
            />

            {isSubmit ? (
              <div className="flex items-center justify-center">
                <LoadingCircle />
              </div>
            ) : (
              photo && (
                <ButtonSubmit type="out" value="Check Out" moreClass="mt-2" />
              )
            )}
          </form>
        </motion.div>
      </motion.div>
    </div>
  ) : (
    <MobileOnly />
  );
};

export default CheckOut;
