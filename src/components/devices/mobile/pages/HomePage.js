import DetailCeoMessage from 'components/devices/desktop/molecules/DetailCeoMessage';
import Modal from 'components/devices/universal/atoms/Modal';
import absensi from 'constants/api/absensi';
import ToastHandler from 'helpers/hooks/toast';
import dataCeoMessages from 'json/dataCeoMessages';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCheckIn, messagePresence } from 'store/actions/presence';
import Card from '../component/molecules/Card';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardHariLiburMobile from '../component/molecules/CardHariLiburMobile';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardMessageMobile from '../component/molecules/CardMessageMobile';
import CardModuleApp from '../component/molecules/CardModuleApp';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardYoutube from '../component/molecules/CardYoutube';
import SimpleCarousel from '../component/molecules/SimpleCarousel';
import TeamMate from '../component/molecules/TeamMate';
import LayoutMobile from '../LayoutMobile';

export default function HomePage() {
  const USER = useSelector((state) => state.users);
  const [dataHoliday, setdataHoliday] = useState(false);
  const [showModalCeoMessage, setshowModalCeoMessage] = useState(false);
  const [detailMessageCeo, setdetailMessageCeo] = useState([]);
  const dataJson = dataCeoMessages;
  const dispatch = useDispatch();

  const absensiToday = () => {
    absensi
      .fetchDailyPersonal(USER?.id)
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
        setdataHoliday(res.data.data);
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

  useEffect(() => {
    window.scroll(0, 0);
    absensiToday();
    getDataHoliday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  if (!USER?.id) {
    return null;
  }

  return (
    <LayoutMobile isShow addClass="bg-white">
      {/* Modal CEO Messages */}
      <Modal
        title="CEO Messages"
        isShowModal={() => setshowModalCeoMessage(false)}
        show={showModalCeoMessage}>
        <DetailCeoMessage data={detailMessageCeo} />
      </Modal>
      {/* End Modal CEO Messages */}

      <CardModuleApp />

      {/* Carousel */}
      <SimpleCarousel></SimpleCarousel>
      {/* End Carousel */}

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
      <CardYoutube />
      {/* End Card Yutub */}

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
