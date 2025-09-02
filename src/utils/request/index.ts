import axios from "axios";

console.log("import.meta.env.VITE_BASE_URL", import.meta.env.VITE_BASE_URL);

const request = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_BASE_URL,
  withCredentials: true, // 如果后端需要 cookie
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default request;
