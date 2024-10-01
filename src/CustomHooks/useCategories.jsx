import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {
    const axiosPublic = useAxiosPublic()
    const { data: categories, isPending ,refetch} = useQuery({
        queryKey: ['Options-categories'],
        queryFn: async () => {
            const res = await axiosPublic("/discussions/categories")
            return res.data
        }
    })
    return {categories, isPending,refetch}
};

export default useCategories;