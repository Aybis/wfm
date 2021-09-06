import InforekanDekstop from 'components/devices/desktop/pages/InforekanDekstop';
import InforekanMobile from 'components/devices/mobile/pages/InforekanMobile';
import React from 'react';
import { isDesktop, isMobile } from 'react-device-detect';

const Inforekan = ({ history }) => {
  return (
    <>
      {isMobile && <InforekanMobile history={history} />}
      {isDesktop && <InforekanDekstop history={history} />}
    </>
  );
};

export default Inforekan;
