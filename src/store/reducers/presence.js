import {
  IS_CHECK_IN,
  STATUS_PRESENCE,
  MESSAGE_PRESENCE,
} from 'constants/types/presence';

const initialState = {
  data: {},
  dataIn: {},
  dataOut: {},
  status: 'idle',
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case STATUS_PRESENCE:
      return {
        ...state,
        status: action.payload,
      };

    case IS_CHECK_IN:
      return {
        ...state,
        data: action.payload ?? {},
        dataIn: action.payload?.detail_absensi?.[0] ?? {},
        dataOut: action.payload?.detail_absensi?.[1] ?? {},
        status: 'ok',
      };

    case MESSAGE_PRESENCE:
      return {
        ...state,
        message: action.payload,
        status: 'error',
      };

    default:
      return state;
  }
}
