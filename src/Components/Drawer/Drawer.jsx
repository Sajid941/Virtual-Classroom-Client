import PropTypes from "prop-types";
import "./Drawer.css";

import { SiGoogleclassroom } from "react-icons/si";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdAssignmentAdd, MdAddToPhotos } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useRole from "../../CustomHooks/useRole";
import useUser from "../../CustomHooks/useUser";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import toast from "react-hot-toast";
import axios from "axios";
import useUserType from "../../CustomHooks/useUserType";
import useTotalClassCount from "../../CustomHooks/useTotalClassCount";
import Swal from "sweetalert2";
import useAuth from "../../CustomHooks/useAuth";

const Drawer = ({ isShowDrawer, handleToggleDrawer }) => {
  const [classCode, setClassCode] = useState(""); // state for storing class code
  const { userdb } = useUser();
  const { user } = useAuth();
  const { role } = useRole();
  const axiosPublic = useAxiosPublic();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isJoinClassFormOpen, setIsJoinClassFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userType, refetchUserType } = useUserType();
  const { totalClasses, refetchTotalClassCount } = useTotalClassCount();

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
    reset,
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
    // Procedure to get Cloudinary image link

    // Get the image file from the form
    const imageFile = data.classImage[0]; // Ensure data.classImage is an array
    const formData = new FormData();
    formData.append("file", imageFile); // Use "file" as the key for Cloudinary
    formData.append("upload_preset", "ClassNet"); // Your upload preset

    try {
      // Upload the file to Cloudinary
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dezydstve/image/upload",
        formData
      );
      const uploadedImageUrl = uploadResponse.data.secure_url; // Get the secure URL from the response

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
        classImage: uploadedImageUrl, // Set the classImage to the uploaded image URL
        resources: [],
        quizzes: [],
        assignments: [],
      };

      // Posting class data to the server
      const response = await axiosPublic.post("/classes", classData);
      if (response.status === 201) {
        setClassCode(response.data.classId);
        setIsFormOpen(false);
        setIsModalOpen(true);
        refetchTotalClassCount();
        refetchUserType();
        reset();
      }
    } catch (error) {
      console.error("Error uploading image or posting data:", error);
      toast.error("Failed to upload image or post data");
    }
  };

  const onSubmitJoinClass = async (data) => {
    const classCode = data.classCode;

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

  const handleShowUpgradeModal = () => {
    Swal.fire({
      title: "<strong>Class Creation Limit Reached</strong>",
      imageUrl: "https://i.ibb.co/hgXFcw0/classNet.png",
      imageHeight: "120",
      imageWidth: "120",
      html: `
                  You have reached your limit of <b>5 classes</b> as a normal user.<br>
                  Upgrade to <b>Premium</b> to create unlimited classes!
                `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
                  <i class="fa fa-arrow-up"></i> Upgrade to Premium
                `,
      confirmButtonAriaLabel: "Upgrade to premium",
      confirmButtonColor: "#004085",
      cancelButtonText: `
                  <i class="fa fa-times"></i> Cancel
                `,
      cancelButtonAriaLabel: "Cancel",
      cancelButtonColor: "#007BFF",
    });
  };
  const handlePayment = () => {
    Swal.fire({
      title: "<strong>Payment Confirmation</strong>",
      imageUrl: "https://i.postimg.cc/ydMJrHpC/10149443.png",
      imageHeight: "120",
      imageWidth: "120",
      html: `
              You are about to make a payment of <b>5000</b> BDT for a lifetime subscription.
              </br>
              </br>
              Are you sure you want to proceed?

            `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
              <i class="fa fa-arrow-up"></i> Yes, proceed
            `,
      confirmButtonAriaLabel: "Yes, proceed",
      confirmButtonColor: "#004085",
      cancelButtonText: `
              <i class="fa fa-times"></i> Cancel
            `,
      cancelButtonAriaLabel: "Cancel",
      cancelButtonColor: "#007BFF",
    }).then((result) => {
      if (result.isConfirmed) {
        const userInfo = {
          name: user.displayName,
          email: user.email,
          userId: userdb._id,
        };
        axiosPublic.post("/payment/create-payment", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.paymentUrl) {
            window.location.href = res.data.paymentUrl;
          }
        });
      }
    });
  };

  return (
    <div className="sticky top-20">
      <div className="drawer w-full  md:drawer-open">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={isShowDrawer}
          onChange={handleToggleDrawer}
        />
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="scrollbar-hide bg-white overflow-auto mb-2 md:border-2 h-screen md:h-4/5 md:rounded-xl  space-y-5 pt-5 md:pt-5">
            <ul className="space-y-5 p-5">
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
                <NavLink to="/dashboard/assignments" className="dashboard-link">
                  <MdAssignmentAdd size={25} />
                  Assignments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/classes" className="dashboard-link">
                  <SiGoogleclassroom size={25} />
                  Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/calendar" className="dashboard-link">
                  <AiOutlineSchedule size={25} />
                  Schedules
                </NavLink>
              </li>
              {role === "teacher" && (
                <>
                  <li>
                    <button
                      onClick={
                        userType.userType === "premium"
                          ? () => setIsFormOpen(true)
                          : totalClasses.count === 5
                          ? handleShowUpgradeModal
                          : () => setIsFormOpen(true)
                      }
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
                      onClick={() => setIsJoinClassFormOpen(true)}
                      className="dashboard-link "
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
        <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50 ">
          {userType.userType !== "premium" &&
          totalClasses.count === 5 ? null : (
            <form
              onSubmit={handleSubmitCreateClass(onSubmitCreateClass)}
              className="bg-white p-6 rounded-lg shadow-lg md:w-2/5"
            >
              <h2 className="text-xl font-bold mb-4">Create a Class</h2>
              {/* Class Limitation Message */}
              {userType.userType === "normal" && totalClasses.count < 5 && (
                <div
                  className={`flex gap-2 mb-4 ${
                    totalClasses.count === 4
                      ? "bg-red-100 border border-red-500 text-red-700"
                      : "bg-yellow-100 border border-yellow-500 text-yellow-700 "
                  } px-4 py-3 rounded `}
                >
                  <RiErrorWarningFill
                    className={`mt-[1px] ${
                      totalClasses.count === 4
                        ? "text-red-500 "
                        : "text-yellow-500"
                    } `}
                    size={30}
                  />
                  <p className="">
                    You have {5 - totalClasses.count} out of 5 classes
                    remaining. Upgrade to the{" "}
                    <a
                      onClick={handlePayment}
                      className="underline decoration-yellow-700"
                    >
                      premium
                    </a>{" "}
                    version to create unlimited classes.
                  </p>
                </div>
              )}

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

              {/* Image thumbnail */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Class Thumbnail
                </label>
                <input
                  type="file"
                  {...registerCreateClass("classImage", {
                    required: "Class image is required",
                  })}
                  // accept="image/*"
                  className={`w-full p-2 border rounded ${
                    errorsCreateClass.classImage
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errorsCreateClass.classImage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsCreateClass.classImage.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="btn bg-primary text-white rounded-none"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-secondary text-white rounded-none"
                >
                  Create Class
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Join Class Form */}
      {isJoinClassFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50 ">
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

            <div className="flex justify-end space-x-2 ">
              <button
                type="submit"
                className="btn bg-secondary rounded-none text-white"
              >
                Join Class
              </button>
              <button
                type="button"
                className="btn bg-primary rounded-none text-white"
                onClick={() => setIsJoinClassFormOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal for displaying class code */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-50 ">
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
  isShowDrawer: PropTypes.bool.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
};

export default Drawer;
