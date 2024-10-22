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
  const [sortedSubmissions, setSortedSubmissions] = useState([]);

  const {
    data: responseData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "user-submissions",
      user?.email,
      userdb?.role,
      selectedClassName,
    ],
    queryFn: async () => {
      if (!user?.email || !userdb?.role) return [];
      const res = await axiosPublic.get(
        `/classes/user-submissions?email=${user?.email}&&role=${userdb?.role}&&className=${selectedClassName}`
      );
      return res.data;
    },
    enabled: !!user?.email && !!userdb?.role,
  });

  const { classNames = [], submissions = [] } = responseData;

  // Sort submissions when 'submissions' change
  useEffect(() => {
    if (submissions.length) {
      const topSubmissions = [...submissions]
        .filter((sub) => sub.student_marks != null)
        .sort((a, b) => {
          b.student_marks - a.student_marks;
        })
        .slice(0, 3);

      setSortedSubmissions(topSubmissions);
    }
  }, [submissions]);

  useEffect(() => {
    refetch();
  }, [selectedClassName, refetch]);

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
        <select
          className="select w-full max-w-xs input-bordered"
          onChange={(e) => setSelectedClassName(e.target.value)}
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

      {sortedSubmissions.length ? (
        sortedSubmissions.map((submission, idx) => (
          <div key={idx} className="mt-5">
            <div className="bg-white w-full rounded-md px-5 py-2 flex gap-6 text-black items-center">
              <h1 className="text-lg lg:text-2xl font-bold">{idx + 1}</h1>
              <div>
                <h3 className="text-lg font-bold">
                  {submission.student_name}
                </h3>
                <p>Total Mark: {submission.student_marks}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-4">No submissions available</p>
      )}
    </div>
  );
};

LeaderBoard.propTypes = {};

export default LeaderBoard;
