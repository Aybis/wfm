import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastHandler(type, message, time = 2000) {
  if (type === 'success') {
    toast.success(message, {
      className: 'bg-apps-primary font-medium',
      position: 'top-center',
      autoClose: time,
    });
  } else if (type === 'warning') {
    toast.warn(message, {
      className: 'bg-apps-yellow text-black font-medium',
      bodyClassName: 'text-sm font-white font-med block p-3',
      position: 'top-center',
      autoClose: time,
    });
  } else if (type === 'error') {
    toast.error(message, {
      className: 'bg-red-600 font-medium',
      position: 'top-center',
      autoClose: time,
    });
  } else if (type === 'info') {
    toast.info(message, {
      className: 'bg-cyan-600 font-medium',
      position: 'top-center',
      autoClose: time,
    });
  }
}
