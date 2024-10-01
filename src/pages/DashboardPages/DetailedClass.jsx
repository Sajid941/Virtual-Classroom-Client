import { useContext, useState } from "react";
import { GoFileCode, GoComment, GoFileZip } from "react-icons/go";
import { AiOutlineLeft } from "react-icons/ai"; // Import the left arrow icon
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import fileDownload from 'js-file-download';

import useRole from "../../CustomHooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import AddAssignmentModal from "../../Components/AddAssignmentModal/AddAssignmentModal";
import JoinMeetButton from '../../Components/DashboardComponent/JoinMeetButton';

const DetailedClass = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const { role } = useRole();

  // Initialize React Hook Form
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetch classes based on the user's email
  const {
    data: classData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["class", id], // Unique key for caching
    queryFn: async () => {
      if (!user?.email) return []; // Prevent query if email is not available
      const res = await axiosPublic.get(`classes/classid?id=${id}`);
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!user?.email, // Only run the query if the user has an email
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className=""></span>
      </div>
    );
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
  // Fetch class data from JSON file
  // useEffect(() => {
  //   const fetchClassData = async () => {
  //     try {
  //       const response = await fetch("/class.json");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       const classDetail = data.find((item) => item.classId === id);

  //       if (!classDetail) {
  //         setError("Class not found");
  //       } else {
  //         setClassData(classDetail);
  //         setStudents(classDetail.students || []);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching class data:", error);
  //       setError("Failed to load class data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchClassData();
  // }, [id]);

  // Handle sending a message
  const onSubmit = (data) => {
    if (data.message.trim()) {
      const newMessage = {
        user: "You", // The user sending the message
        text: data.message,
        time: new Date().toLocaleString(), // Format the current date and time
        replies: [], // Initialize with an empty array for replies
        profileImage: "https://via.placeholder.com/40", // Placeholder for profile image
      };

      // Find the currently logged-in student (this is a placeholder)
      const currentStudent = students.find(
        (student) => student.email === "alice.smith@example.com"
      ); // Replace with actual logged-in student's email

      if (currentStudent) {
        currentStudent.messages.push(newMessage);
        setStudents([...students]); // Trigger re-render
      }

      reset(); // Clear the form
    }
  };

  const handleDownloadAssignment = async(filename)=>{
    
    const cleanedFileName = filename.replace('/assignmentUploads/', '');

    axiosPublic({
      url: `classes/download/${encodeURIComponent(cleanedFileName)}`,
      method: 'GET',
      responseType: 'blob', // Important for handling binary files
    })
    .then((response) => {
      fileDownload(response.data, cleanedFileName);
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-[300px] md:h-[400px] text-white"
        style={{ backgroundImage: `url(${classData.classImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-0 flex flex-col items-center justify-center text-center  h-full px-5">
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
          <JoinMeetButton></JoinMeetButton>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto py-10 px-5 md:px-10">
        <Tabs>
          <TabList className="flex">
            <Tab>Resources</Tab>
            <Tab>Assignments</Tab>
            <Tab>Quizzes</Tab>
            <Tab>Chat</Tab> {/* Changed Comments to Chat */}
            <Tab>Students</Tab>
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
                  <div key={index} className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <h3 className="font-semibold text-lg">{assignment.title}</h3>
                    <p><span className="font-semibold">Description: </span>{assignment.description}</p>
                    <h3 ><span className="font-semibold">Due Date: </span>{assignment.dueDate.split('T')[0]}</h3>
                    <h3>{assignment.fileUrl.split('-')[1]}</h3>

                    {
                      assignment.fileUrl && <button onClick={()=>handleDownloadAssignment(assignment.fileUrl)}>Download</button>
                    }

                  </div>
                ))
              ) : role === "teacher" ? (
                <div className="text-center">
                  <p>No assignments available.</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-3 bg-[#004085] text-white px-4 py-2 rounded-lg"
                  >
                    Add Assignment
                  </button>

                  {/* Modal for adding assignment */}
                  <AddAssignmentModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} classId={classData.classId}></AddAssignmentModal>
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
              {classData?.quizzes?.length ? (
                classData.quizzes.map((quiz, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold">{quiz.title}</h3>
                    <p>{quiz.description}</p>
                  </div>
                ))
              ) : role === "teacher" ? (
                <div className="text-center">
                  <p>No quizzes available.</p>
                  <button className="mt-3 bg-[#004085] text-white px-4 py-2 rounded-lg">
                    Add Quiz
                  </button>
                </div>
              ) : (
                <p>No quizzes available.</p>
              )}
            </div>
          </TabPanel>

          {/* Chat Tab */}
          <TabPanel>
            <div className="bg-white p-6 shadow rounded-lg mb-6 flex flex-col h-[400px]">
              <h2 className="text-2xl font-semibold mb-4">Chat</h2>
              <div className="flex-grow overflow-y-auto p-3 border border-gray-300 rounded-lg">
                <ul className="space-y-3">
                  {students.map((student) =>
                    student.messages.map((message, index) => (
                      <li
                        key={index}
                        className="flex items-start p-3 bg-gray-100 rounded-lg"
                      >
                        <img
                          src={
                            message.profileImage ||
                            "https://via.placeholder.com/40"
                          } // Placeholder for profile image
                          alt={`${message.user}'s profile`}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-semibold">{message.user}</p>
                          <p className="text-gray-600">{message.text}</p>
                          <p className="text-xs text-gray-500">
                            {message.time}
                          </p>
                          {message.replies?.length > 0 && (
                            <div className="ml-5 mt-2">
                              <h3 className="font-semibold">Replies:</h3>
                              {message.replies.map((reply, replyIndex) => (
                                <div
                                  key={replyIndex}
                                  className="bg-blue-100 p-2 rounded-lg mt-1 flex items-start"
                                >
                                  <img
                                    src={
                                      reply.profileImage ||
                                      "https://via.placeholder.com/40"
                                    } // Placeholder for reply profile image
                                    alt={`${reply.user}'s profile`}
                                    className="w-8 h-8 rounded-full mr-2"
                                  />
                                  <div>
                                    <p className="font-semibold">
                                      {reply.user}
                                    </p>
                                    <p className="text-gray-600">
                                      {reply.text}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {reply.time}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <textarea
                  className="w-full p-3 rounded-lg border shadow-sm"
                  placeholder="Type your message..."
                  {...register("message", { required: true })}
                ></textarea>
                <button
                  className="mt-3 bg-[#004085] text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </TabPanel>

          {/* Students Tab */}
          <TabPanel>
            <div className="bg-white p-6 shadow rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Students</h2>
              {classData?.students?.length ? (
                <ul>
                  {classData?.students.map((student, index) => (
                    <li key={index} className="p-2 border-b">
                      {student.name} - {student.email}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No students enrolled in this class.</p>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailedClass;
