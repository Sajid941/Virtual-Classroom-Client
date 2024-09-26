import axios from 'axios';

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // replace with your API base URL
    // other configurations if needede
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });
  return instance;
};

export default useAxiosPublic;