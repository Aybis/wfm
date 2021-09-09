import {
  FETCH_TIDAK_HADIR,
  FETCH_DIREKTORAT,
  FETCH_UNIT,
  FETCH_KEHADIRAN,
  MESSAGE_DATA,
  STATUS_DATA,
} from 'constants/types/dashboard';

const initialState = {
  dataTidakHadir: {},
  dataDirektorat: {},
  dataUnit: {},
  dataKehadiran: {},
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

    case FETCH_TIDAK_HADIR:
      return {
        ...state,
        dataTidakHadir: action.payload ?? {},
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

    case FETCH_KEHADIRAN:
      return {
        ...state,
        dataKehadiran: [
          {
            name: 'wfh',
            value: action.payload.wfh,
          },
          {
            name: 'wfo',
            value: action.payload.wfo,
          },
          {
            name: 'satelit',
            value: action.payload.satelit,
          },
          {
            name: 'telat',
            value: action.payload.telat.value,
          },
          {
            name: 'tidak_hadir',
            value: action.payload.tidak_hadir.value,
          },
        ],
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
