import React from 'react';
import { isMobile } from 'react-device-detect';
import MobileHeader from './sections/MobileHeader';
import MobileMenu from './sections/MobileMenu';

export default function LayoutMobile({ children, isShow = false, addClass }) {
  return (
    isMobile && (
      <div className="relative w-full min-h-screen h-full bg-warmGray-100 pb-12">
        <div
          className={[
            'inset-y-0 inset-0 p-4 overflow-auto transition-all duration-300 ease-in-out',
            addClass ?? 'pb-14',
          ].join(' ')}>
          {isShow && (
            <>
              <MobileHeader />
              <MobileMenu />
            </>
          )}

          {children}
        </div>
      </div>
    )
  );
}
