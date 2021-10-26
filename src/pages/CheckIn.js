import ButtonSubmit from 'components/devices/mobile/component/atoms/ButtonSubmit';
import ItemTab from 'components/devices/mobile/component/atoms/ItemTab';
import Card from 'components/devices/mobile/component/molecules/Card';
import CardBarAbsensi from 'components/devices/mobile/component/molecules/CardBarAbsensi';
import CardBarUpFormAbsensi from 'components/devices/mobile/component/molecules/CardBarUpFormAbsensi';
import CardInputPhoto from 'components/devices/mobile/component/molecules/CardInputPhoto';
import CardKehadiran from 'components/devices/mobile/component/molecules/CardKehadiran';
import CardKeterangan from 'components/devices/mobile/component/molecules/CardKeterangan';
import CardListRadio from 'components/devices/mobile/component/molecules/CardListRadio';
import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import SetMaps from 'components/devices/universal/atoms/SetMaps';
import Textarea from 'components/devices/universal/atoms/Textarea';
import Compressor from 'compressorjs';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import ToastHandler from 'helpers/hooks/toast';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { isCheckIn } from 'store/actions/presence';
import absensi from '../constants/api/absensi';
import { Switch } from '@headlessui/react';

const CheckIn = ({ history }) => {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [isSelectRadio, setisSelectRadio] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [loadPhoto, setloadPhoto] = useState(false);
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
      setloadPhoto(true);
      new Compressor(file, {
        quality: 0.5,
        convertSize: 5000,
        success: (result) => {
          setPhoto(URL.createObjectURL(result));
          createImage(result);
          setloadPhoto(false);
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

  const handlerItemRadio = (event) => {
    console.log(event.target.name, event.target.value);
    setisSelectRadio(event.target.value);
  };

  const submitFunction = (event) => {
    event.preventDefault();
    setisSubmit(true);
    state.long_lat = longLat;
    state.user_id = USER?.id;
    state.photo = image;
    state.lokasi = address;
    state.jam = convertDate('fullDate');

    if (state.kondisi !== 'sehat') {
      state.kehadiran = null;
    } else {
      state.keterangan = '';
    }

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
        setisSubmit(false);
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

        {/* Kehadiran  */}
        <Card addClass="z-10 mt-24 mx-4">
          <label
            htmlFor="Shifting"
            className="text-sm font-semibold text-warmGray-900 tracking-wide">
            Lokasi
          </label>
          <SetMaps
            height="100%"
            className="relative h-52 rounded-lg z-0 mt-2"
            popup={!popUp}
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
            <div className="flex flex-col gap-1">
              <h1 className="text-sm capitalize text-warmGray-800 font-semibold">
                {USER.name ? USER.name.toLowerCase() : 'Take a Selfie'}
              </h1>
              <p className="text-xs font-light text-warmGray-400 tracking-wide">
                {address}
              </p>
            </div>
          </div>
        </Card>

        <Card addClass="mx-4 ">
          <CardListRadio
            title="Shifting"
            data={['Pagi', 'Siang', 'Malam']}
            setState={setState}
            textName="is_shift"
          />
        </Card>

        <Card addClass="mx-4">
          <CardListRadio
            title="Kondisi"
            data={['sehat', 'sakit', 'ijin', 'cuti', 'sppd']}
            setState={setState}
            textName="kondisi"
          />
        </Card>

        <Card addClass="mx-4">
          <CardListRadio
            title="Kehadiran"
            data={['WFH', 'WFO']}
            setState={setState}
            textName="kehadiran"
          />
        </Card>

        <Card addClass="mx-4">
          <CardKeterangan shift={state.is_shift} kondisi={state.kondisi}>
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
        </Card>

        <Card addClass="mx-4 -mt-2">
          <ButtonSubmit type="in" value="Check In" />
        </Card>
      </motion.div>
    )
  );
};

export default CheckIn;
