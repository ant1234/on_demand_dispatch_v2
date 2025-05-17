// import App from "@/api/api.js";
import { App } from "@/api/api.js";

export function postData(endpoint, input) {
  return new Promise((resolve, reject) => {
    // Wrapping the async logic inside an async IIFE (Immediately Invoked Function Expression)
    (async () => {
      try {
        const res = await fetch(App.apiBaseUrl + endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await res.json();

        if (typeof responseData?.errors !== 'undefined') {
          // Handle validation errors
          const errors = Array.isArray(responseData?.errors) ? responseData?.errors : Object.values(responseData?.errors);
          reject(errors);
        } else {
          resolve(responseData);
        }

      } catch (error) {
        console.error('Error:', error);
        reject(error);
      }
    })();
  });
}
