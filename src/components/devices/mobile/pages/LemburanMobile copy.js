import React from 'react';
import Card from '../component/molecules/Card';
import CardFilterMonthAndYear from '../component/molecules/CardFilterMonthAndYear';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardKehadiran from '../component/molecules/CardKehadiran';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import LayoutMobile from '../LayoutMobile';
import dataCeoMessages from 'json/dataCeoMessages';
import CardReportWork from 'components/devices/desktop/molecules/CardReportWork';
import CardOvertimeApproval from 'components/devices/desktop/molecules/CardOvertimeApproval';
import CardGridMobile from '../component/molecules/CardGridMobile';

const LemburanMobile = ({ history }) => {
  const dataJson = dataCeoMessages;
  return (
    <LayoutMobile>
      <CardTitlePageMobile title="Lemburan" isBack={false} />

      {/* Kehadiran  */}
      <Card addClass="mb-12">
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
          subheading="List Data Lemburan Bulanan"
        />

        <CardScrollHorizontal>
          {dataJson.dataLemburan.map((data) => (
            <CardReportWork
              key={Math.random()}
              day={data.value}
              name={data.name}
              status={data.type}
            />
          ))}
        </CardScrollHorizontal>
      </Card>
      {/* End Section Card Report Overtime this Month */}

      {/* Section Card Report Overtime this Month */}
      <Card>
        <CardHeadingMobile
          heading="Document Review"
          subheading="List Pengajuan Lemburan Bulanan"
        />

        <CardGridMobile>
          {dataJson.documentLemburan.map((data) => (
            <CardOvertimeApproval
              key={Math.random()}
              date={data.date}
              hours={data.time}
              status={data.status}
              title={data.title}
            />
          ))}
        </CardGridMobile>
      </Card>
      {/* End Section Card Report Overtime this Month */}
    </LayoutMobile>
  );
};

export default LemburanMobile;
