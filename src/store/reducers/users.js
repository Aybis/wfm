/** @format */

import { POPULATE_PROFILE } from "constants/types/users";

const initialState = null;

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case POPULATE_PROFILE:
      return action.payload;

    default:
      return state;
  }
}
