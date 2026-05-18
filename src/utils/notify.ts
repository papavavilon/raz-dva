import { toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_OPTIONS: ToastOptions = {
  position: 'top-right',
  autoClose: 3500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: 'dark',
};

export const notify = {
  info: (message: string, options?: ToastOptions) =>
    toast.info(message, { ...BASE_OPTIONS, ...options }),

  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { ...BASE_OPTIONS, ...options }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { ...BASE_OPTIONS, autoClose: 5000, ...options }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, { ...BASE_OPTIONS, ...options }),
};
