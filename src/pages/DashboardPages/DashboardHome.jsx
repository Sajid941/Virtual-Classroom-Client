import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";
import useRole from "../../CustomHooks/useRole";
import {
    FaChalkboardTeacher,
    FaTasks,
    FaClipboardList,
    FaUsers,
} from "react-icons/fa";
import Loading from "../../Components/Loading";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Helmet } from "react-helmet-async";

const DashboardHome = () => {
    const { userdb } = useUser();
    const { role } = useRole();

    const [assignmentCount, setAssignmentCount] = useState(0);
    const [submissions, setSubmissions] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const axiosPublic = useAxiosPublic();

    const axiosPublicMemo = useMemo(() => axiosPublic, [axiosPublic]);

    const {
        data: classes = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["classes", userdb?.email],
        queryFn: async () => {
            if (!userdb?.email) return [];
            const res = await axiosPublic.get(
                `/classes/${role}?email=${userdb.email}`
            );
            return res.data;
        },
        keepPreviousData: true,
        enabled: !!userdb?.email,
    });

    useEffect(() => {
        const totalAssignments = classes.reduce(
            (acc, cls) => acc + cls.assignments.length,
            0
        );

        setAssignmentCount(totalAssignments);
    }, [classes]);
    //total students
    const totalStudents = classes.reduce((acc, currentClass) => {
        return acc + (currentClass.students?.length || 0);
    }, 0);

    // State to track whether submissions have been fetched
    const [submissionsFetched, setSubmissionsFetched] = useState(false);

    useEffect(() => {
        const fetchSubmissions = async () => {
            if (!userdb?.email || submissionsFetched) return;

            try {
                const response = await axiosPublicMemo.get(
                    `/quizzes/submissions`,
                    {
                        params: { studentEmail: userdb.email },
                    }
                );

                setSubmissions(response.data.submissions);
                setSubmissionsFetched(true); // Mark submissions as fetched
            } catch (err) {
                console.error("Error fetching quiz submissions:", err);
            }
        };

        fetchSubmissions();
    }, [axiosPublicMemo, userdb, submissionsFetched]);

    useEffect(() => {
        if (selectedClass) {
            const filtered = classes.filter(
                (submission) => submission.classId === selectedClass
            );
            setFilteredSubmissions(filtered[0]?.quizzes[0]?.submissions);
        }
    }, [classes, filteredSubmissions, selectedClass, submissions]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-error">
                    An error occurred while fetching class data. Please try
                    again later.
                    {error}
                </h1>
            </div>
        );
    }

    const chartData = submissions.map((submission) => ({
        quiz: submission.quizTitle,
        score: submission.score,
    }));

    return (
        <div className="w-full basis-3/5 p-10 rounded-xl min-h-[80vh] bg-secondary">
            <Helmet>
                <title>Dashboard | Class Net</title>
            </Helmet>
            <div className="topText mb-4">
                <h1 className="text-2xl font-bold text-white">
                    Welcome Back, {userdb?.name}
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 z-auto">
                <div className="card bg-white shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105">
                    <div className="flex items-center">
                        <FaChalkboardTeacher className="text-3xl text-blue-500 mr-3" />
                        <div>
                            <h2 className="text-lg font-semibold">Classes</h2>
                            <p className="text-2xl font-bold">
                                {classes?.length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card bg-white shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105">
                    <div className="flex items-center">
                        <FaTasks className="text-3xl text-green-500 mr-3" />
                        <div>
                            <h2 className="text-lg font-semibold">
                                Assignments
                            </h2>
                            <p className="text-2xl font-bold">
                                {assignmentCount}
                            </p>
                        </div>
                    </div>
                </div>
                {role === "student" ? (
                    <>
                        <div className="card bg-white shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105">
                            <div className="flex items-center">
                                <FaClipboardList className="text-3xl text-orange-500 mr-3" />
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Quizzes
                                    </h2>
                                    <p className="text-2xl font-bold">
                                        {submissions.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="card bg-white shadow-lg p-4 rounded-lg transition-transform transform hover:scale-105">
                            <div className="flex items-center">
                                <FaUsers className="text-3xl text-orange-500 mr-3" />
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Total Students
                                    </h2>
                                    <p className="text-2xl font-bold">
                                        {totalStudents}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <hr className="my-7 mx-3 border-gray-400" />
            {role === "teacher" ? (
                <>
                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="class-select"
                            className="block text-lg text-white font-semibold"
                        >
                            Class Wise Quiz Submissions
                        </label>
                        <select
                            id="class-select"
                            className="p-1 rounded"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select Classes</option>
                            {classes.map((cls) => (
                                <option key={cls.classId} value={cls.classId}>
                                    {cls.className}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-5 bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">
                            Quiz Submissions for{" "}
                            {selectedClass
                                ? classes.find(
                                      (cls) => cls.classId === selectedClass
                                  )?.className
                                : "select class"}
                        </h2>
                        <ul>
                            {filteredSubmissions?.length > 0 ? (
                                filteredSubmissions.map((submission) => (
                                    <li key={submission.id} className="mb-2">
                                        <div className="flex justify-between">
                                            <span>
                                                {submission.studentEmail}
                                            </span>
                                            <span>
                                                Score: {submission.score}
                                            </span>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <>
                                    <div className="capitalize bg-red-600 py-3 text-white badge text-center">
                                        no submission for this {"class's"} quiz
                                    </div>
                                </>
                            )}
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    {/* Chart displaying scores */}
                    {submissions.length > 0 ? (
                        <div className="mt-6  rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4 text-center pt-4 text-white">
                                Score Chart
                            </h2>
                            <BarChart width={600} height={300} data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="quiz" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="score" fill="#8884d8" />
                            </BarChart>
                        </div>
                    ) : (
                        <div className="text-center font-bold mt-10 text-white">
                            No quiz submission found
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DashboardHome;