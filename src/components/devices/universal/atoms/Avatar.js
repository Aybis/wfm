import { LogoutIcon, UserIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Avatar({ logOut }) {
  const USER = useSelector((state) => state.users);
  const animation = {
    start: {
      y: '-10%',
    },
    end: {
      y: '0',
    },
  };

  const transition = {
    duration: 0.3,
  };

  const [show, setshow] = useState(false);

  return (
    <>
      <div className="flex justify-end w-1/5">
        {/* Code block starts */}
        <div
          className="flex justify-center items-center relative cursor-pointer"
          onClick={() => setshow(true)}
          onMouseEnter={() => setshow(true)}
          onMouseLeave={() => setshow(false)}>
          {show && (
            <motion.ul
              variants={animation}
              transition={transition}
              initial="start"
              animate="end"
              className="p-2 w-44 border-r bg-white absolute rounded z-40 right-0 shadow mt-14 top-0">
              <motion.li
                whileHover={{ fontWeight: 600 }}
                className="cursor-pointer text-gray-500 text-sm leading-3 tracking-normal py-2 hover:text-apps-primary focus:text-apps-primary focus:outline-none">
                <div className="flex items-center">
                  <UserIcon className="h-8 w-8 p-1" />
                  <span className="ml-2">My Profile</span>
                </div>
              </motion.li>
              <motion.li className="cursor-pointer text-gray-400 text-sm leading-3 tracking-normal mt-2 py-2 flex items-center focus:text-apps-primary focus:outline-none">
                <motion.div
                  whileHover={{ fontWeight: 600 }}
                  className="flex items-center gap-1 text-opacity-70 w-full"
                  onClick={logOut}>
                  <LogoutIcon className="h-8 w-8 p-1" />
                  <h4 className="text-base">Logout</h4>
                </motion.div>
              </motion.li>
            </motion.ul>
          )}

          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.2 }}
            className=" flex gap-4 items-center justify-center p-3 mr-4">
            {USER?.image_url ? (
              <img
                loading="lazy"
                height={10}
                width={10}
                src={USER?.image_url}
                alt="avatar"
                className="h-10 w-10 rounded"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${USER?.name}&background=0062FF&color=fff`}
                alt="avatar"
                loading="lazy"
                height={10}
                width={10}
                className="h-10 w-10 rounded-full"
              />
            )}
            <p className="text-apps-text dark:text-gray-100 capitalize font-medium ">
              {USER?.name?.toLowerCase()}
            </p>
          </motion.div>
        </div>
        {/* Code block ends */}
      </div>
    </>
  );
}
export default Avatar;
