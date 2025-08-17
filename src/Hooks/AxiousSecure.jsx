import axios from "axios";

// creating axios secure instance
const axiosSecure = axios.create({
  baseURL: "https://medicamp-server-jth3.onrender.com/",
});

// access token
let accessToken = null;

// get access token
export let setAccessToken = (token) => {
  // accessToken = token;
  // console.log(accessToken);
};

accessToken = localStorage.getItem("token");
console.log("token: ", accessToken);
// implementing axios interceptor
axiosSecure.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// // handling error for status 401 403
// axiosSecure.interceptors.re sponse.use(
//   (response) => {
//     return response; // returning the response
//   },
//   (error) => {
//     console.log("Error in interceptor: ", error);

//     // handling status 401
//     if (error.status === 401 || error.status === 403) {

//       // calling handle signout
//       const result = handleSignOut();
//       if (result) {
//         showToast("success", 'Signed out successfully')
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosSecure;
