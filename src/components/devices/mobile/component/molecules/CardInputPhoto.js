import { UserCircleIcon } from '@heroicons/react/solid';
import React from 'react';

export default function CardInputPhoto({ photo, handlerChangPhoto }) {
  return (
    <div className="flex flex-col gap-2 text-sm my-4">
      <label htmlFor="image" className="text-gray-500 font-semibold rounded-lg">
        Photo
        {photo ? (
          <img
            src={photo}
            alt="file"
            className="rounded-lg cursor-pointer mt-2 h-full object-cover w-full bg-gray-100 mb-4"
          />
        ) : (
          <UserCircleIcon
            tabIndex="0"
            className="h-64 w-full rounded-lg bg-gray-100 text-gray-400 p-2 cursor-pointer mt-2 pb-12"
          />
        )}
      </label>

      <input
        type="file"
        name="image"
        accept="image/*"
        capture="camera"
        id="image"
        className="hidden rounded-lg"
        onChange={handlerChangPhoto}
      />
    </div>
  );
}
