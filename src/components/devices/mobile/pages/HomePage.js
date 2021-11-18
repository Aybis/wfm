import axios from 'axios';
import DetailCeoMessage from 'components/devices/desktop/molecules/DetailCeoMessage';
import Modal from 'components/devices/universal/atoms/Modal';
import Carousel from 'components/devices/universal/molecules/Carousel';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import ToastHandler from 'helpers/hooks/toast';
import dataCeoMessages from 'json/dataCeoMessages';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataWeekly, statusData } from 'store/actions/absensi';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';
import Card from '../component/molecules/Card';
import CardDay from '../component/molecules/CardDay';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardHariLiburMobile from '../component/molecules/CardHariLiburMobile';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
// import CardKehadiran from '../component/molecules/CardKehadiran';
import CardMessageMobile from '../component/molecules/CardMessageMobile';
import CardModuleApp from '../component/molecules/CardModuleApp';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import SimpleCarousel from '../component/molecules/SimpleCarousel';
import TeamMate from '../component/molecules/TeamMate';
import LayoutMobile from '../LayoutMobile';

export default function HomePage() {
  const USER = useSelector((state) => state.users);
  const [dataYoutube, setdataYoutube] = useState([]);
  const YOUTUBE_PLAYLIST_ITEMS_API = `https://www.googleapis.com/youtube/v3/playlistItems`;
  const [dataHoliday, setdataHoliday] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [showModalCeoMessage, setshowModalCeoMessage] = useState(false);
  const [detailMessageCeo, setdetailMessageCeo] = useState([]);
  const [didMount, setDidMount] = useState(false);

  const dataJson = dataCeoMessages;
  const dispatch = useDispatch();

  const reportWeeklyPersonal = () => {
    dispatch(statusData('loading'));
    absensi
      .weeklyPersonal(USER?.id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(dataWeekly(response.data));
        }
      })
      .catch((error) => {
        ToastHandler('error', error?.response?.data?.message ?? 'error');
      });
  };

  const absensiToday = () => {
    dispatch(statusPresence('loading'));

    absensi
      .dailyPersonal(USER?.id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(isCheckIn(response.data));
        }
      })
      .catch((error) => {
        dispatch(messagePresence(error?.response?.data?.message ?? 'error'));
        ToastHandler('error', error?.response?.data?.message ?? 'error');
      });
  };

  const getDataHoliday = () => {
    absensi
      .getHoliday()
      .then((res) => {
        if (res.status === 200) {
          setdataHoliday(res.data.data);
        }
      })
      .catch((err) => {
        ToastHandler('err', err.message);
      });
  };

  const handlerOnClickMessageCEO = (event, data) => {
    setdetailMessageCeo({
      date: data.tanggal,
      message: data.message,
    });
    setshowModalCeoMessage(true);
  };

  const handlerClickYoutube = (event, data) => {
    const linkYoutube = 'https://www.youtube.com/watch';
    // console.log(data);
    // window.location.href = `${linkYoutube}?v=${data}`;
    window.open(`${linkYoutube}?v=${data}`, '_blank').focus();
  };

  useEffect(() => {
    axios
      .get(
        ` ${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLMrgP0P9dmMyLfzSHY7XhX2leEgUZVIJc&key=${process.env.REACT_APP_YOUTUBE_API_KEY} `,
      )
      .then((res) => {
        setdataYoutube(res.data.items);
      })
      .catch((err) => {
        console.log('error yutub', err.response);
      });
    window.scroll(0, 0);
    absensiToday();
    reportWeeklyPersonal();
    getDataHoliday();

    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  if (!USER?.id) {
    return null;
  }

  if (!didMount) {
    return null;
  }

  return (
    <LayoutMobile isShow>
      {/* Content  */}
      <div className="flex flex-col -mt-2">
        <h1 className="text-xl font-semibold text-warmGray-700 tracking-wide hidden">
          <small>Welcome back,</small>
          {USER.username.replace('.', ' ')}
        </h1>
        <h1 className="text-xl tracking-tight  text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline font-normal">Welcome back, </span>{' '}
          <span className="block text-gray-800 tracking-wide xl:inline font-bold capitalize">
            {USER.name.toLowerCase().replace('.', ' ')}
          </span>
        </h1>
        <span className="text-sm font-light text-warmGray-500 mt-2 hidden">
          Ayoo Implementasikan{' '}
          <b className="text-warmGray-600 font-bold">Core Value AKHLAK </b>{' '}
          dalam kehidupan dan pekerjaan sehari-hari !!!
        </span>
      </div>

      {/* Start Modal */}
      <Modal
        title="Berita Hari Ini"
        isShowModal={() => setshowModal(false)}
        show={showModal}>
        <Carousel />
      </Modal>
      {/* End Modal */}

      {/* Modal CEO Messages */}
      <Modal
        title="CEO Messages"
        isShowModal={() => setshowModalCeoMessage(false)}
        show={showModalCeoMessage}>
        <DetailCeoMessage data={detailMessageCeo} />
      </Modal>
      {/* End Modal CEO Messages */}

      {/* Kehadiran  */}
      {/* <Card>
        <CardKehadiran />
      </Card> */}
      {/* End Kehadiran  */}

      {/* Carousel */}
      <SimpleCarousel></SimpleCarousel>
      {/* End Carousel */}

      <CardModuleApp />

      {/* Daily Absence  */}
      <Card addClass="hidden">
        <CardDay />
      </Card>
      {/* End Daily Absence  */}

      {/* CEO Messages */}
      <Card>
        <CardHeadingMobile heading="Pesan CEO" />
        <CardScrollHorizontal>
          {dataJson.dataMessageCeo.map((data) => {
            return (
              <CardMessageMobile
                data={data}
                type="ceo"
                onClick={handlerOnClickMessageCEO}
                key={Math.random()}
              />
            );
          })}
        </CardScrollHorizontal>
      </Card>
      {/* End CEO Messages */}

      {/* Card Team Mate */}
      <TeamMate />
      {/* Card Teammate */}

      {/* Card Yutub */}
      <div className="relative mt-6">
        <CardHeadingMobile heading="PINS Radio" />
        <CardScrollHorizontal>
          {dataYoutube?.map((item) => (
            <motion.div
              onClick={(e) =>
                handlerClickYoutube(e, item.snippet.resourceId.videoId)
              }
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              key={item.id}
              className="flex flex-col flex-none w-64 px-4 pt-4 bg-white rounded-md">
              <img
                src={item.snippet.thumbnails.high?.url}
                alt={item.id}
                className="h-44 rounded-md"
              />
              <div className="flex flex-col mt-2">
                <h1 className="text-sm font-semibold text-gray-800 capitalize">
                  {item.snippet.title}
                </h1>
                <span className="text-xs font-normal text-warmGray-800 mt-2">
                  {item.snippet.channelTitle}
                </span>
                <span className="text-xs font-light text-warmGray-400 tracking-wide mt-1 pb-2">
                  {item.snippet.description.substring(0, 100) + ' ...'}
                </span>
              </div>
            </motion.div>
          ))}
        </CardScrollHorizontal>
        {/* <div className="grid grid-cols-1 gap-4 mt-4">
         
        </div> */}
      </div>
      {/* End Card Yutub */}

      {/* Selebs Today */}
      <Card addClass="hidden">
        <CardHeadingMobile
          heading="Selebs Today"
          subheading="Late of Absence Employee list"
        />
        <CardScrollHorizontal>
          {dataJson.dataSelebsToday.map((data) => {
            return (
              <CardMessageMobile data={data} type="seleb" key={Math.random()} />
            );
          })}
        </CardScrollHorizontal>
      </Card>
      {/* End Selebs Today */}

      <Card>
        <CardHeadingMobile heading="Hari Libur" />
        <CardGridMobile>
          {dataHoliday.length > 0 ? (
            dataHoliday.map((data, index) => (
              <CardHariLiburMobile key={index} data={data} />
            ))
          ) : (
            <p>Tidak Ada</p>
          )}
        </CardGridMobile>
      </Card>

      {/* End Content */}
    </LayoutMobile>
  );
}
