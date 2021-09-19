import CardFilterMonthAndYear from 'components/devices/mobile/component/molecules/CardFilterMonthAndYear';
import React from 'react';

export default function Sppd() {
  const handlerOnChange = (type, value) => {
    console.log(value);
  };
  return (
    <div>
      {/* Start Filter Month And Year  */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} />
      {/* End Filter Month And Year  */}
      <div className="relative text-xl font-semibold text-blue-600 my-4">
        SPPD Page
      </div>
    </div>
  );
}
