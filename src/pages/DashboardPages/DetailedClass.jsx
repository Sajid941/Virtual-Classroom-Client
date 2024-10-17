// src/Pages/DetailedClass/DetailedClass.jsx

import { useContext, useState, useEffect } from "react";
import { GoFileCode, GoComment, GoFileZip } from "react-icons/go";
import { AiOutlineLeft } from "react-icons/ai"; // Import the left arrow icon
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import fileDownload from "js-file-download";

import useRole from "../../CustomHooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import AddAssignmentModal from "../../Components/AddAssignmentModal/AddAssignmentModal";
import AddQuizModal from "../../Components/AddQuizModal/AddQuizModal"; // Import the AddQuizModal
import JoinMeetButton from "../../Components/DashboardComponent/JoinMeetButton";
import { IoDocumentAttachOutline } from "react-icons/io5";
import SubmitAssignmentModal from "../../Components/SubmitAssignmentModal/SubmitAssignmentModal";
import ChatTab from "../../Components/ClassComponents/ChatTab";
import SubmitQuizModal from "../../Components/SubmitQuizModal/SubmitQuizModal";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const DetailedClass = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { role } = useRole();

  const axiosPublic = useAxiosPublic();
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isSubmitAssignmentModalOpen, setIsSubmitAssignmentModalOpen] =
    useState(false);

  const [canTakeQuiz, setCanTakeQuiz] = useState(true); // To check if student can take quiz
  const [quizResult, setQuizResult] = useState(null); // To store the quiz result

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false); // State for AddQuizModal
  const [isSubmitQuizModalOpen, setIsSubmitQuizModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // State to store selected quiz
  const [students, setStudents] = useState(null); // State to store selected quiz

  // Fetch classes based on the user's email
  const {
    data: classData = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["class", id], // Unique key for caching
    queryFn: async () => {
      if (!user?.email) return {}; // Prevent query if email is not available
      const res = await axiosPublic.get(`classes/classid?id=${id}`);
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!user?.email, // Only run the query if the user has an email
  });

  // Initialize students from classData
  useEffect(() => {
    if (classData.students) {
      setStudents(classData.students);
    }
  }, [classData.students]);

  // Handle download assignment
  const handleDownloadAssignment = async (filename) => {
    const cleanedFileName = filename.replace("/assignmentUploads/", "");

    axiosPublic({
      url: `classes/download/${encodeURIComponent(cleanedFileName)}`,
      method: "GET",
      responseType: "blob", // Important for handling binary files
    })
      .then((response) => {
        fileDownload(response.data, cleanedFileName);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        toast.error("Failed to download the assignment. Please try again.");
      });
  };

  // Handle delete of teacher added assignment
  const handleDeleteFile = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosPublic.delete(`classes/delete/${id}`);

        if (response.data.message) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  useEffect(() => {
    const checkQuizSubmission = async () => {
      try {
        const response = await axiosPublic.get(
          `/classes/${id}/quizsubmission/${user.email}`
        );
        if (response) {
          setCanTakeQuiz(false); // Student can take the quiz
          console.log(response.data);
          setQuizResult(response.data.submission); // Set the quiz result if it exists
        } else {
          setCanTakeQuiz(true); // Student can take the quiz
        }
      } catch (error) {
        console.error("Error checking quiz submission:", error);
      }
    };
    if (user?.email) {
      checkQuizSubmission();
    }
  }, [user.email]);

  console.log(canTakeQuiz, quizResult);
  const handleTakeQuiz = (quiz) => {
    console.log(quiz);
    setSelectedQuiz(quiz); // Set the selected quiz
    setIsSubmitQuizModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-[300px] md:h-[400px] text-white"
        style={{ backgroundImage: `url(${classData.classImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-0 flex flex-col items-center justify-center text-center h-full px-5">
          <button
            className="absolute top-5 left-5 flex items-center bg-[#004085] text-white px-4 py-2 rounded-md"
            onClick={() => navigate(-1)}
          >
            <AiOutlineLeft className="mr-2" /> {/* Arrow Icon */}
            Back
          </button>
          <h1 className="text-3xl md:text-5xl font-bold">
            {classData.className}
          </h1>
          <p className="mt-2 text-lg">
            Section: {classData.section} | Subject: {classData.subject}
          </p>
          <p className="text-lg font-semibold">
            Conducted by: {classData.teacher?.name}
          </p>
          <div className="mt-6">
            <JoinMeetButton id={id} />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto py-10 px-5 md:px-10">
        <Tabs>
          <TabList className="flex space-x-4 border-b mb-4">
            <Tab className="px-4 py-2 cursor-pointer">Resources</Tab>
            <Tab className="px-4 py-2 cursor-pointer">Assignments</Tab>
            <Tab className="px-4 py-2 cursor-pointer">Quizzes</Tab>
            <Tab className="px-4 py-2 cursor-pointer">Chat</Tab>
            <Tab className="px-4 py-2 cursor-pointer">Students</Tab>
          </TabList>

          {/* Resources Tab */}
          <TabPanel>
            <div className="bg-white p-6 shadow rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Resources</h2>
              <div className="flex flex-wrap space-x-4">
                {classData?.resources?.length ? (
                  classData.resources.map((resource, index) => (
                    <button
                      key={index}
                      className="p-3 rounded-lg bg-gray-200 flex flex-col items-center mb-4"
                      onClick={() => {
                        // Handle resource click if needed
                      }}
                    >
                      {resource.type === "ZIP" && <GoFileZip size={30} />}
                      {resource.type === "Code" && <GoFileCode size={30} />}
                      {resource.type === "Comments" && <GoComment size={30} />}
                      <p className="mt-2 text-sm">{resource.description}</p>
                    </button>
                  ))
                ) : role === "teacher" ? (
                  <div className="text-center">
                    <p>No resources available.</p>
                    <button className="mt-3 bg-[#004085] text-white px-4 py-2 rounded-lg">
                      Add Resource
                    </button>
                  </div>
                ) : (
                  <p>No resources available.</p>
                )}
              </div>
            </div>
          </TabPanel>

          {/* Assignments Tab */}
          <TabPanel>
            <div className="bg-white p-6 shadow rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Assignments</h2>
              {classData?.assignments?.length ? (
                classData.assignments.map((assignment, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4"
                  >
                    <h3 className="font-semibold text-lg">
                      {assignment.title}
                    </h3>
                    <p className="text-sm">
                      <span className="font-semibold">Description: </span>
                      {assignment.description}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Total Marks: </span>
                      {assignment.marks}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Due Date: </span>
                      {new Date(assignment.end).toLocaleDateString()}
                    </p>
                    {assignment.fileUrl && (
                      <p className="text-sm">
                        <span className="font-semibold">File: </span>
                        {assignment.fileUrl.split("-")[1]}
                      </p>
                    )}

                    {assignment.fileUrl && (
                      <button
                        onClick={() =>
                          handleDownloadAssignment(assignment.fileUrl)
                        }
                        className="bg-[#004085] text-white px-4 py-2 rounded-lg hover:bg-gray-400"
                      >
                        Download
                      </button>
                    )}

                    {assignment.fileUrl && (
                      <button
                        onClick={() => handleDeleteFile(assignment._id)}
                        className="bg-[#004085] text-white px-4 py-2 rounded-lg hover:bg-gray-400"
                      >
                        Delete
                      </button>
                    )}

                    {role === "student" && (
                      <div>
                        {assignment.assignmentSubmissions &&
                        assignment.assignmentSubmissions.find(
                          (submitted_student) =>
                            submitted_student.student_email === user?.email
                        ) ? (
                          <h3 className="border p-1 text-green-600 font-semibold">
                            Submitted
                          </h3>
                        ) : (
                          <button
                            onClick={() => setIsSubmitAssignmentModalOpen(true)}
                            className="bg-[#004085] text-white px-4 py-2 rounded-lg flex gap-1 items-center hover:bg-gray-400"
                          >
                            <IoDocumentAttachOutline size={18} />
                            Submit
                          </button>
                        )}
                        {/* Submit assignment modal */}
                        <SubmitAssignmentModal
                          isOpen={isSubmitAssignmentModalOpen}
                          onRequestClose={() =>
                            setIsSubmitAssignmentModalOpen(false)
                          }
                          assignment={assignment}
                          classId={classData.classId}
                        />
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                ))
              ) : role === "teacher" ? (
                <div className="text-center">
                  <p>No assignments available.</p>
                  <button
                    onClick={() => setIsAssignmentModalOpen(true)}
                    className="mt-3 bg-[#004085] text-white px-4 py-2 rounded-lg"
                  >
                    Add Assignment
                  </button>

                  {/* Modal for adding assignment */}
                  <AddAssignmentModal
                    isOpen={isAssignmentModalOpen}
                    onRequestClose={() => setIsAssignmentModalOpen(false)}
                    classId={classData.classId}
                    refetch={refetch}
                  />
                </div>
              ) : (
                <p>No assignments available.</p>
              )}
            </div>
          </TabPanel>

          {/* Quizzes Tab */}
          <TabPanel>
            <div className="bg-white p-6 shadow rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
              <div className="grid gap-5">
                {classData?.quizzes?.length ? (
                  classData.quizzes.map((quiz, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg mb-4 shadow"
                    >
                      <h3 className="font-semibold text-lg">{quiz.title}</h3>
                      <p className="text-md">{quiz.description}</p>
                      <p className="text-sm">
                        <span className="font-semibold">Due: </span>
                        {new Date(quiz.dueDate).toLocaleDateString()}
                      </p>

                      {/* Check if the user can take the quiz */}
                      {canTakeQuiz ? (
                        <>
                          {/* Show the "Take Quiz" button if the user can take the quiz */}
                          <button
                            onClick={() => handleTakeQuiz(quiz.questions)}
                            className="mt-2 bg-[#004085] text-white px-4 py-2 rounded-lg"
                          >
                            Take Quiz
                          </button>

                          {/* SubmitQuizModal for quiz submission */}
                          <SubmitQuizModal
                            isOpen={isSubmitQuizModalOpen}
                            quiz={quiz}
                            onRequestClose={() =>
                              setIsSubmitQuizModalOpen(false)
                            }
                            classId={id}
                            refetch={refetch}
                          />
                        </>
                      ) : (
                        <>
                          {/* Show quiz result if the user has already taken the quiz */}
                          <div className="badge badge-warning font-bold animate-pulse p-4 rounded-2xl ">
                            <p>
                              You have scored {quizResult?.score}/
                              {quizResult?.totalQuestions}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : role === "teacher" ? (
                  <div className="text-center">
                    <p>No quizzes available.</p>
                    <button
                      onClick={() => setIsQuizModalOpen(true)}
                      className="mt-3 bg-[#004085] text-white px-4 py-2 rounded-lg"
                    >
                      Add Quiz
                    </button>
                    <AddQuizModal
                      isOpen={isQuizModalOpen}
                      onRequestClose={() => setIsQuizModalOpen(false)}
                      classId={classData.classId}
                      refetch={refetch}
                    />
                  </div>
                ) : (
                  <p>No quizzes available.</p>
                )}
              </div>
            </div>
          </TabPanel>

          {/* Chat Tab */}
          <TabPanel>
            <ChatTab classroomId={id} />
          </TabPanel>

          {/* Students Tab */}
          <TabPanel>
            <div className="bg-white p-6 shadow rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Students</h2>
              {students?.length ? (
                <ul className="space-y-3">
                  {students.map((student, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            student.profileImage ||
                            "https://via.placeholder.com/40"
                          }
                          alt="Profile"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <p className="font-semibold">{student.name}</p>
                      </div>
                      <p className="text-gray-500">{student.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No students found.</p>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
};

export default DetailedClass;
