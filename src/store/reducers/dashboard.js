import {
  FETCH_TIDAK_HADIR,
  FETCH_TERLAMBAT,
  FETCH_TIDAK_CHECKOUT,
  FETCH_TIDAK_CHECKIN,
  FETCH_HADIR,
  FETCH_DIREKTORAT,
  FETCH_UNIT,
  FETCH_KEHADIRAN,
  FETCH_WFH,
  FETCH_WFO,
  FETCH_SATELIT,
  FETCH_KEHADIRAN_BULANAN,
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
  dataKehadiranSatelit: {},
  dataKehadiranWfh: {},
  dataKehadiranWfo: {},
  dataKehadiranBulanan: {},
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

    case FETCH_WFO:
      return {
        ...state,
        dataKehadiranWfo: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_WFH:
      return {
        ...state,
        dataKehadiranWfh: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_SATELIT:
      return {
        ...state,
        dataKehadiranSatelit: action.payload ?? {},
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
            value: action.payload.wfh.value,
          },
          {
            name: 'wfo',
            value: action.payload.wfo.value,
          },
          {
            name: 'satelit',
            value: action.payload.satelit.value,
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

    case FETCH_KEHADIRAN_BULANAN:
      return {
        ...state,
        dataKehadiranBulanan: [
          {
            name: 'wfh',
            value: action.payload.wfh ?? 0,
          },
          {
            name: 'wfo',
            value: action.payload.wfo ?? 0,
          },
          {
            name: 'satelit',
            value: action.payload.satelit ?? 0,
          },
          {
            name: 'cuti',
            value: action.payload.cuti ?? 0,
          },
          {
            name: 'sppd',
            value: action.payload.sppd ?? 0,
          },
          {
            name: 'sakit',
            value: action.payload.sakit ?? 0,
          },
          {
            name: 'telat',
            value: action.payload.telat ?? 0,
          },
          {
            name: 'tidak_hadir',
            value: action.payload.tidak_hadir ?? 0,
          },
          {
            name: 'direktorat',
            value: action.payload.dir ?? 0,
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
