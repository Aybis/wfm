import { setAuthorizationHeader } from 'configs/axios';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardTeam from '../../../universal/molecules/CardTeam';
import Card from './Card';
import CardHeadingMobile from './CardHeadingMobile';
import CardScrollHorizontal from './CardScrollHorizontal';

export default function TeamMate() {
  const USER = useSelector((state) => state.users);
  const session = JSON.parse(localStorage.getItem('WFM:token'));
  const [dataTeamMate, setdataTeamMate] = useState([]);
  const [dataAtasan, setdataAtasan] = useState(null);
  const [didMount, setDidMount] = useState(false);

  // const container = {
  //   hidden: { opacity: 1, scale: 0 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       delayChildren: 0.2,
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  const handlerClickSendWa = (data) => {
    absensi
      .notifWa({
        id: data.id,
        nama_atasan: data.atasan,
      })
      .then((res) => {
        ToastHandler('success', res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAtasan = async (id) => {
    let result;
    return absensi
      .atasan({
        params: {
          position_id: id,
        },
      })
      .then((response) => {
        response.data.map(
          (item) =>
            (result = {
              position: item.atasan.name,
              id: item.atasan.users[0].id,
              name: item.atasan.users[0].name,
              image: item.atasan.users[0].image
                ? item.atasan.users[0].image.url_user
                : `https://ui-avatars.com/api/?name=${item.atasan.users[0].name}&background=F3F3F3&color=000`,
              absen: item.atasan.users[0].absen_today
                ? item.atasan.users[0].absen_today.detail_absensi[0].jam
                : null,
            }),
        );
        return result;
      })
      .catch((error) => {
        console.log('atasan error', error.response);

        return error;
      });
  };

  const collectBawahan = async (id) => {
    let result;
    return absensi
      .bawahan({
        params: {
          position_id: id,
        },
      })
      .then((response) => {
        response.data.map(
          (item) =>
            (result = {
              atasan_id: item.atasan_id,
              bawahan: item.bawahan,
            }),
        );
        return result;
      })
      .catch((error) => {
        console.log('bawahan error', error.response);
      });
  };

  const getDataAtasan = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);

    getAtasan(USER?.position_id).then(function (response) {
      setdataAtasan(response);
    });

    collectBawahan(USER?.position_id).then(function (response) {
      if (response.bawahan.length > 0) {
        let dataBawahan = [];
        console.log(response);
        response.bawahan.map((listPosition) =>
          listPosition.users.map((user) =>
            dataBawahan.push({
              position: listPosition.name,
              id: user.id,
              name: user.name,
              image: user.image
                ? user.image.url_user
                : `https://ui-avatars.com/api/?name=${user.name}&background=F3F3F3&color=000`,
              absen: user.absen_today
                ? user.absen_today.detail_absensi[0].jam
                : null,
            }),
          ),
        );
        setdataTeamMate(dataBawahan);
      } else {
        collectBawahan(response.atasan_id).then((success) => {
          let dataBawahan = [];
          success.bawahan.map((listPosition) =>
            listPosition.users.map((user) =>
              dataBawahan.push({
                position: listPosition.name,
                id: user.id,
                name: user.name,
                image: user.image
                  ? user.image.url_user
                  : `https://ui-avatars.com/api/?name=${user.name}&background=F3F3F3&color=000`,
                absen: user.absen_today
                  ? user.absen_today.detail_absensi[0].jam
                  : null,
              }),
            ),
          );
          setdataTeamMate(dataBawahan);
        });
      }
    });
  };

  useEffect(() => {
    getDataAtasan();
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <Card>
      <CardHeadingMobile heading="Teammate" />
      <CardScrollHorizontal>
        <motion.div className="overflow-x-auto hidden-scroll flex gap-4 p-2 -mt-2">
          {dataAtasan ? (
            <CardTeam data={dataAtasan} onClick={handlerClickSendWa} />
          ) : (
            <p>Loading ....</p>
          )}
          {/* card team */}
          {dataTeamMate.length > 0 &&
            dataTeamMate.map((team) => (
              <CardTeam
                key={Math.random()}
                data={team}
                onClick={handlerClickSendWa}
              />
            ))}
          {/* end card team */}
        </motion.div>
      </CardScrollHorizontal>
    </Card>
  );
}
