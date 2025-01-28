import axios from "axios";

const baseURL = process.env.API_BASE_URL;

const apiInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default apiInstance;
