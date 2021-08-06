import LoadingCircle from 'components/atoms/LoadingCircle';
import React, { useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';
import Menu from 'section/Menu';
import Approval from './Approval';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import Dashboard from './Dashboard';
import DetailApproval from './DetailApproval';
import Home from './Home';
import Inforekan from './Inforekan';
import Modules from './Modules';
import Overtime from './Overtime';
import OvertimeIn from './OvertimeIn';
import OvertimeOut from './OvertimeOut';
import Presensi from './Presensi';

const Index = () => {
  const [user, setUser] = useState(() => null);

  useEffect(() => {
    const userCookies =
      decodeURIComponent(window.document.cookie)
        ?.split(';')
        ?.find?.((item) => item.indexOf('WFM:user') > -1)
        ?.split('=')[1] ?? null;

    setUser(userCookies ? JSON.parse(userCookies) : null);
  }, []);

  return user ? (
    <div className="relative w-full h-screen bg-coolGray-100">
      <div
        className={`container mx-auto fixed inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-20 hidden-scroll ${
          isDesktop && 'mt-24'
        }`}>
        {/* Menu For Dekstop Only */}
        <Menu user={user} />
        <Switch>
          <Route exact path="/">
            <Home user={user} />
          </Route>
          <Route exact path="/approval" component={Approval}></Route>
          <Route exact path="/modules">
            <Modules user={user} />
          </Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/details" component={DetailApproval}></Route>
          <Route exact path="/inforekan" component={Inforekan}></Route>
          <Route exact path="/presensi" component={Presensi}></Route>
          <Route exact path="/check-in" component={CheckIn}></Route>
          <Route exact path="/check-out/:id" component={CheckOut}></Route>
          <Route exact path="/overtime" component={Overtime}></Route>
          <Route exact path="/overtime-in" component={OvertimeIn}></Route>
          <Route exact path="/overtime-out" component={OvertimeOut}></Route>
        </Switch>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-dark">
      <LoadingCircle />
    </div>
  );
};

export default Index;
