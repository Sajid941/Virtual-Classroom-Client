import { useContext } from "react";
import { AuthContext } from "./../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  

  const {
    data: userDb,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/email?email=${user?.email}`);
      console.log(res);
      return res.data;
    },
    keepPreviousData: true,
  });

  return {
    userDb,
    isLoading,
    isError,
    refetch,
  };
};
export default useUser;
