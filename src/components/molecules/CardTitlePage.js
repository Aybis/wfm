/** @format */

import Back from "components/atoms/Back";
import React from "react";

export default function CardTitlePage({ goBack, title }) {
  return (
    <div className="flex justify-between items-center text-center py-2 ">
      <div className="flex">
        <Back link={goBack} />
      </div>
      <div className="flex">
        <h1 className="text-xl font-semibold text-apps-text tracking-wider uppercase">
          {title}
        </h1>
      </div>
      <div className="p-2"></div>
    </div>
  );
}
