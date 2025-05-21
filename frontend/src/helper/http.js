// import App from "@/api/api.js";
import { App } from "@/api/api.js";
import { getUserData } from "./utils";


function getHeaders() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const userData = getUserData();
  console.log('get headers : ', userData);

  if (userData?.token) {
    headers['Authorization'] = 'Bearer ' + userData.token;
  }

  return headers;
}

export function postData(endpoint, input) {

  const header = getHeaders();

  return new Promise((resolve, reject) => {
    // Wrapping the async logic inside an async IIFE (Immediately Invoked Function Expression)
    (async () => {
      try {
        const res = await fetch(App.apiBaseUrl + endpoint, {
          method: 'POST',
          headers: header,
          body: JSON.stringify(input),
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await res.json();

        handleHttpError(responseData, resolve, reject);

      } catch (error) {
        console.error('Error:', error);
        reject(error);
      }
    })();
  });
}



export function getData(endpoint) {

  const header = getHeaders();

  return new Promise((resolve, reject) => {
    // Wrapping the async logic inside an async IIFE (Immediately Invoked Function Expression)
    (async () => {
      try {
        const res = await fetch(App.apiBaseUrl + endpoint, {
          method: 'GET',
          headers: header,
        });

        // if (!res.ok) {
        //   throw new Error('Network response was not ok');
        // }

        const responseData = await res.json();

        handleHttpError(responseData, resolve, reject);

      } catch (error) {
        console.error('Error:', error);
        reject(error);
      }
    })();
  });
}

export function handleHttpError(responseData, resolve, reject) {

  if (typeof responseData?.errors !== 'undefined') {
    // Handle validation errors
    const errors = Array.isArray(responseData?.errors) ? responseData?.errors : Object.values(responseData?.errors);
    reject(errors);
  } else if(responseData?.message === 'Unauthenticated.') {
    // window.location.href = '/app/login';
    console.log(responseData);
  }
  else {
    resolve(responseData);
  }
}

