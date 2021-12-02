import Menu from 'components/devices/desktop/section/Menu';
import MobileMenu from 'components/devices/mobile/sections/MobileMenu';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';
import {
  NavLink,
  Route,
  Router,
  Switch,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import Cuti from './subApproval/Cuti';
import Lemburan from './subApproval/Lemburan';
import Reimburse from './subApproval/Reimburse';
import Sppd from './subApproval/Sppd';

const Approval = ({ history }) => {
  let { path, url } = useRouteMatch();
  const USER = useSelector((state) => state.users);
  const [flagApproval, setflagApproval] = useState({
    lemburan: 0,
    reimburse: 0,
    cuti: 0,
    sppd: 0,
  });

  const tabs = [
    { name: 'Lemburan', href: `${url}`, notif: flagApproval.lemburan ?? 0 },
    {
      name: 'Reimburse',
      href: `${url}/reimburse`,
      notif: flagApproval.reimburse ?? 0,
    },
    { name: 'Cuti', href: `${url}/cuti`, notif: flagApproval.cuti ?? 0 },
    { name: 'SPPD', href: `${url}/sppd`, notif: flagApproval.sppd ?? 0 },
  ];

  const getListLemburanByApproval = async (username) => {
    return absensi
      .overtimeListApproval({
        params: {
          username: username,
          month: 'all',
          size: 100,
        },
      })
      .then((res) => {
        let filterData = res.data.data.filter(
          (item) => item.status === 'progress',
        );
        return filterData.length;
      })
      .catch((err) => {
        return err.response;
      });
  };

  // console.log(flagApproval);

  useEffect(() => {
    getListLemburanByApproval(USER?.username)
      .then(function (result) {
        setflagApproval({
          lemburan: result,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-screen bg-warmGray-100">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-24'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu />
        <MobileMenu />
        <Router history={history}>
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
            <div className="lg:bg-coolGray-200 rounded-lg lg:bg-transparent -mx-4 px-4">
              <div className="group transition-all duration-300  border-red-100">
                <motion.nav
                  className="-mb-px flex lg:grid lg:grid-cols-4 gap-3 overflow-x-auto pb-4"
                  aria-label="Tabs">
                  {tabs.map((tab) => (
                    <NavLink
                      exact={true}
                      key={tab.name}
                      to={tab.href}
                      activeClassName="text-gray-900 border-b-2 border-apps-primary lg:border-apps-primary lg:border-b-2 font-semibold lg:bg-coolGray-50 lg:bg-transparent lg:shadow-none transition-all duration-300"
                      className={
                        'flex gap-1 justify-center items-center text-gray-400 w-full p-2 lg:p-4 text-center lg:text-lg text-sm hover:text-gray-900 lg:hover:bg-white transition-all duration-300 lg:border-b-2 lg:border-gray-200 lg:rounded-none'
                      }>
                      {tab.name}
                      {tab.notif > 0 && (
                        <span className=" bg-red-500 top-0  h-4 w-4 rounded-full text-xs flex items-center justify-center text-white">
                          {tab.notif}
                        </span>
                      )}
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

export default withRouter(Approval);
