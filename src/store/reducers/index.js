import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import users from './users';
import absensi from './absensi';
import presence from './presence';
import employee from './employee';
import dashboard from './dashboard';
import lemburan from './lemburan';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'users',
    'absensi',
    'presence',
    'employee',
    'dashboard',
    'lemburan',
  ],
};

const rootReducer = combineReducers({
  users,
  absensi,
  presence,
  employee,
  dashboard,
  lemburan,
});

export default persistReducer(persistConfig, rootReducer);
