import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useState } from "react";
import fileDownload from "js-file-download";
import AssignmentFeedbackModal from "../../Components/AssignmentFeedbackModal/AssignmentFeedbackModal";

const AllAssignments = () => {
  const { userdb } = useUser();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // states for filtering
  const [selectedClassName, setSelectedClassName] = useState("");
  const [selectedAssignmentName, setSelectedAssignmentName] = useState("");
  const [studentName, setStudentName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false)

  // get role-based assignment submissions
  const {
    data: submissions = [],
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ["user-submissions", user?.email, userdb?.role, selectedClassName, selectedAssignmentName, studentName],
    queryFn: async () => {
      if (!user?.email || !userdb?.role) return [];
      const res = await axiosPublic.get(`/classes/user-submissions?email=${user?.email}&&role=${userdb?.role}&&className=${selectedClassName}&&assignmentName=${selectedAssignmentName}&&search=${studentName}`);
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
      });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="flex gap-1 flex-col lg:flex-row">
        {/* Class Selection Dropdown */}
        <select
          className="select select-info w-full max-w-xs mb-4"
          onChange={(e) => setSelectedClassName(e.target.value)}
          value={selectedClassName}
        >
          <option value="">Select Class</option>
          {submissions
            .map((sub) => sub.className)
            .map((clsName, idx) => (
              <option key={idx} value={clsName}>
                {clsName}
              </option>
            ))}
        </select>

        {/* Assignment Selection Dropdown */}
        <select
          className="select select-info w-full max-w-xs mb-4"
          onChange={(e) => {setSelectedAssignmentName(e.target.value)}}
          value={selectedAssignmentName}
        >
          <option value="">Select Assignment</option>
          {submissions
            .map((sub) => sub.assignmentName)
            .map((assignment, idx) => (
              <option key={idx} value={assignment}>
                {assignment}
              </option>
            ))}
        </select>
      </div>

      {/* Search bar to search student */}
      <input
        onChange={(e) => {
          e.preventDefault();
          setStudentName(e.target.value)
        }}
        value={studentName}
        type="text"
        placeholder="Student Name"
        className="input input-bordered input-info w-full mb-4"
      />

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
              {submissions.map((submission, index) => (
                  <tr key={submission._id} className="hover:bg-gray-200">
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2">{submission.assignmentName}</td>
                    <td className="p-2">{submission.student_name}</td>
                    <td className="p-2">{submission.submitAt.split("T")[0]}</td>
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
                    {userdb?.role === "teacher" ? (
                      <td className="p-2 text-center">
                        {submission.submit_file && (
                          <button className="bg-green-600 btn btn-sm text-white" onClick={()=>setIsModalOpen(true)}>
                            Feedback
                          </button>
                        )}
                      </td>
                    ) : (
                      <td>No Feedback</td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AssignmentFeedbackModal isOpen={isModalOpen} onRequestClose={()=>setIsModalOpen(false)}></AssignmentFeedbackModal>
    </div>
  );
};

export default AllAssignments;
