import React from 'react';

export default function MobileOnly({ link }) {
  return (
    <div className="hiddden container lg:flex flex-col gap-4 justify-center items-center h-screen transition-all duration-300 ease-in-out">
      <h1 className="text-4xl font-semibold -mt-8">
        Maaf halaman ini hanya dapat diakses melalui smartphone
      </h1>
      <button className="text-xl underline text-blue-600" onClick={link}>
        Kembali
      </button>
    </div>
  );
}
