import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";
import { AuthContext } from "../../Provider/AuthProvider";
import useRole from "../../CustomHooks/useRole";
import { FaChalkboardTeacher, FaTasks, FaClipboardList } from "react-icons/fa";
import Loading from "../../Components/Loading";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const DashboardHome = () => {
  const { userdb } = useUser();
  const { role } = useRole();
  const axiosPublic = useAxiosPublic();
  console.log(role);
  // Fetch classes based on the user's email
  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classes", userdb?.email],
    queryFn: async () => {
      if (!userdb?.email) return []; // Prevent query if email is not available
      const res = await axiosPublic(`/classes/${role}?email=${userdb.email}`);
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!userdb?.email,
  });

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-error">
          An error occurred while fetching class data. Please try again later.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full p-4 rounded-xl min-h-[80vh] bg-secondary">
      <div className="topText mb-4">
        <h1 className="text-2xl font-bold text-white">
          Welcome Back, {userdb?.name}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="card bg-white shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105">
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-3xl text-blue-500 mr-3" />
            <div>
              <h2 className="text-lg font-semibold">Classes</h2>
              <p className="text-2xl font-bold">{classes?.length}</p>
            </div>
          </div>
        </div>
        <div className="card bg-white shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105">
          <div className="flex items-center">
            <FaTasks className="text-3xl text-green-500 mr-3" />
            <div>
              <h2 className="text-lg font-semibold">Assignments</h2>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="card bg-white shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105">
          <div className="flex items-center">
            <FaClipboardList className="text-3xl text-orange-500 mr-3" />
            <div>
              <h2 className="text-lg font-semibold">Quizzes</h2>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
