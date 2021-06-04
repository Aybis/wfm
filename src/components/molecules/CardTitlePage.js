/** @format */

import Back from "components/atoms/Back";
import React from "react";

export default function CardTitlePage({ goBack, title }) {
  return (
    <div className="flex justify-between items-center text-center py-2 ">
      <div className="flex w-1/3">
        <Back link={goBack} />
      </div>
      <div className="flex w-2/3">
        <h1 className="text-xl font-semibold text-gray-800 tracking-wider uppercase">
          {title}
        </h1>
      </div>
    </div>
  );
}
