import axios from "axios";
import { API } from "../../../backend";

export const getcategories = () => {
  return axios(`${API}/categorys/get`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
