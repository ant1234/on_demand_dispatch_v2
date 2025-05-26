import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const toast = useToast()

export function showError(message) {
  toast.error(message, {
    position: 'bottom-right',
    duration: 4000,
    dismissible: true
  })
}

export function successMsg(message) {
  toast.success(message, {
    position: 'bottom-right',
    duration: 4000,
    dismissible: true
  })
}

export function getUserData() {
  try {
    const data = localStorage.getItem('userData');
    if (!data) return null;

    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error?.message);
    return null;
  }
}


export function setUserData(data) {
  localStorage.setItem('userData', JSON.stringify({
    user: data?.user,
    token: data?.token,
  }));
}

export function _debounce(cb, delay) {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => cb(...args), delay); // ✅ spread args properly
  };
}

export function promptUser(message) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    })
    .then((result) => {
      if (result.isConfirmed) {
        resolve(result.isConfirmed)
      }
      reject()
    })
  })
}









