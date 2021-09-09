import {
  FETCH_TIDAK_HADIR,
  FETCH_DIREKTORAT,
  FETCH_UNIT,
  FETCH_KEHADIRAN,
  MESSAGE_DATA,
  STATUS_DATA,
} from 'constants/types/dashboard';

export const fetchTidakHadir = (data) => ({
  type: FETCH_TIDAK_HADIR,
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

export const messageData = (data) => ({
  type: MESSAGE_DATA,
  payload: data,
});
export const statusData = (data) => ({
  type: STATUS_DATA,
  payload: data,
});
