import {
  FETCH_LEMBURAN_TODAY,
  FETCH_LEMBURAN_MONTHLY,
  FETCH_LEMBURAN_BY_APPROVAL,
  FETCH_LEMBURAN_BY_STATUS,
  STATUS_DATA,
  MESSAGE_DATA,
} from 'constants/types/lemburan';

const initialState = {
  dataLemburanToday: {},
  checkIn: {},
  checkOut: {},
  dataLemburanMonthly: {},
  dataLemburanByApproval: {},
  dataLemburanByStatus: {},
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

    case FETCH_LEMBURAN_TODAY:
      return {
        ...state,
        dataLemburanToday: action.payload ?? {},
        checkIn: action.payload?.detail_overtime?.[0] ?? {},
        checkOut: action.payload?.detail_overtime?.[1] ?? {},
        status: 'ok',
      };

    case FETCH_LEMBURAN_MONTHLY:
      return {
        ...state,
        dataLemburanMonthly: action.payload ?? {},
        total: action.payload.length ?? 0,
        status: 'ok',
      };

    case FETCH_LEMBURAN_BY_APPROVAL:
      return {
        ...state,
        dataLemburanByApproval: action.payload ?? {},
        status: 'ok',
      };

    case FETCH_LEMBURAN_BY_STATUS:
      return {
        ...state,
        dataLemburanByStatus: action.payload ?? {},
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
