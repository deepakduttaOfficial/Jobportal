import axios from "axios";
import { API } from "../../../backend";

export const createbid = (profileId, jobId, token, data) => {
  return axios(`${API}/bid/create/${profileId}/${jobId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const onprojecttotalbid = (jobId) => {
  return axios(`${API}/bids/get/${jobId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const acceptbid = (profileId, jobId, bidId, token) => {
  return axios(`${API}/bid/accept/${profileId}/${jobId}/${bidId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
