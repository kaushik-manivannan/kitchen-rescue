import { Bounce, ToastContainer, toast } from 'react-toastify';

// Prints Toaster
function printToastMessage (message: string) {
  toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
}

export default printToastMessage;