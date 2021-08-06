import {
  IS_CHECK_IN,
  IS_CHECK_OUT,
  FETCH_DATA_DAILY,
  FETCH_DATA_MONTHLY,
  FETCH_DATA_WEEKLY,
} from 'constants/types/absensi';

export const isCheckIn = (isCheck) => ({
  type: IS_CHECK_IN,
  payload: isCheck,
});

export const isCheckOut = (isCheck) => ({
  type: IS_CHECK_OUT,
  payload: isCheck,
});

export const fetchDataDaily = (data) => ({
  type: FETCH_DATA_DAILY,
  payload: data,
});
export const fetchDataWeekly = (data) => ({
  type: FETCH_DATA_WEEKLY,
  payload: data,
});

export const fetchDataMonthly = (data) => ({
  type: FETCH_DATA_MONTHLY,
  payload: data,
});
