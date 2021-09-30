import React from 'react';
import { isDesktop } from 'react-device-detect';
import Menu from './section/Menu';

export default function LayoutDekstop({ children, moreClass }) {
  return (
    isDesktop && (
      <div
        className={[
          `relative w-full min-h-screen h-full bg-warmGray-100 pb-4`,
          moreClass,
        ].join(' ')}>
        <div className="inset-y-0 inset-0 rounded-xl pt-20 overflow-auto transition-all duration-300 ease-in-out pb-4">
          <Menu />
          <div className="relative">{children}</div>
        </div>
      </div>
    )
  );
}
