// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useCallback, useEffect, useState } from "react";
import AssignmentSubmitCard from "./AssignmentSubmitCard";
import fileDownload from "js-file-download";

const AllAssignments = () => {
  const { userdb } = useUser();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [assignmentSubmissions, setAssignmentSubmissions] = useState([]);

  const {
    data: classes = [], // Set default value to an empty array to avoid undefined issues
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classes", user?.email], // Unique key for caching
    queryFn: async () => {
      if (!user?.email) return []; // Prevent query if email is not available
      const res = await axiosPublic.get(
        `/classes/${userdb.role}?email=${user?.email}`
      );
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!user?.email, // Only run the query if the user has an email
  });

  // Using useCallback to avoid unnecessary re-renders
  const extractSubmissions = useCallback(() => {
    const submissions = [];
    classes.forEach((cls) => {
      cls?.assignments?.forEach((assignment) => {
        assignment?.assignmentSubmissions?.forEach((submission) => {
          submissions.push(submission);
        });
      });
    });
    setAssignmentSubmissions(submissions);
  }, [classes]);

  useEffect(() => {
    extractSubmissions();
  }, [extractSubmissions]);

  // For download submitted assignment
  const handleDownloadSubmitAssignment = async (filename) => {
    const submittedFileName = filename.replace("/submittedAssignments/", "");
    
    axiosPublic({
      url: `classes/submitted-file-download/${encodeURIComponent(submittedFileName)}`,
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
      {userdb?.role === "teacher" ? (
        <div className="flex-grow overflow-hidden">
          <div className="overflow-x-auto h-full border rounded">
            <table className="table-auto w-full">
              {/* Table Head */}
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
                {assignmentSubmissions.map((submission, index) => (
                  <tr key={submission._id} className="hover:bg-gray-200">
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2">{submission.assignment_name}</td>
                    <td className="p-2">{submission.student_name}</td>
                    <td className="p-2">
                      {submission.submitAt.split("T")[0]}
                    </td>
                    <td className="p-2 text-center">
                      {submission.submit_file && (
                        <button
                        onClick={()=>handleDownloadSubmitAssignment(submission.submit_file)} 
                        className="bg-[#004085] btn btn-sm text-white">
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

AllAssignments.propTypes = {};

export default AllAssignments;
