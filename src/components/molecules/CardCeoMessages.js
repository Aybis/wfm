import React from 'react';

export default function CardCeoMessages() {
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };
  const arrowStyle =
    'absolute text-white text-2xl z-10 bg-white h-8 w-8 lg:h-12 lg:w-12 rounded-full opacity-75 flex items-center justify-center';
  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
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

  return <div></div>;
}
