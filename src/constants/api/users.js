/** @format */

import axios from "configs/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: (credentials) => axios.post("auth/token/request", credentials),

  details: () => axios.get("auth/token/detail"),
};
