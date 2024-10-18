import PropTypes from "prop-types";
import "./Drawer.css";

import { SiGoogleclassroom } from "react-icons/si";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdAssignmentAdd, MdAddToPhotos } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { GrDocumentPerformance } from "react-icons/gr";

import { NavLink } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useRole from "../../CustomHooks/useRole";
import useUser from "../../CustomHooks/useUser";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import toast from "react-hot-toast";

const Drawer = ({ isDrawerOpen, handleToggleDrawer }) => {
    const [classCode, setClassCode] = useState(""); // state for storing class code
    const { userdb } = useUser();
    const { role } = useRole();
    const axiosPublic = useAxiosPublic();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isJoinClassFormOpen, setIsJoinClassFormOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility

    // Separate useForm for each form
    const {
        register: registerCreateClass,
        handleSubmit: handleSubmitCreateClass,
        formState: { errors: errorsCreateClass },
    } = useForm();

    const {
        register: registerJoinClass,
        handleSubmit: handleSubmitJoinClass,
        formState: { errors: errorsJoinClass },
    } = useForm();

    // Function to generate a 6-digit unique class code
    const generateUniqueClassCode = () => {
        const existingClassCodes = ["c001", "c002", "c003"]; // Replace with actual existing codes
        let code;
        do {
            code = Math.floor(100000 + Math.random() * 900000).toString();
        } while (existingClassCodes.includes(code));
        return code;
    };

    const onSubmitCreateClass = async (data) => {
        const classData = {
            classId: generateUniqueClassCode(),
            className: data.className,
            section: data.section,
            subject: data.subject,
            teacher: {
                name: userdb.name,
                email: userdb.email,
            },
            students: [],
            classImage:
                "https://i.ibb.co/ngh5dsy/ivan-aleksic-PDRFee-Dni-Ck-unsplash.jpg",
            resources: [],
            quizzes: [],
            assignments: [],
        };

        try {
            // Posting data to the server
            const response = await axiosPublic.post("/classes", classData);
            if (response.status === 201) {
                setClassCode(response?.data.classId);
                setIsFormOpen(false);
                setIsModalOpen(true); // Open the modal after successful save
            }
        } catch (error) {
            console.error("Error posting data:", error);
            toast.error("Failed to post data");
        }
    };

    const onSubmitJoinClass = async (data) => {
        const classCode = data.classCode;
        console.log("Joining class with code:", classCode);

        try {
            // Fetch class by class code
            const response = await axiosPublic.get(
                `/classes/classid?id=${classCode}`
            );

            if (response?.data) {
                const classData = response.data;

                // Check if the class exists
                if (classData) {
                    // Prepare student data
                    const studentData = {
                        name: userdb.name,
                        email: userdb.email,
                    };

                    // Patch the class with the new student data
                    const patchResponse = await axiosPublic.patch(
                        `/classes/${classData.classId}/students`,
                        { students: [...classData.students, studentData] }
                    );

                    if (patchResponse.status === 200) {
                        console.log("Student successfully added to the class");
                        window.location.reload();
                    } else {
                        console.error("Failed to add the student to the class");
                    }
                } else {
                    toast.error("Class not found.");
                }
            }
        } catch (error) {
            console.error("Error joining class:", error);
            toast.error("An error occurred while joining the class.");
        }

        setIsJoinClassFormOpen(false);
    };

    return (
        <div className="">
            <div className="drawer w-64 fixed md:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={isDrawerOpen}
                    onChange={handleToggleDrawer}
                />
                <div className="drawer-side ">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="scrollbar-hide bg-white overflow-auto mb-2 md:border-2 h-screen md:h-4/5 md:rounded-xl w-64 space-y-5 pt-24 md:pt-5">
                        <ul className="space-y-5 p-5 pl-8">
                            {/* Sidebar Links */}
                            <li>
                                <NavLink
                                    to="/dashboard/dashboardHome"
                                    className="dashboard-link"
                                >
                                    <IoHomeOutline size={25} />
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/assignments"
                                    className="dashboard-link"
                                >
                                    <MdAssignmentAdd size={25} />
                                    Assignments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/classes"
                                    className="dashboard-link"
                                >
                                    <SiGoogleclassroom size={25} />
                                    Classes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/calendar"
                                    className="dashboard-link"
                                >
                                    <AiOutlineSchedule size={25} />
                                    Schedules
                                </NavLink>
                            </li>
                            {role === "teacher" && (
                                <>
                                    <li>
                                        <button
                                            onClick={() => setIsFormOpen(true)}
                                            className="dashboard-link"
                                        >
                                            <IoCreateOutline size={25} />
                                            Create A Class
                                        </button>
                                    </li>
                                </>
                            )}
                            {role === "student" && (
                                <>
                                    {/* <li>
                                        <NavLink
                                            to="/performance"
                                            className="dashboard-link"
                                        >
                                            <GrDocumentPerformance size={25} />
                                            Performance
                                        </NavLink>
                                    </li> */}
                                    <li>
                                        <button
                                            onClick={() =>
                                                setIsJoinClassFormOpen(true)
                                            }
                                            className="dashboard-link"
                                        >
                                            <MdAddToPhotos size={25} />
                                            Join A Class
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                        <div className="bg-[#004085] lg:hidden text-white w-full p-5">
                            <DashboardSidebar />
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Class Form */}
            {isFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50 z-50">
                    <form
                        onSubmit={handleSubmitCreateClass(onSubmitCreateClass)}
                        className="bg-white p-6 rounded-lg shadow-lg md:w-2/5"
                    >
                        <h2 className="text-xl font-bold mb-4">
                            Create a Class
                        </h2>
                        {/* Form Fields */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Class Name
                            </label>
                            <input
                                type="text"
                                {...registerCreateClass("className", {
                                    required: "Class name is required",
                                })}
                                className={`w-full p-2 border rounded ${
                                    errorsCreateClass.className
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errorsCreateClass.className && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errorsCreateClass.className.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Section
                            </label>
                            <input
                                type="text"
                                {...registerCreateClass("section", {
                                    required: "Section is required",
                                })}
                                className={`w-full p-2 border rounded ${
                                    errorsCreateClass.section
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errorsCreateClass.section && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errorsCreateClass.section.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Subject
                            </label>
                            <input
                                type="text"
                                {...registerCreateClass("subject", {
                                    required: "Subject is required",
                                })}
                                className={`w-full p-2 border rounded ${
                                    errorsCreateClass.subject
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errorsCreateClass.subject && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errorsCreateClass.subject.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsFormOpen(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Create Class
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Join Class Form */}
            {isJoinClassFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50 z-50">
                    <form
                        onSubmit={handleSubmitJoinClass(onSubmitJoinClass)}
                        className="bg-white p-6 rounded-lg shadow-lg md:w-2/5"
                    >
                        <h2 className="text-xl font-bold mb-4">Join a Class</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Class Code
                            </label>
                            <input
                                type="text"
                                {...registerJoinClass("classCode", {
                                    required: "Class code is required",
                                })}
                                className={`w-full p-2 border rounded ${
                                    errorsJoinClass.classCode
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errorsJoinClass.classCode && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errorsJoinClass.classCode.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsJoinClassFormOpen(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Join Class
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal for displaying class code */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/5">
                        <h2 className="text-xl font-bold mb-4">
                            Class Created Successfully
                        </h2>
                        <p>
                            Your class code is: <strong>{classCode}</strong>
                        </p>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Drawer.propTypes = {
    isDrawerOpen: PropTypes.bool.isRequired,
    handleToggleDrawer: PropTypes.func.isRequired,
};

export default Drawer;
