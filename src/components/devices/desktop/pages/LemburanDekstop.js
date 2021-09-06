import CardFilterMonthAndYear from 'components/devices/mobile/component/molecules/CardFilterMonthAndYear';
import React, { lazy, Suspense } from 'react';
import LayoutDekstop from '../LayoutDekstop';
import CardContainer from '../molecules/CardContainer';
import CardGridDekstop from '../molecules/CardGridDekstop';
import CardOvertimeApproval from '../molecules/CardOvertimeApproval';
import CardReportWork from '../molecules/CardReportWork';
import FilterGroupingLemburanDekstop from '../molecules/FilterGroupingLemburanDekstop';
import TitlePageDesktop from '../molecules/TitlePageDesktop';

const CardMapCheck = lazy(() => import('../molecules/CardMapCheck'), 500);

const LemburanDekstop = ({ history }) => {
  const handlerOnChange = (type, value) => {
    // let month = type === 'bulan' ? value : convertDate('month');
    // let year = type === 'tahun' ? value : convertDate('fullYear');
  };

  return (
    <LayoutDekstop>
      <CardContainer>
        <TitlePageDesktop title="Lemburan" link={history.goBack} />
      </CardContainer>

      {/* Section Lemburan */}
      <CardContainer moreClass="-mt-16">
        <Suspense fallback={<p>Loading ....</p>}>
          <CardMapCheck />
        </Suspense>
      </CardContainer>
      {/* End Section Lembran */}

      {/* Section Filter Month */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} />
      {/* End Section Filter Month */}

      {/* Section Report Monthly */}
      <CardContainer
        heading="Report Overtime"
        subheading="Report Lemburan Bulan Ini">
        <CardGridDekstop moreClass="my-4 pt-4 lg:grid-cols-3 2xl:grid-cols-5">
          {Array.from({ length: 5 }).map((index) => (
            <CardReportWork
              key={Math.random()}
              status="Jam"
              name="Progress"
              day={20}
            />
          ))}
        </CardGridDekstop>
      </CardContainer>
      {/* Section End Report Monthly */}
      <CardContainer
        moreClass="-mt-16"
        heading="Report Progress Overtime"
        subheading="List Pengajuan Lemburan Bulanan">
        {/* Section Filter Grouping  */}
        <CardGridDekstop
          col={3}
          moreClass="my-8 justify-center items-center container mx-auto w-2/3 border-2 border-coolGray-200 divide-x-2 divide-coolGray-100 bg-white rounded-lg shadow-md">
          <FilterGroupingLemburanDekstop />
        </CardGridDekstop>
        {/* Section End Filter Grouping  */}

        <CardGridDekstop moreClass="my-4 pt-4 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 20 }).map((index) => (
            <CardOvertimeApproval
              key={Math.random()}
              date="Monday, 17 May"
              hours="5 : 23"
              name=""
              status="progress"
              title="Make design and flow mobile pop and create backend presensi online"
            />
          ))}
        </CardGridDekstop>
      </CardContainer>
      {/* Section End Report Monthly */}
    </LayoutDekstop>
  );
};

export default LemburanDekstop;
