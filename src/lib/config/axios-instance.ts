import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

let isNotificationShown = false;

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {

     const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    isNotificationShown = false;
    return response;
  },
  (error) => {
    console.log(error);
    if (!isNotificationShown) {
      isNotificationShown = true;

      if (error.response?.status === 401 || error?.response?.data?.message === "Token expired") {
        console.log(error?.response?.data?.message);

        message.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiry");
      localStorage.removeItem("userdetails");
      Cookies.remove("token");
       window.location.href = "/";

      } else {
        console.log(error?.response?.data?.message);
      }

      setTimeout(() => {
        isNotificationShown = false;
      }, 3000);
    }
    return Promise.reject(error);
  }
);

export default instance;
