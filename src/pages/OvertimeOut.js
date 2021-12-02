import { LightningBoltIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import Label from 'components/devices/universal/atoms/Label';
import Loading from 'components/devices/universal/atoms/Loading';
import SetMaps from 'components/devices/universal/atoms/SetMaps';
import Textarea from 'components/devices/universal/atoms/Textarea';
import absensi from 'constants/api/absensi';
import convertDate from 'helpers/hooks/convertDate';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const OvertimeOut = ({ history }) => {
  const [didMount, setDidMount] = useState(false);
  const [popup, setpopup] = useState(false);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [isSubmit, setisSubmit] = useState(false);
  const LEMBURAN = useSelector((state) => state.lemburan);
  const { id } = useParams();

  const [state, setState] = useForm({
    long_lat: '',
    lokasi: '',
    subject: '',
    detail: '',
    jam: convertDate('fullDate'),
  });

  const submitFunction = (event) => {
    event.preventDefault();
    setisSubmit(true);
    state.long_lat = longLat;
    state.lokasi = address;
    absensi
      .overtimeOut(state, id)
      .then((response) => {
        setisSubmit(false);

        swal({
          title: response.data.message,
          icon: 'success',
          button: 'Close!',
        }).then((val) => {
          setTimeout(() => {
            history.push('/overtime');
          }, 300);
        });
      })
      .catch((err) => {
        setisSubmit(false);

        swal({
          title: err.response.data.message ?? 'Something happened',
          icon: 'error',
          text: err.response.data.message.map((item) => item),
          button: 'Close!',
        });
        console.log(err.response.data.message);
      });
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
                  {LEMBURAN?.dataLemburanToday.subject}
                </p>
              </div>

              <Textarea
                labelName="Keterangan"
                name="detail"
                placeholder="Detail Pekerjaan Lembur ?"
                value={state.detail}
                onChange={setState}
              />

              <div className="grid grid-cols-2 gap-2 -mt-2 justify-items-center">
                <div className="flex flex-col  gap-1">
                  <Label labelName="Start Overtime" />
                  <h4 className="text-gray-800 text-sm font-semibold">
                    {convertDate('timeAm', LEMBURAN?.checkIn.jam)}
                  </h4>
                </div>
                <div className="flex flex-col gap-1">
                  <Label labelName="Finish Overtime" />
                </div>
              </div>

              {state.detail && (
                <button
                  disabled={isSubmit}
                  className="disabled:opacity-40 flex gap-2 justify-center items-center p-3 text-lg font-semibold bg-apps-primary w-full text-center rounded-md text-white mt-2">
                  {isSubmit && (
                    <Loading color="text-white" height={6} width={6} />
                  )}
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
