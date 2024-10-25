import moment from "moment";
import { useEffect, useState } from "react";
import useRole from "../../CustomHooks/useRole";
import LeaderBoard from "./LeaderBoard";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { LiaComment } from 'react-icons/lia';
import { TbPacman } from 'react-icons/tb';

const DashboardSidebar = () => {
  const axiosPublic = useAxiosPublic();
  const [time, setTime] = useState(moment().format("h:mm:ss A"));

  // Using useQuery correctly to avoid continuous fetching
  const {
    data: discussions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["discussions"], // Unique key for caching
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/discussions?category=All&sort=newest`
      );
      return res.data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false, // Prevent refetching on window focus
    refetchOnReconnect: false, // Prevent refetching on network reconnect
    retry: 1, // Retry fetching only once if there's an error
  });

  // Set time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("h:mm:ss A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { role } = useRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching discussions: {error.message}</div>;
  }

  // Get the first three discussions
  const firstThreeDiscussions = discussions.slice(0, 3);

  return (
    <div>
      <div className="border-b-2 pb-5">
        <h1 className="text-xl font-semibold">
          {moment().format("MMMM D, YYYY")}
        </h1>
        <h1 className="text-md font-semibold">Time: {time}</h1>
      </div>
      <div className="mt-5">
        {role === "teacher" && (
          <div>
            <LeaderBoard />
          </div>
        )}
        {role === "student" && (
          <div>
            <h4 className="text-lg font-semibold mb-4">
              Recent Post in Forum:
            </h4>
            {/* Display the first three discussions */}
            {firstThreeDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="border rounded-lg shadow-lg p-4 mb-3 bg-white hover:translate-x-2 transition-transform duration-200"
              >
                {/* Author's Info */}
                <Link
                  to={`/forum/discussion/${discussion?.slug}`}
                  className="flex items-center "
                >
                  <img
                    src={discussion.author.profilePic} // Assuming author profile image exists
                    alt={`${discussion.author.name}'s profile`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <h5 className="font-bold text-md text-gray-700">
                      {discussion.author.name}
                    </h5>
                    <h5 className="text-lg font-semibold mb-2 text-gray-800">
                      {discussion.title}
                    </h5>

                    {/* Display views and comments */}
                    <div className="flex items-center space-x-4 text-gray-500 mt-2">
                      {/* Views */}
                      <div className="flex items-center">
                        <TbPacman className="mr-1" /> {/* Icon for views */}
                        <span>{discussion.views || 0} views</span>{" "}
                        {/* Views count */}
                      </div>
                      {/* Comments */}
                      <div className="flex items-center">
                        <LiaComment className="mr-1" />{" "}
                        {/* Icon for comments */}
                        <span>
                          {discussion.replies?.length || 0} comments
                        </span>{" "}
                        {/* Comments count */}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
