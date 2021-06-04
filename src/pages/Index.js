/** @format */
import Loading from "components/atoms/Loading";
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Approval from "./Approval";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import Dashboard from "./Dashboard";
import DetailApproval from "./DetailApproval";
import Home from "./Home";
import Modules from "./Modules";
import Overtime from "./Overtime";
import OvertimeIn from "./OvertimeIn";
import OvertimeOut from "./OvertimeOut";
import Presensi from "./Presensi";

const Index = () => {
  const [user, setUser] = useState(() => null);
  let location = useLocation();

  useEffect(() => {
    const userCookies =
      decodeURIComponent(window.document.cookie)
        ?.split(";")
        ?.find?.((item) => item.indexOf("WFM:user") > -1)
        ?.split("=")[1] ?? null;

    setUser(userCookies ? JSON.parse(userCookies) : null);
  }, []);

  return user ? (
    <>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Switch>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route exact path="/approval" component={Approval}></Route>
            <Route exact path="/modules" component={Modules}></Route>
            <Route exact path="/approval" component={Approval}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
            <Route exact path="/details" component={DetailApproval}></Route>
            <Route exact path="/check-in" component={CheckIn}></Route>
            <Route exact path="/check-out" component={CheckOut}></Route>
            <Route exact path="/presensi" component={Presensi}></Route>
            <Route exact path="/overtime" component={Overtime}></Route>
            <Route exact path="/overtime-in" component={OvertimeIn}></Route>
            <Route exact path="/overtime-out" component={OvertimeOut}></Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  ) : (
    <div className="flex justify-center items-center h-screen bg-dark">
      <Loading />
    </div>
  );
};

export default Index;
