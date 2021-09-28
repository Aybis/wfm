import { DownloadIcon } from '@heroicons/react/outline';
import React from 'react';
import HeadingMobile from '../atoms/HeadingMobile';
import SubHeadingMobile from '../atoms/SubHeadingMobile';

export default function CardHeadingMobile({
  heading,
  subheading,
  navigation,
  link,
  type,
}) {
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="flex flex-col">
        <HeadingMobile heading={heading} />
        <SubHeadingMobile subheading={subheading} />
      </div>
      {navigation && (
        <a
          href={link}
          className="cursor-pointer text-sm text-apps-primary tracking-wide flex gap-1">
          {type === 'download' ? (
            <span className="flex gap-1">
              <DownloadIcon className="h-4 w-4 " />
              Download
            </span>
          ) : (
            'more'
          )}
        </a>
      )}
    </div>
  );
}
