import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from './useAxiosPrivate';

const useUserType = () => {
    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const { data: userType = {},refetch } = useQuery({
        queryKey: ["userType"],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/userType?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    return {
        userType,refetchUserType:refetch
    };
};

export default useUserType;
