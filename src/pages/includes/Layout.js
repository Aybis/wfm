/** @format */
import Loading from "components/atoms/Loading";
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { Route, Router, Switch, useRouteMatch } from "react-router-dom";
import MobileMenu from "section/MobileMenu";
import Approval from "./Approval";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Modules from "./Modules";

const Layout = () => {
  let { path } = useRouteMatch();

  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

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
    <Router history={history}>
      <div className="relative bg-gray-50 min-h-screen h-full">
        <Switch>
          <Route exact path={path}>
            <Home user={user} />
          </Route>
          <Route path="/modules" component={Modules}></Route>
          <Route path="/approval" exact component={Approval}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
        </Switch>
        <MobileMenu />
      </div>
    </Router>
  ) : (
    <div className="flex justify-center items-center h-screen bg-dark">
      <Loading />
    </div>
  );
};

export default Layout;
