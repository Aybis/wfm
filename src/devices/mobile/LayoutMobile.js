import React from 'react';
import MobileHeader from './sections/MobileHeader';
import MobileMenu from './sections/MobileMenu';

export default function LayoutMobile({ children, isShow = false }) {
  return (
    <div className="relative w-full min-h-screen h-full bg-coolGray-100 pb-12">
      <div className="inset-y-0 inset-0 rounded-xl p-4 overflow-auto transition-all duration-300 ease-in-out pb-14">
        {isShow && (
          <>
            <MobileHeader />
            <MobileMenu />
          </>
        )}

        {children}
      </div>
    </div>
  );
}
