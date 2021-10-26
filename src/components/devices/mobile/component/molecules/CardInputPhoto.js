import { UserCircleIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import React from 'react';

export default function CardInputPhoto({
  photo,
  handlerChangPhoto,
  typePhoto,
}) {
  return (
    <motion.div whileTap={{ scale: 0.85 }} className="flex flex-col text-sm">
      <label htmlFor="image" className="text-gray-500 font-semibold rounded-lg">
        {/* Photo */}
        {photo ? (
          <img
            src={photo}
            alt="file"
            className={`rounded-lg cursor-pointer w-24 bg-gray-100 mb-4 object-center object-cover ${
              typePhoto === 'profile' ? 'h-24 shadow-lg rounded-lg' : 'h-24'
            }`}
          />
        ) : (
          <div className="fle flex-col justify-center items-center">
            <UserCircleIcon
              tabIndex="0"
              className="h-24 w-24 rounded-lg bg-gray-100 text-gray-400 p-2 cursor-pointer pb-12"
            />
            <p className="text-xs text-gray-400 -mt-8 ml-4 font-medium">
              Take a Selfie
            </p>
          </div>
        )}
      </label>
      {typePhoto === 'profile' ? (
        <input
          type="file"
          name="image"
          accept="image/*"
          id="image"
          className="hidden rounded-lg"
          onChange={handlerChangPhoto}
        />
      ) : (
        <input
          type="file"
          name="image"
          accept="image/*"
          capture="camera"
          id="image"
          className="hidden rounded-lg"
          onChange={handlerChangPhoto}
        />
      )}
    </motion.div>
  );
}
