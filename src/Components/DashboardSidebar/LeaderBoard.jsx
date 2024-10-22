import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const LeaderBoard = () => {
  const { userdb } = useUser();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [selectedClassName, setSelectedClassName] = useState("");

  const {
    data: responseData = {},
    isLoading,
    // isError,
    refetch,
  } = useQuery({
    queryKey: ["user-submissions", user?.email, userdb?.role],
    queryFn: async () => {
      if (!user?.email || !userdb?.role) return [];
      const res = await axiosPublic.get(
        `/classes/user-submissions?email=${user?.email}&&role=${userdb?.role}&&className=${selectedClassName}`
      );
      return res.data;
    },
    enabled: !!user?.email && !!userdb?.role,
  });

  const { classNames, submissions } = responseData;

  useEffect(() => {
    refetch();
  }, [selectedClassName, refetch]);

  // Sort submissions by marks
  const topSubmissions = [...submissions]
  .sort((a, b) => b.student_marks - a.student_marks)
  .slice(0, 3);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div>
      <h4 className="text-xl font-semibold">Student Leader Board:</h4>
      <div className="flex items-center my-1 gap-1">
        {/* <h6 className="font-semibold">Assignment: </h6> */}
        {/* Class Selection Dropdown */}
        <select
          className="select w-full max-w-xs input-bordered"
          onChange={(e) => {
            setSelectedClassName(e.target.value);
          }}
          value={selectedClassName}
        >
          <option value="all">All Classes</option>
          {classNames.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      { topSubmissions.length ? 
        topSubmissions.map((submission, idx) => <div key={idx} className="mt-5">
            <div className="bg-white w-full rounded-md px-5 py-2 flex gap-6 text-black items-center">
              <h1 className="text-xl lg:text-2xl font-bold">{idx + 1}</h1>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold">{submission.student_name}</h3>
                <p>Total Mark: {submission.student_marks}</p>
              </div>
            </div>
          </div>)
          :  <h3 className="text-center mt-4">No submissions available</h3>
      }
    </div>
  );
};

LeaderBoard.propTypes = {};

export default LeaderBoard;
