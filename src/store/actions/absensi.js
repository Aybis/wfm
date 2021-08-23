import {
  FETCH_DATA_PRESENCE,
  FETCH_DATA_WEEKLY,
  FETCH_DATA_WORK,
  FETCH_DATA,
  STATUS_DATA,
  MESSAGE_DATA,
} from 'constants/types/absensi';

export const dataPresence = (data) => ({
  type: FETCH_DATA_PRESENCE,
  payload: data,
});

export const dataWork = (data) => ({
  type: FETCH_DATA_WORK,
  payload: data,
});

export const dataWeekly = (data) => ({
  type: FETCH_DATA_WEEKLY,
  payload: data,
});

export const getData = (data) => ({
  type: FETCH_DATA,
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
