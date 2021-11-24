import { combineReducers } from 'redux';
import users from './users';
import absensi from './absensi';
import presence from './presence';
import employee from './employee';
import dashboard from './dashboard';
import lemburan from './lemburan';

export default combineReducers({
  users,
  absensi,
  presence,
  employee,
  dashboard,
  lemburan,
});
