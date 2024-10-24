import { useContext } from "react";
import ClassCard from "./ClassCard";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import useRole from "../../CustomHooks/useRole";
import { Helmet } from "react-helmet-async";

const DashboardBody = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user's data
    const axiosPublic = useAxiosPublic();
    const { role } = useRole();

    const {
        data: classes = [], // Set default value to an empty array to avoid undefined issues
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["classes", user?.email], // Unique key for caching
        queryFn: async () => {
            if (!user?.email) return []; // Prevent query if email is not available
            const res = await axiosPublic.get(
                `/classes/${role}?email=${user?.email}`
            );
            return res.data;
        },
        keepPreviousData: true,
        enabled: !!user?.email && !!role, // Only run the query if the user has an email
    });

    // Handle loading state
    if (isLoading) {
        return <Loading />;
    }
    // Handle case where no classes are found
    if (classes?.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>No classes found for this {role}.</p>
            </div>
        );
    }
    // Handle error state
    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-error">
                    An error occurred while fetching class data. Please try
                    again later.
                </h1>
            </div>
        );
    }
    // Render the class cards if data is available
    return (
        <div className="">
            <Helmet>
                <title>Classes | Class Net</title>
            </Helmet>
            {classes?.map((classData) => (
                <ClassCard
                    key={classData.classId}
                    refetch={refetch}
                    classData={classData}
                />
            ))}
        </div>
    );
};

export default DashboardBody;
