import {
  FETCH_ALL,
  FETCH_DIREKTORAT,
  FETCH_UNIT,
  FETCH_SUB_UNIT,
  FETCH_JABATAN,
  MESSAGE_DATA,
  STATUS_DATA,
} from 'constants/types/employee';

const initialState = {
  dataAll: {},
  dataDirektorat: {},
  dataUnit: {},
  dataSubUnit: {},
  dataJabatan: {},
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

    case FETCH_ALL:
      return {
        ...state,
        dataAll: action.payload,
        total: action.payload.length ?? 0,
        status: 'ok',
      };

    case FETCH_DIREKTORAT:
      return {
        ...state,
        dataDirektorat: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_UNIT:
      return {
        ...state,
        dataUnit: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_SUB_UNIT:
      return {
        ...state,
        dataSubUnit: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_JABATAN:
      return {
        ...state,
        dataJabatan: action.payload ?? {},
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
