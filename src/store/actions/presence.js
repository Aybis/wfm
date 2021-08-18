import {
  IS_CHECK_IN,
  IS_CHECK_OUT,
  STATUS_PRESENCE,
  MESSAGE_PRESENCE,
} from 'constants/types/presence';

export const isCheckIn = (isCheck) => ({
  type: IS_CHECK_IN,
  payload: isCheck,
});

export const isCheckOut = (isCheck) => ({
  type: IS_CHECK_OUT,
  payload: isCheck,
});

export const statusPresence = (data) => ({
  type: STATUS_PRESENCE,
  payload: data,
});

export const messagePresence = (data) => ({
  type: MESSAGE_PRESENCE,
  payload: data,
});
