import axios from "axios";

const useAxiosPrivate = () => {
  const instance = axios.create({
    baseURL: 'https://class-net-server.vercel.app',
    //baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set token in the Authorization header
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
};

export default useAxiosPrivate;
