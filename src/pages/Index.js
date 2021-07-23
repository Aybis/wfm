import Loading from 'components/atoms/Loading';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from 'section/Header';
import Menu from 'section/Menu';
import MobileHeader from 'section/MobileHeader';
import MobileMenu from '../section/MobileMenu';
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
  let location = useLocation();

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
      <TransitionGroup className="fixed inset-y-0 lg:left-36 mb-4 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-24">
        <Menu />
        <Header user={user} />
        <CSSTransition
          key={location.key}
          classNames="fade relative mb-10 overflow-auto"
          timeout={300}>
          <Switch>
            <Route exact path="/">
              <MobileHeader user={user} />
              <Home user={user} />
              <MobileMenu />
            </Route>
            <Route exact path="/approval" component={Approval}></Route>
            <Route exact path="/modules" component={Modules}></Route>
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
        </CSSTransition>
      </TransitionGroup>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-dark">
      <Loading />
    </div>
  );
};

export default Index;
