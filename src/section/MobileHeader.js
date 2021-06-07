/** @format */

import { LogoutIcon } from "@heroicons/react/outline";
import React from "react";
import { Redirect } from "react-router";
import notify from "helpers/hooks/toast";

export default function MobileHeader({ user, history }) {
  const logOoutUser = () => {
    notify("info", "Logout success 👋");
    // remove token
    localStorage.removeItem("WFM:token");
    // remove cookies
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // redirect link
    <Redirect push to="/login" />;
    // reload page
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2 items-center justify-center">
        <div className="relative">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="h-8 w-8" />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=0062FF&color=fff`}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col -gap-2">
          <h6 className="text-sm font-semibold text-apps-text transform capitalize">
            {user ? user.name.toLowerCase() : ""}
          </h6>
          <h6 className="text-xs font-medium text-apps-text text-opacity-40 transform uppercase">
            {user ? user.position.toLowerCase() : ""}
          </h6>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-apps-text text-opacity-40">
        <LogoutIcon
          className="h-5 w-5 cursor-pointer"
          onClick={() => logOoutUser()}
        />
        <p className="text-xs font-light">Logout</p>
      </div>
    </div>
  );
}
