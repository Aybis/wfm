import InforekanDekstop from 'components/devices/desktop/pages/InforekanDekstop';
import InforekanMobile from 'components/devices/mobile/pages/InforekanMobile';
import { setAuthorizationHeader } from 'configs/axios';
import users from 'constants/api/users';
import React, { useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { fetchDirektorat, fetchUnit } from 'store/actions/dashboard';
import { fetchJabatan, fetchSubUnit } from 'store/actions/employee';

const Inforekan = ({ history }) => {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const session = localStorage['WFM:token']
    ? JSON.parse(localStorage['WFM:token'])
    : null;

  const getListDirektorat = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);

    users
      .allDirektorat()
      .then((res) => {
        dispatch(fetchDirektorat(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListUnit = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);

    users
      .allUnit()
      .then((res) => {
        dispatch(fetchUnit(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListSubUnit = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);

    users
      .allSubUnit()
      .then((res) => {
        dispatch(fetchSubUnit(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListPosition = () => {
    setAuthorizationHeader(`Bearer ${session.token}`);

    users
      .allPosition()
      .then((res) => {
        dispatch(fetchJabatan(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListDirektorat();
    getListPosition();
    getListSubUnit();
    getListUnit();
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }
  return (
    <>
      {isMobile && <InforekanMobile history={history} />}
      {isDesktop && <InforekanDekstop history={history} />}
    </>
  );
};

export default Inforekan;
