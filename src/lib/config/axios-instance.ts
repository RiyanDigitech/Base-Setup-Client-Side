import axios from "axios";
import tokenService from "@/services/token.service";

let isNotificationShown = false;

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken();
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

      if (error.response?.status === 401) {
        console.log(error?.response?.data?.message);
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
