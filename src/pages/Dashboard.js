import Menu from 'components/devices/desktop/section/Menu';
import MobileMenu from 'components/devices/mobile/sections/MobileMenu';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import convertDate from 'helpers/hooks/convertDate';
import ToastHandler from 'helpers/hooks/toast';
import React, { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import {
  fetchDirektorat,
  fetchKehadiran,
  fetchKehadiranBulanan,
  fetchSatelit,
  fetchTerlambat,
  fetchTidakHadir,
  fetchUnit,
  fetchWfh,
  fetchWfo,
  messageData,
  statusData,
} from 'store/actions/dashboard';
import Bulanan from './subdashboard/Bulanan';
import Harian from './subdashboard/Harian';
import Karyawan from './subdashboard/Karyawan';
import Lemburan from './subdashboard/Lemburan';

const Dashboard = () => {
  const [didMount, setDidMount] = useState(false);
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();

  const tabs = [
    { name: 'Daily', href: `${url}` },
    { name: 'Monthly', href: `${url}/bulanan` },
    { name: 'Karyawan', href: `${url}/karyawan` },
    { name: 'Lemburan', href: `${url}/lemburan` },
  ];

  const getDataDashboard = () => {
    dispatch(statusData('loading'));
    absensi
      .dashboard()
      .then((res) => {
        dispatch(fetchKehadiran(res.data.kehadiran));
        dispatch(fetchDirektorat(res.data.dir));
        dispatch(fetchUnit(res.data.unit));
        dispatch(fetchTidakHadir(res.data.kehadiran.tidak_hadir.users));
        dispatch(fetchTerlambat(res.data.kehadiran.telat.users));
        dispatch(fetchWfh(res.data.kehadiran.wfh.users));
        dispatch(fetchWfo(res.data.kehadiran.wfo.users));
        dispatch(fetchSatelit(res.data.kehadiran.satelit.users));
        dispatch(messageData('ok'));
      })
      .catch((error) => {
        dispatch(messageData(error?.response?.data?.message ?? 'error'));
        ToastHandler('error', error?.response?.data?.message ?? 'error');
      });
  };

  const dashboardMonthly = (month, year) => {
    absensi
      .dashboardMonthly({
        params: {
          month: month ?? convertDate('month'),
          year: year ?? convertDate('fullYear'),
        },
      })
      .then((response) => {
        dispatch(fetchKehadiranBulanan(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataDashboard();
    setDidMount(true);
    dashboardMonthly();
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen h-full bg-warmGray-100 pb-28 md:pb-10 overflow-auto hidden-scroll">
      <div
        className={`container mx-auto  rounded-xl p-4 lg:p-0 transition-all duration-300 ease-in-out hidden-scroll ${
          isDesktop && 'mt-28'
        }`}>
        <Menu />
        <MobileMenu />
        <Router>
          <div className="relative mt-2 lg:mt-20">
            <h1 className="text-gray-700 lg:text-4xl text-2xl font-semibold">
              Dashboard
            </h1>
          </div>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mt-8 lg:w-1/2 lg:mx-auto ">
            <div className="bg-coolGray-200 p-2 rounded-lg lg:bg-transparent">
              <div className="group transition-all duration-300  border-gray-200">
                <motion.nav
                  className={`flex lg:grid lg:grid-cols-${tabs.length} gap-4`}
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

          {/* React Router */}
          <Switch>
            <Route exact path={path}>
              <Harian />
            </Route>
            <Route exact path={`${path}/bulanan`}>
              <Bulanan />
            </Route>
            <Route exact path={`${path}/karyawan`}>
              <Karyawan />
            </Route>
            <Route exact path={`${path}/lemburan`}>
              <Lemburan />
            </Route>
          </Switch>
          {/* End React Router */}
        </Router>
      </div>
    </div>
  );
};

export default Dashboard;
