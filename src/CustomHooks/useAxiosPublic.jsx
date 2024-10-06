import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    // baseURL: 'https://virtual-classroom-server-nine.vercel.app',
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      
    },
    withCredentials:true,
  });
  return instance;
};

export default useAxiosPublic;
