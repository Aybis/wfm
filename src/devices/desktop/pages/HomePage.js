import LoadingCircle from 'components/atoms/LoadingCircle';
import Modal from 'components/atoms/Modal';
import CardCeoMessages from 'components/molecules/CardCeoMessages';
import CardHeadingDesktop from 'components/molecules/CardHeadingDesktop';
import CardSelebToday from 'components/molecules/CardSelebToday';
import CardUnit from 'components/molecules/CardUnit';
import Carousel from 'components/molecules/Carousel';
import { setAuthorizationHeader } from 'configs/axios';
import absensi from 'constants/api/absensi';
import users from 'constants/api/users';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataWeekly, statusData } from 'store/actions/absensi';
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
import TableDesktop from '../molecules/TableDesktop';

export default function HomePage() {
  const USER = useSelector((state) => state.users);
  const ABSENSI = useSelector((state) => state.absensi);
  const [dataHoliday, setdataHoliday] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [dataUnit, setdataUnit] = useState(false);
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

  return (
    <LayoutDekstop>
      {/* Start Modal */}
      <Modal
        title="Berita Hari Ini"
        isShowModal={() => setshowModal(false)}
        show={showModal}>
        <Carousel />
      </Modal>
      {/* End Modal */}

      {/* Section Absensi */}
      <CardContainer moreClass="bg-white">
        <CardKehadiranDekstop />
        <CardGridDekstop col={5}>
          {Object.values(ABSENSI.dataWeekly)?.map?.((item) => {
            return <CardWorkDesktop data={item} key={Math.random()} />;
          })}
        </CardGridDekstop>
      </CardContainer>
      {/* End Section Absensi */}

      {/* Section CEO Message */}
      <CardContainer moreClass="-mt-12">
        <CardCeoMessages />
      </CardContainer>
      {/* End Section CEO Message */}

      {/* Section Selebs Today */}
      <CardContainer moreClass="-mt-12">
        <CardSelebToday />
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
  );
}
