import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useTotalClassCount = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useAuth();
    const { data: totalClasses = [] ,refetch} = useQuery({
        queryKey: ["totalClassCount"],
        queryFn: async () => {
            const res = await axiosPrivate.get(
                `/classes/count?email=${user?.email}`
            );
            return res.data;
        },
    });
    return {totalClasses, refetchTotalClassCount:refetch};
};

export default useTotalClassCount;
