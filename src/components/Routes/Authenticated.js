/** @format */

import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const Authenticated = ({
  component: Component,
  match,
  path,
  location,
  ...rest
}) => {
  const ok = localStorage.getItem("WFM:token");
  localStorage.removeItem("WFM:redirect");

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? (
          <Component {...props} />
        ) : path === "/" ? (
          <Redirect to={`/login?path=${location.pathname}`} />
        ) : (
          <Redirect to={`/login?path=${location.pathname}`} />
        )
      }
    />
  );
};

export default withRouter(Authenticated);
