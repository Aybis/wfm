/** @format */
import Loading from "components/atoms/Loading";
import Approval from "pages/Approval";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Modules from "pages/Modules";
import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MobileMenu from "section/MobileMenu";

const LayoutMobile = () => {
  let { path } = useRouteMatch();
  const [user, setUser] = useState(() => null);

  useEffect(() => {
    const userCookies =
      decodeURIComponent(window.document.cookie)
        ?.split(";")
        ?.find?.((item) => item.indexOf("WFM:user") > -1)
        ?.split("=")[1] ?? null;

    setUser(userCookies ? JSON.parse(userCookies) : null);
  }, []);

  return user ? (
    <div className="relative bg-gray-50 min-h-screen h-full">
      <MobileMenu />

      <Switch>
        <Route exact path={path}>
          <Home user={user} />
        </Route>
        <Route path="/modules" component={Modules}></Route>
        <Route path="/approval" exact component={Approval}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-dark">
      <Loading />
    </div>
  );
};

export default LayoutMobile;
