import PresensiDesktop from 'components/devices/desktop/pages/PresensiDesktop';
import PresensiMobile from 'components/devices/mobile/pages/PresensiMobile';
import React, { useEffect, useState } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';

const Presensi = ({ history }) => {
  const [didMount, setdidMount] = useState(false);
  useEffect(() => {
    setdidMount(true);
    return () => setdidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <>
      {isMobile && <PresensiMobile history={history} />}
      {isDesktop && <PresensiDesktop history={history} />}
    </>
  );
};

export default Presensi;
