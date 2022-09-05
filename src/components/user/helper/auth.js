// import axios from "axios";
// import { API } from "../../../backend";

// export const signup = (user) => {
//   return axios(`${API}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     data: user,
//   })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       // console.log(error.response.data.error);
//       return error.response.data;
//     });
// };

// export const signin = (user) => {
//   return axios(`${API}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     data: user,
//   })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       // console.log(error.response.data.error);
//       return error.response.data;
//     });
// };

// export const authenticate = (data, next) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("jwt", JSON.stringify(data));
//   }
//   next();
// };

// export const signout = (next) => {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem("jwt");
//     next();
//   }
// };

// export const isAuthenticate = () => {
//   if (typeof window === "undefined") {
//     return false;
//   }
//   if (typeof window !== "undefined") {
//     return JSON.parse(localStorage.getItem("jwt"));
//   } else {
//     return false;
//   }
// };
