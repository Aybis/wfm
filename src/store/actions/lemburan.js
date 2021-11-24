import {
  FETCH_LEMBURAN_TODAY,
  FETCH_LEMBURAN_MONTHLY,
  FETCH_LEMBURAN_BY_APPROVAL,
  FETCH_LEMBURAN_BY_STATUS,
  STATUS_DATA,
  MESSAGE_DATA,
} from 'constants/types/lemburan';

export const fetchLemburanToday = (data) => ({
  type: FETCH_LEMBURAN_TODAY,
  payload: data,
});

export const fetchLemburanMonthly = (data) => ({
  type: FETCH_LEMBURAN_MONTHLY,
  payload: data,
});

export const fetchLemburanByApproval = (data) => ({
  type: FETCH_LEMBURAN_BY_APPROVAL,
  payload: data,
});

export const fetchLemburanByStatus = (data) => ({
  type: FETCH_LEMBURAN_BY_STATUS,
  payload: data,
});

export const statusData = (data) => ({
  type: STATUS_DATA,
  payload: data,
});

export const messageData = (data) => ({
  type: MESSAGE_DATA,
  payload: data,
});
