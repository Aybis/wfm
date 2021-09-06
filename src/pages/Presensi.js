import PresensiDesktop from 'components/devices/desktop/pages/PresensiDesktop';
import PresensiMobile from 'components/devices/mobile/pages/PresensiMobile';
import React from 'react';
import { isDesktop, isMobile } from 'react-device-detect';

const Presensi = ({ history }) => {
  return (
    <>
      {isMobile && <PresensiMobile history={history} />}
      {isDesktop && <PresensiDesktop history={history} />}
    </>
  );
};

export default Presensi;
