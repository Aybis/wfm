/** @format */

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastHandler(type, message, time = 2000) {
  if (type === "success") {
    toast.success(message, {
      position: "top-center",
      autoClose: time,
    });
  } else if (type === "warning") {
    console.log("ini");
    toast.warn(message, {
      position: "top-center",
      autoClose: time,
    });
  } else if (type === "error") {
    toast.error(message, {
      position: "top-center",
      autoClose: time,
    });
  } else if (type === "info") {
    toast.info(message, {
      position: "top-center",
      autoClose: time,
    });
  }
}
