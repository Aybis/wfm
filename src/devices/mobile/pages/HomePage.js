import Modal from 'components/atoms/Modal';
import Carousel from 'components/molecules/Carousel';
import absensi from 'constants/api/absensi';
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
import LayoutMobile from '../LayoutMobile';

export default function HomePage() {
  const USER = useSelector((state) => state.users);
  const ABSENSI = useSelector((state) => state.absensi);
  const [dataHoliday, setdataHoliday] = useState(false);
  const [showModal, setshowModal] = useState(false);
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
          {Array.from({ length: 5 }).map((index) => {
            return <CardMessageMobile type="ceo" key={Math.random()} />;
          })}
        </CardScrollHorizontal>
      </Card>
      {/* End CEO Messages */}

      {/* CEO Messages */}
      <Card>
        <CardHeadingMobile
          heading="Selebs Today"
          subheading="Late of Absence Employee list"
        />
        <CardScrollHorizontal>
          {Array.from({ length: 5 }).map((index) => {
            return (
              <CardMessageMobile
                name="Abdul Muchtar"
                message="Maaf telat, tadi pesawatnya abis bensin di karawang."
                type="seleb"
                key={Math.random()}
              />
            );
          })}
        </CardScrollHorizontal>
      </Card>
      {/* End CEO Messages */}

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
