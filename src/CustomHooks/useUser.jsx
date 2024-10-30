import { useContext } from "react";
import { AuthContext } from "./../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useContext(AuthContext); // Get the authenticated user from context
  const axiosPublic = useAxiosPublic(); // Custom axios instance

  const {
    data: userdb,     // User data fetched from the API 
    isLoading,        // Loading state
    isError,          // Error state
    error,            // Error object for more details
    refetch,          // Refetch function to manually refetch the data
  } = useQuery({
    queryKey: ["users", user?.email],   // Query key based on user email
    queryFn: async () => {
      if (!user?.email) return null;    // Prevent the API call if the user is not logged in
      const res = await axiosPublic.get(`/users/email?email=${user.email}`, { 
        withCredentials: true,          // Ensures cookies are included in the request
      });
      return res.data;
    },
    enabled: !!user?.email,  // Only run the query if the user email is available
    staleTime: 5 * 60 * 1000,  // Cache data for 5 minutes
    keepPreviousData: true,    // Keep previous data while fetching new data
    retry: 2,                  // Retry the request twice on failure
  });

  return {
    userdb,
    isLoading,
    isError,
    error,      // Providing access to the error object
    refetch,    // Allow refetching manually if needed
  };
};

export default useUser;
