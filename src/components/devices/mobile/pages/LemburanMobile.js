import React from 'react';
import Card from '../component/molecules/Card';
import CardFilterMonthAndYear from '../component/molecules/CardFilterMonthAndYear';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardKehadiran from '../component/molecules/CardKehadiran';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import LayoutMobile from '../LayoutMobile';

const LemburanMobile = ({ history }) => {
  return (
    <LayoutMobile>
      <CardTitlePageMobile title="Lemburan" link={history.goBack} />

      {/* Kehadiran  */}
      <Card>
        <CardKehadiran type="lemburan" />
      </Card>
      {/* End Kehadiran  */}

      {/* Section Filter Month and Year */}
      <CardFilterMonthAndYear />
      {/* EndSection Filter Month and Year */}

      {/* Section Card Report Overtime this Month */}
      <Card>
        <CardHeadingMobile
          heading="Report Overtime Monthly"
          subheading="List Data Lemburan Bulan Ini"
        />
        {/* {
          Array.from({ length: 5 }).map((index) => (
          ))
        } */}
      </Card>
      {/* End Section Card Report Overtime this Month */}
    </LayoutMobile>
  );
};

export default LemburanMobile;
