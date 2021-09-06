import LemburanDekstop from 'components/devices/desktop/pages/LemburanDekstop';
import LemburanMobile from 'components/devices/mobile/pages/LemburanMobile';
import React from 'react';
import { isDesktop, isMobile } from 'react-device-detect';

export default function Overtime({ history }) {
  window.scroll(0, 0);

  return (
    <>
      {isMobile && <LemburanMobile history={history} />}
      {isDesktop && <LemburanDekstop history={history} />}
    </>
  );
}
