// import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useState } from "react";
import fileDownload from "js-file-download";

const AllAssignments = () => {
  const { userdb } = useUser(); // Extract role and email
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [selectedClassName, setSelectedClassName] = useState("");

  // Fetch role-based submissions
  const { data: submissions = [], isLoading, isError } = useQuery({
    queryKey: ["user-submissions", user?.email, userdb?.role],
    queryFn: async () => {
      if (!user?.email || !userdb?.role) return [];
      const res = await axiosPublic.get("/classes/user-submissions", {
        params: { email: user?.email, role: userdb?.role },
      });
      return res.data.submissions;
    },
    enabled: !!user?.email && !!userdb?.role,
  });

  // Download submitted assignment file
  const handleDownloadSubmitAssignment = async (filename) => {
    const submittedFileName = filename.replace("/submittedAssignments/", "");

    axiosPublic({
      url: `classes/submitted-file-download/${encodeURIComponent(
        submittedFileName
      )}`,
      method: "GET",
      responseType: "blob", // Important for handling binary files
    })
      .then((response) => {
        fileDownload(response.data, submittedFileName);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        alert("Failed to download the assignment. Please try again.");
      });
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      {/* Class Selection Dropdown */}
      <select
        className="select select-info w-full max-w-xs mb-4"
        onChange={(e) => setSelectedClassName(e.target.value)}
      >
        <option defaultValue>Select Class</option>
        {submissions.map((sub) => sub.className).map((clsName, idx) => (
          <option key={idx} value={clsName}>
            {clsName}
          </option>
        ))}
      </select>

      {userdb?.role === "teacher" ? (
        <div className="flex-grow overflow-hidden">
          <div className="overflow-x-auto h-full border rounded">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-2">#</th>
                  <th className="p-2">Assignment Name</th>
                  <th className="p-2">Student Name</th>
                  <th className="p-2">Submission Date</th>
                  <th className="p-2">Download</th>
                  <th className="p-2">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {submissions
                  .filter((sub) =>  selectedClassName === "" || sub.className === selectedClassName)
                  .map((submission, index) => (
                    <tr key={submission._id} className="hover:bg-gray-200">
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2">{submission.assignmentName}</td>
                      <td className="p-2">{submission.student_name}</td>
                      <td className="p-2">
                        {submission.submitAt.split("T")[0]}
                      </td>
                      <td className="p-2 text-center">
                        {submission.submit_file && (
                          <button
                            onClick={() =>
                              handleDownloadSubmitAssignment(
                                submission.submit_file
                              )
                            }
                            className="bg-[#004085] btn btn-sm text-white"
                          >
                            Download
                          </button>
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {submission.submit_file && (
                          <button className="bg-green-600 btn btn-sm text-white">
                            Feedback
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <h3 className="text-lg">This page is under development</h3>
        </div>
      )}
    </div>
  );
};

export default AllAssignments;
