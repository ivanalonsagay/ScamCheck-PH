import axios from "axios";
import { API_BASE_URL } from "../constants";

// Central API connection
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token to protected requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("scamcheck_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;