// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useCallback, useEffect, useState } from "react";

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

  console.log(assignmentSubmissions);

  return (
    <div>
      {userdb?.role === "teacher" ? (
        <div>
          <h3>You have {classes.length} classes</h3>
          {assignmentSubmissions.map((submission) => (
            <div key={submission._id}>
              <h3>{submission.assignment_name}</h3>
              <h3>{submission.student_name}</h3>
              <h3>{submission.submitAt}</h3>
              <h3>{submission.submit_file}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3 className="text-lg flex justify-center items-center">
            This page is under development
          </h3>
        </div>
      )}
    </div>
  );
};

AllAssignments.propTypes = {};

export default AllAssignments;
