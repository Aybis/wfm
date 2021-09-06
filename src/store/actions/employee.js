import {
  FETCH_ALL,
  FETCH_DIREKTORAT,
  FETCH_UNIT,
  FETCH_SUB_UNIT,
  FETCH_JABATAN,
  MESSAGE_DATA,
  STATUS_DATA,
} from 'constants/types/employee';

export const fetchAll = (data) => ({
  type: FETCH_ALL,
  payload: data,
});
export const fetchDirektorat = (data) => ({
  type: FETCH_DIREKTORAT,
  payload: data,
});
export const fetchUnit = (data) => ({
  type: FETCH_UNIT,
  payload: data,
});
export const fetchSubUnit = (data) => ({
  type: FETCH_SUB_UNIT,
  payload: data,
});
export const fetchJabatan = (data) => ({
  type: FETCH_JABATAN,
  payload: data,
});
export const messageData = (data) => ({
  type: MESSAGE_DATA,
  payload: data,
});
export const statusData = (data) => ({
  type: STATUS_DATA,
  payload: data,
});
