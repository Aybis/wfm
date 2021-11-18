import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Slider from 'react-slick';
import CardHeadingMobile from './CardHeadingMobile';
import ModalImage from './ModalImage';

const SimpleCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [showModal, setshowModal] = useState(false);
  const [sourceImage, setsourceImage] = useState(null);
  const images = [
    `${process.env.PUBLIC_URL}/assets/images/1.jpeg`,
    `${process.env.PUBLIC_URL}/assets/images/2.jpeg`,
    `${process.env.PUBLIC_URL}/assets/images/3.jpeg`,
    `${process.env.PUBLIC_URL}/assets/images/4.png`,
  ];

  const handlerClickShowModalImage = (event, image) => {
    console.log(image);
    setsourceImage(image);
    setshowModal(true);
  };

  return (
    <div className="mb-12">
      <CardHeadingMobile heading="Headlines" />
      <ModalImage
        open={showModal}
        handlerClose={() => setshowModal(false)}
        src={sourceImage}
      />
      <Slider className="w-full flex gap-4  -mb-2 mt-4" {...settings}>
        {images.map((image) => (
          <motion.div
            onClick={(event) => handlerClickShowModalImage(event, image)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            key={Math.random()}
            className="rounded-lg p-2">
            <div className=" rounded-lg">
              <img
                alt={image}
                src={image}
                className="bg-black bg-opacity-5 w-full object-contain max-h-44 lg:max-h-full lg:h-108 rounded-md"
              />
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleCarousel;
