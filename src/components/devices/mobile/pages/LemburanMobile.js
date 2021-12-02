import { ClipboardCheckIcon } from '@heroicons/react/outline';
import CardOvertimeApproval from 'components/devices/desktop/molecules/CardOvertimeApproval';
import absensi from 'constants/api/absensi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLemburanMonthly,
  fetchLemburanToday,
  statusData,
} from 'store/actions/lemburan';
import Card from '../component/molecules/Card';
import CardFilterMonthAndYear from '../component/molecules/CardFilterMonthAndYear';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardKehadiranLemburan from '../component/molecules/CardKehadiranLemburan';
import CardLoading from '../component/molecules/CardLoading';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import LayoutMobile from '../LayoutMobile';

const LemburanMobile = ({ history }) => {
  const USER = useSelector((state) => state.users);
  const [temp, settemp] = useState({
    month: '',
    year: '',
  });
  const LEMBURAN = useSelector((state) => state.lemburan);
  const [lemburanByStatus, setlemburanByStatus] = useState({});
  const dispatch = useDispatch();

  const lemburanToday = async (id) => {
    dispatch(statusData('Loading'));
    return absensi
      .overtimeTodayPersonal({
        params: {
          user_id: id,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response;
      });
  };

  const handlerOnChange = (type, value) => {
    if (type === 'bulan') {
      settemp({
        month: value,
        year: temp.year,
      });
      getDataLemburan(value, temp.year);
    }

    if (type === 'tahun') {
      settemp({
        month: temp.month,
        year: value,
      });
      getDataLemburan(temp.month, value);
    }
  };

  const countType = (data, type) => {
    const countTypes = data.filter((item) => item.status === type);
    return countTypes.length;
  };

  const getDataLemburan = (month, year) => {
    dispatch(statusData('Loading'));

    absensi
      .overtimeListPersonal({
        params: {
          user_id: USER?.id,
          month: month,
          year: year,
          size: 32,
        },
      })
      .then((response) => {
        dispatch(fetchLemburanMonthly(response.data.data));
        setlemburanByStatus([
          {
            status: 'progress',
            total: countType(response.data.data, 'progress'),
          },
          {
            status: 'reject',
            total: countType(response.data.data, 'reject'),
          },
          {
            status: 'done',
            total: countType(response.data.data, 'done'),
          },
          {
            status: 'total',
            total: response.data.data.length,
          },
        ]);
      })
      .catch((err) => {
        console.error('error lemburan monthly', err.response);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    lemburanToday(USER?.id).then(function (response) {
      dispatch(fetchLemburanToday(response));
    });
    getDataLemburan();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  return (
    <LayoutMobile addClass="bg-warmGray-50 p-0 pb-0">
      <div className="px-4 pb-2 pt-4 -mt-4 -mx-4 relative">
        {/* Kehadiran  */}
        <CardKehadiranLemburan />
        {/* End Kehadiran  */}
      </div>
      <CardTitlePageMobile
        title="Lemburan"
        isBack={false}
        moreClass="absolute top-3 mx-2 inset-x-0"
      />

      {/* section review */}
      <div className="bg-gradient-to-b from-warmGray-50 to-warmGray-100 relative -mx-4 px-4 pb-6">
        {/* Section Filter Month and Year */}
        <CardFilterMonthAndYear border handlerOnChange={handlerOnChange} />
        {/* EndSection Filter Month and Year */}

        {/* Card Report Bulanan */}
        <Card>
          <CardHeadingMobile heading="Summary" />

          <div className="grid grid-cols-2 gap-4 pt-4">
            {lemburanByStatus.length > 0 &&
              lemburanByStatus.map((item) => (
                <div
                  key={Math.random()}
                  className="flex gap-2 bg-white rounded-lg p-3">
                  <span className="p-1 inline-flex justify-center items-center">
                    <ClipboardCheckIcon className="h-11 w-11 text-apps-login bg-warmGray-50 rounded-md p-2" />
                  </span>
                  <div className="relative">
                    <h1 className="font-light text-sm text-gray-600 mt-2 capitalize pl-1">
                      {item.status}
                    </h1>
                    <h1 className="font-semibold text-lg text-warmGray-800 pl-1">
                      {item.total}
                    </h1>
                  </div>
                </div>
              ))}
          </div>
        </Card>
        {/* End Card Report Bulanan */}

        {/* Section Card Report Overtime this Month */}
        <Card addClass="mt-10">
          <CardHeadingMobile heading="Document Review" />
          <CardHeadingMobile
            subheading={`Result : ${LEMBURAN.dataLemburanMonthly.length} Document`}
            navigation
            type="download"
          />
          <CardGridMobile>
            {LEMBURAN.status === 'idle' ? (
              <CardLoading />
            ) : LEMBURAN.dataLemburanMonthly.length > 0 ? (
              LEMBURAN.dataLemburanMonthly.map((data) => (
                <CardOvertimeApproval
                  key={Math.random()}
                  idOvertime={data.id}
                  date={data.detail_overtime?.[0]?.jam}
                  status={data.status}
                  title={data.subject}
                  timeIn={data.detail_overtime?.[0]?.jam}
                  timeOut={data.detail_overtime?.[1]?.jam}
                />
              ))
            ) : (
              <div className="flex p-4 justify-center items-center text-gray-600 font-medium text-sm">
                Data Kosong.
              </div>
            )}
          </CardGridMobile>
        </Card>
        {/* End Section Card Report Overtime this Month */}
      </div>
    </LayoutMobile>
  );
};

export default LemburanMobile;
