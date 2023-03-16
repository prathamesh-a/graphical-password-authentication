import {toast} from "react-toastify";

function Toast(message) {
    toast.error(message, {position: "top-center", autoClose: 3000, hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
}

function successToast(message) {
    toast.success(message, {position: "top-center", autoClose: 3000, hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
}

export {Toast, successToast}