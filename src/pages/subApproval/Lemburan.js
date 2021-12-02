import CardOvertimeApproval from 'components/devices/desktop/molecules/CardOvertimeApproval';
import CardFilterMonthAndYear from 'components/devices/mobile/component/molecules/CardFilterMonthAndYear';
import CardLoading from 'components/devices/mobile/component/molecules/CardLoading';
import absensi from 'constants/api/absensi';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchLemburanByApproval } from 'store/actions/lemburan';

const Lemburan = () => {
  const LEMBURAN = useSelector((state) => state.lemburan);
  const USER = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [temp, settemp] = useState({
    month: '',
    year: '',
  });

  const getDataLemburanByUser = async (username, month, year) => {
    let result = await absensi
      .overtimeListApproval({
        params: {
          username: username,
          month: month,
          year: year,
          size: 32,
        },
      })
      .then((response) => {
        return response.data.data.filter((item) => item.status === 'progress');
      })
      .catch((err) => {
        return err.response;
      });

    return result;
  };

  const handlerOnChange = (type, value) => {
    if (type === 'bulan') {
      settemp({
        month: value,
        year: temp.year,
      });
      getDataLemburanByUser(USER?.username, value, temp.year).then(function (
        response,
      ) {
        dispatch(fetchLemburanByApproval(response));
      });
    }

    if (type === 'tahun') {
      settemp({
        month: temp.month,
        year: value,
      });
      getDataLemburanByUser(USER?.username, temp.month, value).then(function (
        response,
      ) {
        dispatch(fetchLemburanByApproval(response));
      });
    }
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    getDataLemburanByUser(USER?.username).then(function (response) {
      dispatch(fetchLemburanByApproval(response));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USER, dispatch]);

  return (
    <>
      {/* Start Filter Month And Year  */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} />
      {/* End Filter Month And Year  */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 my-10 lg:grid-cols-4 gap-4 lg:gap-6 ">
        {LEMBURAN.status === 'idle' ? (
          <CardLoading />
        ) : LEMBURAN.dataLemburanByApproval.length > 0 ? (
          LEMBURAN.dataLemburanByApproval.map((data) => (
            <CardOvertimeApproval
              key={Math.random()}
              idOvertime={data.id}
              date={data.detail_overtime?.[0]?.jam}
              status={data.status}
              title={data.subject}
              timeIn={data.detail_overtime?.[0]?.jam}
              timeOut={data.detail_overtime?.[1]?.jam}
              name={data.user.name.toLowerCase() ?? null}
            />
          ))
        ) : (
          'Data Kosong'
        )}
      </motion.div>
    </>
  );
};

export default withRouter(Lemburan);
