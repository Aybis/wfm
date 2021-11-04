import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  XIcon,
} from '@heroicons/react/outline';
import CardOvertimeApproval from 'components/devices/desktop/molecules/CardOvertimeApproval';
import CardReportWork from 'components/devices/desktop/molecules/CardReportWork';
import absensi from 'constants/api/absensi';
import ToastHandler from 'helpers/hooks/toast';
import dataCeoMessages from 'json/dataCeoMessages';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isCheckIn,
  messagePresence,
  statusPresence,
} from 'store/actions/presence';
import Card from '../component/molecules/Card';
import CardFilterMonthAndYear from '../component/molecules/CardFilterMonthAndYear';
import CardGridMobile from '../component/molecules/CardGridMobile';
import CardHeadingMobile from '../component/molecules/CardHeadingMobile';
import CardKehadiranLemburan from '../component/molecules/CardKehadiranLemburan';
import CardScrollHorizontal from '../component/molecules/CardScrollHorizontal';
import CardTitlePageMobile from '../component/molecules/CardTitlePageMobile';
import LayoutMobile from '../LayoutMobile';

const LemburanMobile = ({ history }) => {
  const dataJson = dataCeoMessages;
  const ABSENSI = useSelector((state) => state.absensi);
  const USER = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const absenToday = () => {
    dispatch(statusPresence('loading'));

    absensi
      .dailyPersonal(USER?.id)
      .then((response) => {
        if (response.status === 200) {
          dispatch(isCheckIn(response.data));
        }
      })
      .catch((error) => {
        dispatch(messagePresence(error?.response?.data?.message ?? 'error'));
        ToastHandler('error', error?.response?.data?.message ?? 'error');
      });
  };

  const dataStatus = [
    {
      name: 'Progress',
      total: 12,
      color: 'text-yellow-400',
      icon: (
        <ClipboardListIcon className="text-apps-yellow bg-white rounded-md h-11 p-2" />
      ),
    },
    {
      name: 'Done',
      total: 12,
      color: 'text-apps-green',
      icon: (
        <ClipboardCheckIcon className="text-apps-green bg-white rounded-md h-11 p-2" />
      ),
    },
    {
      name: 'Reject',
      total: 12,
      color: 'text-apps-red',
      icon: <XIcon className="h-11  text-apps-red rounded-md bg-white p-2" />,
    },
  ];

  useEffect(() => {
    window.scroll(0, 0);
    absenToday();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, ABSENSI]);

  return (
    <LayoutMobile>
      <CardTitlePageMobile title="Lemburan" link={history.goBack} />

      {/* Kehadiran  */}
      <Card addClass="mb-12">
        <CardKehadiranLemburan />
      </Card>
      {/* End Kehadiran  */}

      {/* Section Filter Month and Year */}
      <CardFilterMonthAndYear />
      {/* EndSection Filter Month and Year */}

      <Card addClass="my-4">
        <CardHeadingMobile heading="Summary" />

        <div className="grid grid-cols-3 gap-3 mt-4 place-items-center">
          {dataStatus.map((item) => (
            <div className="flex gap-2" key={Math.random()}>
              {item.icon}
              <div className="flex flex-col">
                <p className="text-sm font-light text-gray-400">{item.name}</p>
                <h1 className="text-lg font-semibold text-gray-800">
                  {item.total}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Section Card Report Overtime this Month */}
      <Card addClass="hidden">
        <CardHeadingMobile heading="List Lemburan" />

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
      <Card addClass="mt-10">
        <CardHeadingMobile heading="Document Review" />

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
