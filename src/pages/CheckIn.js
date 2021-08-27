import LoadingCircle from 'components/atoms/LoadingCircle';
import SetMaps from 'components/atoms/SetMaps';
import Textarea from 'components/atoms/Textarea';
import Compressor from 'compressorjs';
import ButtonSubmit from 'devices/mobile/component/atoms/ButtonSubmit';
import CardBarAbsensi from 'devices/mobile/component/molecules/CardBarAbsensi';
import CardBarUpFormAbsensi from 'devices/mobile/component/molecules/CardBarUpFormAbsensi';
import CardInputPhoto from 'devices/mobile/component/molecules/CardInputPhoto';
import CardKeterangan from 'devices/mobile/component/molecules/CardKeterangan';
import CardListRadio from 'devices/mobile/component/molecules/CardListRadio';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { isCheckIn } from 'store/actions/presence';
import absensi from '../constants/api/absensi';

const CheckIn = ({ history }) => {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const USER = useSelector((state) => state.users);
  const ABSEN = useSelector((state) => state.presence);

  const [state, setState] = useForm({
    user_id: null,
    lokasi: '',
    long_lat: '',
    photo: '',
    kehadiran: '',
    kondisi: '',
    keterangan: '',
    jam: '',
    is_shift: 0,
  });

  const inputPhoto = (event) => {
    let file = event.target.files[0] ? event.target.files[0] : null;
    if (!file) {
      return;
    } else {
      new Compressor(file, {
        quality: 0.5,
        convertSize: 5000,
        success: (result) => {
          setPhoto(URL.createObjectURL(result));
          createImage(result);
        },
      });
    }
  };

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const sendlongLat = (value) => {
    setlongLat(value);
  };

  const sendAddress = (value) => {
    setAddress(value);
  };

  const submitFunction = (event) => {
    event.preventDefault();
    setisSubmit(true);
    state.long_lat = longLat;
    state.user_id = USER?.id;
    state.photo = image;
    state.lokasi = address;
    state.jam = convertDate('fullDate');

    absensi
      .checkIn(state)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(isCheckIn(response.data.data));
          ToastHandler('success', response?.data?.message);
          setisSubmit(false);
          setTimeout(() => {
            history.push('/');
          }, 300);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          ToastHandler(
            'error',
            err?.response?.data?.message ?? 'Something happened',
          );
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
      });
  };
  const handlerUpForm = () => {
    setPopUp(!popUp);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, [USER, ABSEN]);

  if (!didMount) {
    return null;
  }

  return (
    isMobile && (
      <motion.div className="flex flex-col min-h-screen h-full bg-white">
        <CardBarAbsensi link={history.goBack} />
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
            !popUp ? 'h-1/2' : 'h-5/6 mt-20'
          }`}>
          <CardBarUpFormAbsensi
            handlerUp={handlerUpForm}
            type="in"
            isUp={popUp}
          />
          <motion.div className="flex flex-col p-4 pb-12 rounded-t-xl z-10 overflow-y-auto hidden-scroll h-full bg-white ">
            <form action="" className="pb-12" onSubmit={submitFunction}>
              {USER?.subunit === 'CUSTOMER CARE' && (
                <CardListRadio
                  title="Shift"
                  data={['Pagi', 'Siang', 'Malam']}
                  setState={setState}
                  textName="is_shift"
                />
              )}

              {USER?.subunit !== 'CUSTOMER CARE' || state.is_shift > 0 ? (
                <>
                  <CardListRadio
                    title="Kondisi"
                    data={['sehat', 'sakit', 'cuti', 'sppd']}
                    setState={setState}
                    textName="kondisi"
                  />
                  {state.kondisi === 'sehat' && (
                    <CardListRadio
                      title="Kehadiran"
                      data={['WFO', 'WFH', 'Satelit']}
                      setState={setState}
                      textName="kehadiran"
                    />
                  )}

                  <CardKeterangan
                    shift={state.is_shift}
                    kondisi={state.kondisi}>
                    <Textarea
                      labelName="Keterangan"
                      name="keterangan"
                      value={state.keterangan}
                      onChange={setState}
                      placeholder={`Alasan ${
                        state.kondisi === 'sehat' || state.kondisi === ''
                          ? 'Terlambat'
                          : state.kondisi
                      }? `}
                    />
                  </CardKeterangan>
                </>
              ) : (
                <></>
              )}
              <CardInputPhoto
                photo={photo}
                handlerChangPhoto={(event) => inputPhoto(event)}
              />

              {isSubmit ? (
                <div className="flex items-center justify-center">
                  <LoadingCircle />
                </div>
              ) : (
                photo &&
                (state.kehadiran || state.keterangan) &&
                state.kondisi &&
                photo && <ButtonSubmit type="in" value="Check In" />
              )}
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  );
};

export default CheckIn;
