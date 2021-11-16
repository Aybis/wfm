import { LightningBoltIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import Input from 'components/devices/universal/atoms/Input';
import Label from 'components/devices/universal/atoms/Label';
import SetMaps from 'components/devices/universal/atoms/SetMaps';
import { setAuthorizationHeader } from 'configs/axios';
import absensi from 'constants/api/absensi';
import users from 'constants/api/users';
import convertDate from 'helpers/hooks/convertDate';
import useForm from 'helpers/hooks/useForm';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

const OvertimeIn = ({ history }) => {
  const USER = useSelector((state) => state.users);
  const ABSENSI = useSelector((state) => state.presence);
  const [didMount, setDidMount] = useState(false);
  const [popUp, setpopUp] = useState(false);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [timeStamp, settimeStamp] = useState(null);
  const [dataAtasan, setdataAtasan] = useState(null);

  const session = JSON.parse(localStorage.getItem('WFM:token'));

  const [state, setState] = useForm({
    user_id: USER?.id,
    long_lat: '',
    lokasi: '',
    subject: '',
    jam: convertDate('fullDate'),
    absensi_id: ABSENSI.data.id,
    approval: [],
    current: USER?.username,
  });

  const getAtasan = async (id) => {
    let result;
    return users
      .listAtasan({
        params: {
          position_id: id,
        },
      })
      .then((response) => {
        response.map(
          (item) =>
            (result = {
              position: item.atasan.name,
              id: item.atasan.users[0].id,
              name: item.atasan.users[0].name,
              username: item.atasan.users[0].username,
            }),
        );
        return result;
      })
      .catch((error) => {
        return error;
      });
  };

  const getDataAtasan = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);

    getAtasan(USER?.position_id).then(function (response) {
      setdataAtasan(response);
    });
  };

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

    state.long_lat = longLat;
    state.lokasi = address;
    state.jam = convertDate('fullDate');
    state.approval = [dataAtasan.username, 'abdul.muchtar'];

    absensi
      .overtimeIn(state)
      .then((response) => {
        swal({
          title: response.data.message,
          icon: 'success',
          button: 'Close!',
        }).then((val) => {
          setTimeout(() => {
            history.push('/');
          }, 300);
        });

        setTimeout(() => {
          history.push('/');
        }, 300);
      })
      .catch((err) => {
        swal({
          title: err.response.data.message ?? 'Something happened',
          icon: 'error',
          text: err.response.data.message.map((item) => item),
          button: 'Close!',
        });
        console.log(err.response.data.message);
      });

    // swal({
    //   title: 'Check In berhasil!',
    //   icon: 'success',
    //   button: 'Close!',
    // });
  };

  const sendlongLat = (value) => {
    setlongLat(value);
  };

  const sendAddress = (value) => {
    setAddress(value);
  };

  useEffect(() => {
    getDataAtasan();
    setDidMount(true);
    const timeOutId = setTimeout(() => {
      setpopUp(true);
    }, 500);
    return () => {
      setDidMount(false);
      clearTimeout(timeOutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className={popUp ? 'pt-20 lg:hidden' : 'pt-0'}>
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
          className={`fixed transition-all duration-500 ease-in-out bottom-0 inset-x-0 bg-yellow-500 rounded-t-xl ${
            popUp ? 'h-1/2' : 'h-5/6 mt-20'
          }`}>
          <div className="flex justify-between text-white bg-yellow-500  px-4 py-2 rounded-t-xl z-10">
            <div className="inline-flex">
              <LightningBoltIcon className="h-5 w-5 " />
              <h4 className="font-light text-sm ml-2">Overtime Start</h4>
            </div>

            <ChevronDownIcon
              className={`mr-2 h-6 w-6 transform transition duration-300 rounded-full ${
                popUp ? 'rotate-180' : 'rotate-0'
              }`}
              onClick={() => setpopUp(!popUp)}
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
              <Input
                labelName="Subject"
                name="subject"
                type="text"
                placeholder="Membuat aplikasi POP"
                value={state.subject}
                onChange={setState}
              />

              <div className="grid grid-cols-2 gap-2 -mt-2 justify-items-center">
                <div className="flex flex-col  gap-1">
                  <Label labelName="Start Overtime" />
                  <h4 className="text-gray-800 text-sm font-semibold">
                    {timeStamp}
                  </h4>
                </div>
                <div className="flex flex-col gap-1">
                  <Label labelName="Finish Overtime" />
                  <h4 className="text-gray-800 text-sm font-semibold animate-pulse">
                    -- : --
                  </h4>
                </div>
              </div>

              {state.subject && (
                <button className="p-3 text-lg font-semibold bg-apps-primary w-full text-center rounded-lg text-white mt-2">
                  Start
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OvertimeIn;
