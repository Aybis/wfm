import {
  FETCH_DATA_PRESENCE,
  FETCH_DATA_WORK,
  FETCH_DATA,
  STATUS_DATA,
  MESSAGE_DATA,
} from 'constants/types/absensi';

const initialState = {
  data: {},
  dataWork: {},
  dataPresence: {},
  total: 0,
  status: 'idle',
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case STATUS_DATA:
      return {
        ...state,
        status: action.payload,
      };

    case FETCH_DATA:
      return {
        ...state,
        data: action.payload,
        total: action.payload.length ?? 0,
        status: 'ok',
      };

    case FETCH_DATA_PRESENCE:
      return {
        ...state,
        dataPresence: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_DATA_WORK:
      return {
        ...state,
        dataWork: action.payload ?? {},
        status: 'ok',
      };

    case MESSAGE_DATA:
      return {
        ...state,
        message: action.payload,
        status: 'error',
      };

    default:
      return state;
  }
}
