import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import CardMessages from 'components/molecules/CardMessages';
import React, { createRef, useState } from 'react';
import HeadingMobile from '../atoms/HeadingMobile';
import SubHeadingMobile from '../atoms/SubHeadingMobile';

const datas = [0, 1, 2, 3, 4, 5];

export default function CardCarouselMobile() {
  // We will start by storing the index of the current image in the state.
  const [currentShow, setCurrentShow] = useState(0);

  // We are using react ref to 'tag' each of the images. Below will create an array of
  // objects with numbered keys. We will use those numbers (i) later to access a ref of a
  // specific image in this array.
  const refs = datas.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToData = (i) => {
    // First let's set the index of the image we want to see next
    setCurrentShow(i);
    // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
    // we can then use built-in scrollIntoView API to do eaxactly what it says on the box - scroll it into
    // your current view! To do so we pass an index of the image, which is then use to identify our current
    // image's ref in 'refs' array above.
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: 'smooth',
      //      Defines vertical alignment.
      block: 'nearest',
      //      Defines horizontal alignment.
      inline: 'start',
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalData = datas.length;

  // Below functions will assure that after last image we'll scroll back to the start,
  // or another way round - first to last in previousImage method.
  const next = () => {
    if (currentShow >= totalData - 1) {
      scrollToData(0);
    } else {
      scrollToData(currentShow + 1);
    }
  };

  const previous = () => {
    if (currentShow === 0) {
      scrollToData(totalData - 1);
    } else {
      scrollToData(currentShow - 1);
    }
  };

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  const arrowStyle =
    'flex text-white text-2xl bg-white h-8 w-8 lg:h-12 lg:w-12 rounded-md opacity-75 items-center justify-center shadow-md';

  // Let's create dynamic buttons. It can be either left or right. Using
  // isLeft boolean we can determine which side we'll be rendering our button
  // as well as change its position and content.
  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previous : next}
      className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
      style={{ top: '50%' }}>
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? (
          <ChevronLeftIcon className="text-apps-primary h-8 w-8 lg:h-12 lg:w-12 p-1" />
        ) : (
          <ChevronRightIcon className="text-apps-primary h-8 w-8 lg:h-12 lg:w-12 p-1" />
        )}
      </span>
    </button>
  );

  return (
    <div className="relative mt-8 lg:mt-24 border-b border-gray-200 lg:pb-8 pb-2">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="w-full">
            <HeadingMobile heading="CEO Messages" />
            <SubHeadingMobile subheading="Most importantly notice position absolute." />
          </div>
          <div className="flex gap-4 justify-end">
            {sliderControl(true)}
            {sliderControl()}
          </div>
        </div>
        <ul className="flex overflow-x-auto hidden-scroll pl-4 -mt-4 py-5">
          {datas.map((img, i) => (
            <li
              key={i}
              ref={refs[i]}
              className="pr-6 transition-all transform hover:scale-105 motion-reduce:transform-non group duration-300 ease-in-out">
              <CardMessages />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
