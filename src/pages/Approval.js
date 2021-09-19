import Menu from 'components/devices/desktop/section/Menu';
import MobileMenu from 'components/devices/mobile/sections/MobileMenu';
import { motion } from 'framer-motion';
import React from 'react';
import { isDesktop } from 'react-device-detect';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import Cuti from './subApproval/Cuti';
import Lemburan from './subApproval/Lemburan';
import Reimburse from './subApproval/Reimburse';
import Sppd from './subApproval/Sppd';

const Approval = () => {
  window.scroll(0, 0);
  let { path, url } = useRouteMatch();

  const tabs = [
    { name: 'Lemburan', href: `${url}` },
    { name: 'Reimburse', href: `${url}/reimburse` },
    { name: 'Cuti', href: `${url}/cuti` },
    { name: 'SPPD', href: `${url}/sppd` },
  ];

  return (
    <div className="relative w-full h-screen bg-coolGray-100">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-24'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        <MobileMenu />
        <Router>
          <div className="relative">
            <h2 className="text-gray-700 font-semibold text-2xl lg:text-4xl mt-8 lg:mt-0">
              List Dokumen Approval
            </h2>
          </div>
          {/* Tab Menu */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mt-8 lg:w-1/2 lg:mx-auto ">
            <div className="bg-coolGray-200 p-2 rounded-lg lg:bg-transparent">
              <div className="group transition-all duration-300  border-gray-200">
                <motion.nav
                  className="-mb-px flex lg:grid lg:grid-cols-4 gap-4"
                  aria-label="Tabs">
                  {tabs.map((tab) => (
                    <NavLink
                      exact={true}
                      key={tab.name}
                      to={tab.href}
                      activeClassName="text-apps-primary lg:border-apps-primary lg:border-b-2 font-semibold bg-coolGray-50 lg:bg-transparent rounded-lg lg:rounded-none shadow-lg lg:shadow-none transition-all duration-300"
                      className={
                        'text-gray-400 w-full p-2 lg:p-4 text-center lg:text-lg text-sm hover:text-apps-primary hover:bg-white transition-all duration-300 rounded-lg lg:border-b-2 lg:border-gray-200 lg:rounded-none'
                      }>
                      {tab.name}
                    </NavLink>
                  ))}
                </motion.nav>
              </div>
            </div>
          </motion.div>

          {/* End Tab Menu  */}

          {/* React Router */}
          <Switch>
            <Route exact path={path}>
              <Lemburan />
            </Route>
            <Route exact path={`${path}/reimburse`}>
              <Reimburse />
            </Route>
            <Route exact path={`${path}/cuti`}>
              <Cuti />
            </Route>
            <Route exact path={`${path}/sppd`}>
              <Sppd />
            </Route>
          </Switch>
          {/* End React Router */}
        </Router>
      </div>
    </div>
  );
};

export default Approval;
