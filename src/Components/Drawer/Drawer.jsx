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

const Drawer = ({ isDrawerOpen, handleToggleDrawer }) => {
  const { role } = useRole();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isJoinClassFormOpen, setIsJoinClassFormOpen] = useState(false); // New state for Join Class form

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = (data) => {
    const classData = {
      classId: generateUniqueClassCode(),
      className: data.className,
      section: data.section,
      subject: data.subject,
      teacher: {
        teacherId: "t001",
        name: "Willy Swik",
      },
      students: [{}],
      classImage:
        "https://i.ibb.co/ngh5dsy/ivan-aleksic-PDRFee-Dni-Ck-unsplash.jpg",
      resources: [],
      quizzes: [],
      assignments: [],
    };
    console.log(classData);
    setIsFormOpen(false);
  };

  const onJoinClassSubmit = (data) => {
    const classCode = data.classCode;
    // Implement logic here to join the class using classCode, such as making an API call.
    console.log("Joining class with code:", classCode);
    setIsJoinClassFormOpen(false);
  };

  return (
    <div className="fixed z-20">
      <div className="drawer md:drawer-open">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={handleToggleDrawer}
        />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side shadow-md">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="scrollbar-hide bg-white overflow-auto mb-2 md:border-2 h-screen md:h-4/5 md:rounded-xl w-64 space-y-5 pt-24 md:pt-5">
            <ul className="space-y-5 p-5 pl-8">
              <li>
                <NavLink to="/dashboard" className="dashboard-link">
                  <IoHomeOutline size={25} />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/assignments" className="dashboard-link">
                  <MdAssignmentAdd size={25} />
                  Assignments
                </NavLink>
              </li>
              {role === "teacher" && (
                <>
                  <li>
                    <NavLink to="/myClasses" className="dashboard-link">
                      <SiGoogleclassroom size={25} />
                      My Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/schedules" className="dashboard-link">
                      <AiOutlineSchedule size={25} />
                      Schedules
                    </NavLink>
                  </li>
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
                  <li>
                    <NavLink to="/myClasses" className="dashboard-link">
                      <SiGoogleclassroom size={25} />
                      Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/performance" className="dashboard-link">
                      <GrDocumentPerformance size={25} />
                      Performance
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsJoinClassFormOpen(true)} // Open the Join Class form
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
        <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-lg w-2/5"
          >
            <h2 className="text-xl font-bold mb-4">Create a Class</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Class Name
              </label>
              <input
                type="text"
                {...register("className", {
                  required: "Class name is required",
                })}
                className={`w-full p-2 border rounded ${
                  errors.className ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.className && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.className.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Section</label>
              <input
                type="text"
                {...register("section", { required: "Section is required" })}
                className={`w-full p-2 border rounded ${
                  errors.section ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.section && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.section.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                className={`w-full p-2 border rounded ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Room</label>
              <input
                type="text"
                {...register("room", { required: "Room is required" })}
                className={`w-full p-2 border rounded ${
                  errors.room ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.room && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.room.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded w-full mt-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              >
                Create Class
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Join Class Form */}
      {isJoinClassFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50">
          <form
            onSubmit={handleSubmit(onJoinClassSubmit)} // Handle class join
            className="bg-white p-6 rounded-lg shadow-lg w-2/5"
          >
            <h2 className="text-xl font-bold mb-4">Join a Class</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Class Code
              </label>
              <input
                type="text"
                {...register("classCode", {
                  required: "Class code is required",
                })}
                className={`w-full p-2 border rounded ${
                  errors.classCode ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.classCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.classCode.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsJoinClassFormOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded w-full mt-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              >
                Join Class
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Drawer;

Drawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  handleToggleDrawer: PropTypes.func,
};
