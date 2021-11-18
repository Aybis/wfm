import { BellIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import StaticProfile from '../pages/StaticProfile';

export default function MobileHeader() {
  const [showStaticSidebar, setshowStaticSidebar] = useState(false);

  return (
    isMobile && (
      <div className="flex justify-between items-center mb-8 transition-all duration-300 ease-in-out">
        <motion.div
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          className="flex gap-3 items-center justify-center"
          onClick={() => setshowStaticSidebar(true)}>
          <MenuAlt2Icon className="h-8 w-8  text-warmGray-600" />
        </motion.div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-gray-400">
            <BellIcon className="h-8 w-8 rounded-md cursor-pointer p-1" />
          </div>
        </div>
        <StaticProfile
          isOpen={showStaticSidebar}
          handlerClose={() => setshowStaticSidebar(false)}
        />
      </div>
    )
  );
}
