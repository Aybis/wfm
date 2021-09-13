import LoadingCircle from 'components/devices/universal/atoms/LoadingCircle';
import Modal from 'components/devices/universal/atoms/Modal';
import CardHeadingDesktop from 'components/devices/universal/molecules/CardHeadingDesktop';
import CardUnit from 'components/devices/universal/molecules/CardUnit';
import Carousel from 'components/devices/universal/molecules/Carousel';
import { setAuthorizationHeader } from 'configs/axios';
import absensi from 'constants/api/absensi';
import users from 'constants/api/users';
import ToastHandler from 'helpers/hooks/toast';
import dataCeoMessages from 'json/dataCeoMessages';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataWeekly, messageData, statusData } from 'store/actions/absensi';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';
import ChildTable from '../atoms/ChildTable';
import LayoutDekstop from '../LayoutDekstop';
import CardContainer from '../molecules/CardContainer';
import CardGridDekstop from '../molecules/CardGridDekstop';
import CardKehadiranDekstop from '../molecules/CardKehadiranDekstop';
import CardWorkDesktop from '../molecules/CardWorkDesktop';
import DetailCeoMessage from '../molecules/DetailCeoMessage';
import SlideHorizontal from '../molecules/SlideHorizontal';
import TableDesktop from '../molecules/TableDesktop';

export default function HomePage() {
  const dataMessage = dataCeoMessages.dataMessageCeo;
  const dataSeleb = dataCeoMessages.dataSelebsToday;
  const USER = useSelector((state) => state.users);
  const ABSENSI = useSelector((state) => state.absensi);
  const [dataHoliday, setdataHoliday] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [dataUnit, setdataUnit] = useState(false);
  const [showModalCeoMessage, setshowModalCeoMessage] = useState(false);
  const [detailMessageCeo, setdetailMessageCeo] = useState([]);
  const dispatch = useDispatch();
  const session = localStorage['WFM:token']
    ? JSON.parse(localStorage['WFM:token'])
    : null;

  const reportWeeklyPersonal = () => {
    dispatch(statusData('loading'));
    absensi
      .weeklyPersonal(USER?.id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(dataWeekly(response.data));
          dispatch(messageData('ok'));
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

  const getDataAllUnit = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);
    users
      .allUnit()
      .then((res) => {
        if (res.status) {
          setdataUnit(res.data);
        }
      })
      .catch((err) => {
        ToastHandler('err', err.response);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    setshowModal(true);
    absensiToday();
    reportWeeklyPersonal();
    getDataHoliday();
    getDataAllUnit();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);
  if (!USER?.id) {
    return null;
  }

  const handlerOnClickMessageCEO = (event, date, id, message) => {
    setdetailMessageCeo({
      date: date,
      message: message,
    });
    setshowModalCeoMessage(true);
  };

  return ABSENSI.message === 'ok' ? (
    <LayoutDekstop>
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

      {/* Section Absensi */}
      <CardContainer moreClass="bg-white">
        <CardKehadiranDekstop />
        {ABSENSI.dataWeekly.length > 0 ? (
          <CardGridDekstop col={5}>
            {ABSENSI.dataWeekly.map((item) => {
              return <CardWorkDesktop data={item} key={Math.random()} />;
            })}
          </CardGridDekstop>
        ) : (
          ''
        )}
      </CardContainer>
      {/* End Section Absensi */}

      {/* Section CEO Message */}
      <CardContainer>
        <SlideHorizontal
          data={dataMessage}
          handlerOnClick={handlerOnClickMessageCEO}
          type="ceo"
          heading="CEO Messages"
        />
      </CardContainer>
      {/* End Section CEO Message */}

      {/* Section Selebs Today */}
      <CardContainer moreClass="-mt-12 hidden">
        <SlideHorizontal
          data={dataSeleb}
          type="seleb"
          heading="Our Selebs Today"
          subHeading="List Employee late of Presence"
        />
      </CardContainer>
      {/* End Section Selebs Today */}

      {/* Section Absensi */}
      {/* End Section Absensi */}

      {/* Section All Unit */}
      <CardContainer>
        <CardHeadingDesktop
          heading="Our Units"
          subheading="List Unit on This Company"
        />
        <CardGridDekstop col={4}>
          {dataUnit ? (
            dataUnit.map((data, index) => (
              <CardUnit key={index} name={data.name} />
            ))
          ) : (
            <LoadingCircle />
          )}
        </CardGridDekstop>
      </CardContainer>
      {/* End Section All Unit */}

      {/* Section Hari Libur */}
      <CardContainer>
        <CardHeadingDesktop
          heading="Hari Libur"
          subheading="Hari Libur di Tahun 2021"
        />
        <TableDesktop>
          {dataHoliday.length > 0
            ? dataHoliday.map((data, index) => (
                <ChildTable key={Math.random()} data={data} />
              ))
            : null}
        </TableDesktop>
      </CardContainer>
      {/* End Section Hari Libur */}
    </LayoutDekstop>
  ) : (
    ''
  );
}
