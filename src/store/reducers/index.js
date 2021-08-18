import { combineReducers } from 'redux';
import users from './users';
import absensi from './absensi';
import presence from './presence';

export default combineReducers({
  users,
  absensi,
  presence,
});
