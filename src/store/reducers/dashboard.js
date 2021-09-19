import {
  FETCH_TIDAK_HADIR,
  FETCH_TERLAMBAT,
  FETCH_TIDAK_CHECKOUT,
  FETCH_TIDAK_CHECKIN,
  FETCH_HADIR,
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
  dataTerlambat: {},
  dataTidakCheckout: {},
  dataTidakCheckin: {},
  dataHadir: {},
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

    case FETCH_HADIR:
      return {
        ...state,
        dataHadir: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_TERLAMBAT:
      return {
        ...state,
        dataTerlambat: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_TIDAK_CHECKOUT:
      return {
        ...state,
        dataTidakCheckout: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_TIDAK_CHECKIN:
      return {
        ...state,
        dataTidakCheckin: action.payload ?? {},
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
        status: 'ok',
      };

    default:
      return state;
  }
}
