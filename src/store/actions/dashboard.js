import {
  FETCH_TIDAK_HADIR,
  FETCH_TERLAMBAT,
  FETCH_TIDAK_CHECKOUT,
  FETCH_TIDAK_CHECKIN,
  FETCH_DIREKTORAT,
  FETCH_UNIT,
  FETCH_KEHADIRAN,
  FETCH_WFH,
  FETCH_WFO,
  FETCH_SATELIT,
  FETCH_HADIR,
  MESSAGE_DATA,
  STATUS_DATA,
} from 'constants/types/dashboard';

export const fetchTidakHadir = (data) => ({
  type: FETCH_TIDAK_HADIR,
  payload: data,
});
export const fetchTerlambat = (data) => ({
  type: FETCH_TERLAMBAT,
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
export const fetchKehadiran = (data) => ({
  type: FETCH_KEHADIRAN,
  payload: data,
});
export const fetchHadir = (data) => ({
  type: FETCH_HADIR,
  payload: data,
});
export const fetchWfh = (data) => ({
  type: FETCH_WFH,
  payload: data,
});
export const fetchWfo = (data) => ({
  type: FETCH_WFO,
  payload: data,
});
export const fetchSatelit = (data) => ({
  type: FETCH_SATELIT,
  payload: data,
});
export const fetchTidakCheckout = (data) => ({
  type: FETCH_TIDAK_CHECKOUT,
  payload: data,
});
export const fetchTidakCheckIn = (data) => ({
  type: FETCH_TIDAK_CHECKIN,
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
