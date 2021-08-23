import React from 'react';
import Menu from './section/Menu';

export default function LayoutDekstop({ children }) {
  return (
    <div className="relative w-full min-h-screen h-full bg-coolGray-100 pb-4">
      <div className="inset-y-0 inset-0 rounded-xl pt-20 overflow-auto transition-all duration-300 ease-in-out pb-4">
        <Menu />

        {children}
      </div>
    </div>
  );
}
