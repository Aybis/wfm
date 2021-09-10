import Modal from 'components/devices/universal/atoms/Modal';
import CardTeam from 'components/devices/universal/molecules/CardTeam';
import Carousel from 'components/devices/universal/molecules/Carousel';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import ToastHandler from 'helpers/hooks/toast';
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
import CardKehadiran from '../component/molecules/CardKehadiran';
import CardMessageMobile from '../component/molecules/CardMessageMobile';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardWorkMobile from '../component/molecules/CardWorkMobile';
import dataCeoMessages from 'json/dataCeoMessages';
import LayoutMobile from '../LayoutMobile';
import DetailCeoMessage from 'components/devices/desktop/molecules/DetailCeoMessage';

export default function HomePage() {
  const USER = useSelector((state) => state.users);
  const ABSENSI = useSelector((state) => state.absensi);
  const [dataHoliday, setdataHoliday] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [showModalCeoMessage, setshowModalCeoMessage] = useState(false);
  const [detailMessageCeo, setdetailMessageCeo] = useState([]);
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

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

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

  const handlerOnClickMessageCEO = (event, data) => {
    setdetailMessageCeo({
      date: data.tanggal,
      message: data.message,
    });
    setshowModalCeoMessage(true);
  };

  useEffect(() => {
    window.scroll(0, 0);
    setshowModal(true);
    absensiToday();
    reportWeeklyPersonal();
    getDataHoliday();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  if (!USER?.id) {
    return null;
  }

  return (
    <LayoutMobile isShow>
      {/* Content  */}

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
      <Card>
        <CardKehadiran />
      </Card>
      {/* End Kehadiran  */}

      {/* Daily Absence  */}
      <Card>
        <CardDay />
      </Card>
      {/* End Daily Absence  */}

      {/* Weekly Report Personal */}
      <Card>
        <CardHeadingMobile
          heading="Report Weekly"
          subheading="Kehadiran Mingguan Absensi"
        />
        <CardScrollHorizontal>
          {Object.values(ABSENSI.dataWeekly)?.map?.((item) => {
            return (
              <CardWorkMobile
                kehadiran={item.kehadiran}
                date={item.created_at}
                key={Math.random()}
              />
            );
          })}
        </CardScrollHorizontal>
      </Card>
      {/* End Weekly Report Personal */}

      {/* CEO Messages */}
      <Card>
        <CardHeadingMobile
          heading="CEO Messages"
          subheading="Lorem ipsum astafaragus."
        />
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

      {/* Selebs Today */}
      <Card>
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

      {/* Card Team Mate */}
      <Card>
        <CardHeadingMobile
          heading="Teammate"
          subheading="List Team Member your Unit"
        />
        <CardScrollHorizontal>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="overflow-x-auto hidden-scroll flex gap-4 p-2">
            {/* card team */}
            {dataJson.dataTeamMate.map((team) => (
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
      {/* Card Teammate */}

      <Card>
        <CardHeadingMobile
          heading="Day Off"
          subheading="Day Off this Year list"
        />
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
