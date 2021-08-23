import DesktopHome from 'devices/desktop/pages/HomePage';
import MobileHome from 'devices/mobile/pages/HomePage';
import React from 'react';
import { isDesktop, isMobile } from 'react-device-detect';

const Home = () => {
  return (
    <>
      {isMobile && <MobileHome />}
      {isDesktop && <DesktopHome />}
    </>
  );
};

export default Home;
