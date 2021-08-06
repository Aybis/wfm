import {
  IS_CHECK_IN,
  IS_CHECK_OUT,
  FETCH_DATA_DAILY,
  FETCH_DATA_MONTHLY,
  FETCH_DATA_WEEKLY,
} from 'constants/types/absensi';

const initialState = {
  data: {},
  total: 0,
  status: 'idle',
  message: '',
};
