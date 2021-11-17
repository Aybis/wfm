import React, { Component } from 'react';
import Slider from 'react-slick';

export default class SimpleCarousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: false,
      prevArrow: false,
    };
    return (
      <div className="mx-5 hidden">
        <h2 className="-mx-2"> Single Item</h2>
        <Slider className="w-full flex gap-4 mx-2" {...settings}>
          <div className="rounded-lg p-2">
            <div className="bg-red-200 p-4 rounded-lg">
              <h3>1</h3>
            </div>
          </div>
          <div className="rounded-lg p-2">
            <div className="bg-blue-200 p-4 rounded-lg">
              <h3>2</h3>
            </div>
          </div>
          <div className="rounded-lg p-2">
            <div className="bg-yellow-200 p-4 rounded-lg">
              <h3>3</h3>
            </div>
          </div>
          <div className="rounded-lg p-2">
            <div className="bg-indigo-200 p-4 rounded-lg">
              <h3>4</h3>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
