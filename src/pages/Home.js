import HomePage from 'components/devices/desktop/pages/HomePage';
import MobileHome from 'components/devices/mobile/pages/HomePage';
import React from 'react';
import { isDesktop, isMobile } from 'react-device-detect';

const Home = () => {
  return (
    <>
      {isMobile && <MobileHome />}
      {isDesktop && <HomePage />}
    </>
  );
};

export default Home;
