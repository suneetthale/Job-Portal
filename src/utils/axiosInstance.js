import axios from "axios";

const baseURL = "https://64c13258fa35860baea034ac.mockapi.io/jobs";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
