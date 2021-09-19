/** @format */

import React from 'react';

export default function NotFound({ history }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-coolGray-50">
      <div className="text-apps-red text-xl font-semibold">404 NOT FOUND</div>
      <button
        onClick={history.goBack}
        className="text-lg text-apps-primary underline font-semibold">
        Kembali
      </button>
    </div>
  );
}
