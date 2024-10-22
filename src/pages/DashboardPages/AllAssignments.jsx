import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useEffect, useState } from "react";
import fileDownload from "js-file-download";
import AssignmentFeedbackModal from "../../Components/AssignmentFeedbackModal/AssignmentFeedbackModal";
import { Helmet } from "react-helmet-async";

const AllAssignments = () => {
  const { userdb } = useUser();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // states for filtering
  const [selectedClassName, setSelectedClassName] = useState("");
  const [selectedAssignmentName, setSelectedAssignmentName] = useState("");
  const [studentName, setStudentName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // states for feedback modal
  const [classId, setClassId] = useState("");
  const [assignmentId, setAssignmentId] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  
  // get role-based user assignment submissions
  const {
    data: responseData = {},
    isLoading,
    // isError,
    refetch
  } = useQuery({
    queryKey: [
      "user-submissions",
      user?.email,
      userdb?.role,
    ],
    queryFn: async () => {
      if (!user?.email || !userdb?.role) return [];
      const res = await axiosPublic.get(
        `/classes/user-submissions?email=${user?.email}&&role=${userdb?.role}&&className=${selectedClassName}&&assignmentName=${selectedAssignmentName}&&search=${studentName}`
      );
      return res.data;
    },
    enabled: !!user?.email && !!userdb?.role,
  });  

  const {classNames, assignmentNames, submissions} = responseData;
  
  useEffect(() => {
    refetch();
  }, [studentName, selectedClassName, selectedAssignmentName, refetch]);

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
    <div className="flex flex-col w-full p-4 bg-secondary text-white rounded-xl relative min-h-[80vh]">
      <Helmet>
        <title>Assignments | Class Net</title>
      </Helmet>
      <h2 className="text-lg lg:text-3xl font-semibold text-center mb-6 ">Submitted Assignments</h2>
      <div className="flex gap-1 flex-col lg:flex-row justify-between">
        {/* Class Selection Dropdown */}
        <select
          className="select select-info w-full max-w-xs mb-4 bg-transparent"
          onChange={(e) => setSelectedClassName(e.target.value)}
          value={selectedClassName}
        >
          <option value="all" className="backdrop-blur">Select Class</option>
          {classNames?.map((clsName, idx) => (
              <option key={idx} value={clsName} className="bg-primary">
                {clsName}
              </option>
            ))}
        </select>

        {/* Assignment Selection Dropdown */}
        <select
          className="select select-info w-full max-w-xs mb-4 bg-transparent"
          onChange={(e) => {
            setSelectedAssignmentName(e.target.value);
          }}
          value={selectedAssignmentName}
        >
          <option value="all bg-primary">Select Assignment</option>
          {assignmentNames?.map((name, idx) => (
              <option key={idx} value={name} className="bg-primary">
                {name}
              </option>
            ))}
        </select>
      </div>

      {/* Search bar to search student */}
      <input
        onChange={(e) => {
          e.preventDefault();
          setStudentName(e.target.value);
        }}
        value={studentName}
        type="text"
        placeholder="Student Name"
        className="input input-bordered input-info w-full mb-4 bg-transparent text-white"
      />

      <div className="flex-grow overflow-hidden">
        <div className="overflow-x-auto h-full border rounded">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">#</th>
                <th className="p-2">Assignment Name</th>
                {userdb?.role === "teacher" && <th className="p-2">Student Name</th>}
                <th className="p-2">Submission Date</th>
                <th className="p-2">Marks</th>
                <th className="p-2">Feedback</th>
                <th className="p-2">Action</th>
                <th className="p-2">{userdb?.role === "teacher" && "Action"}</th>
              </tr>
            </thead>
            <tbody>
              {submissions?.length ? submissions?.map((submission, index) => (
                <tr key={submission._id} className="hover:bg-gray-200">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2">{submission.assignmentName}</td>
                  {userdb?.role === "teacher" && <td className="p-2">{submission.student_name}</td>}
                  <td className="p-2">{submission.submitAt.split("T")[0]}</td>
                  <td className="p-2">{submission.student_marks && submission.student_marks}</td>
                  <td className="p-2">{submission.assignment_feedback && submission.assignment_feedback}</td>
                  <td className="p-2 text-center">
                    {submission.submit_file && (
                      <button
                        onClick={() =>
                          handleDownloadSubmitAssignment(submission.submit_file)
                        }
                        className="bg-[#004085] btn btn-sm text-white"
                      >
                        Download
                      </button>
                    )}
                  </td>
                  {userdb?.role === "teacher" && (
                    <td className="p-2 text-center">
                      {submission.submit_file && (
                        <button
                          className="bg-green-600 btn btn-sm text-white"
                          onClick={() => {
                            setIsModalOpen(true);
                            setClassId(submission.classID);
                            setAssignmentId(submission.assignmentId);
                            setSubmissionId(submission._id);
                          }}
                        >
                          Feedback
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              )) : <tr><td colSpan={8} className="py-4 text-center">No submissions yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <AssignmentFeedbackModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        classId={classId}
        assignmentId={assignmentId}
        submissionId={submissionId}
        refetch={refetch}
      ></AssignmentFeedbackModal>
    </div>
  );
};

export default AllAssignments;
