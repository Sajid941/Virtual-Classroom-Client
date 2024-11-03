import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Swal from "sweetalert2";
import { MdAssignment, MdQuiz } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import useTotalClassCount from "../../CustomHooks/useTotalClassCount";
import useRole from "../../CustomHooks/useRole";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
const ClassCard = ({ classData, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const { refetchTotalClassCount } = useTotalClassCount();
  const { role } = useRole();
  const {user} =useContext(AuthContext)

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      imageUrl: "https://i.ibb.co/hgXFcw0/classNet.png",
      imageHeight: "120",
      imageWidth: "120",
      showCancelButton: true,
      confirmButtonColor: "#004085",
      cancelButtonColor: "#007BFF",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(
            `/classes/delete/${classData?.classId}`
          );
          Swal.fire("Deleted!", response.data.message, "success");
          // Call refetch or any function to refresh your data
          refetch();
          refetchTotalClassCount();
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was a problem deleting the class.",
            "error"
          );
          console.error("Error deleting the class:", error);
        }
      }
    });
  };
  const handleLeave = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      imageUrl: "https://i.ibb.co/hgXFcw0/classNet.png",
      imageHeight: "120",
      imageWidth: "120",
      showCancelButton: true,
      confirmButtonColor: "#004085",
      cancelButtonColor: "#007BFF",
      confirmButtonText: "Yes, Leave the class!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.patch(
            `/classes/leave/${classData?.classId}?email=${user?.email}`
          );
          Swal.fire("success !", response.data.message, "success");
          // Call refetch or any function to refresh your data
          refetch();
          refetchTotalClassCount();
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was a problem deleting the class.",
            "error"
          );
          console.error("Error deleting the class:", error);
        }
      }
    });
  };

  return (
    <div className="relative px-5 md:px-0">
      {role === "student" ? (
        <>
          <div
            className="absolute top-2 right-4 text-2xl text-white p-2 rounded cursor-pointer bg-Primary group z-30 hover:text-red-400"
            onClick={handleLeave}
          >
            <div className=" lg:tooltip" data-tip="Leave class">
              <ImExit />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="absolute top-2 right-4 text-2xl text-white p-2 rounded cursor-pointer bg-Primary group z-30 hover:text-red-400"
            onClick={handleDelete}
          >
            <div className=" lg:tooltip" data-tip="delete class">
              <FaTrash className="" />
            </div>
          </div>
        </>
      )}

      <Link
        className="wrap group shadow w-full my-4 rounded-xl relative "
        to={`/class/${classData?.classId}`}
      >
        <div className="rounded-xl overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          <div
            className="bg-cover h-[200px] md:h-[250px] lg:h-[300px] text-white relative"
            style={{ backgroundImage: `url(${classData?.classImage})` }}
          >
            <div className="bg-black/30 w-full h-full absolute"></div>
            <div className="relative px-5 py-5 ">
              <h2 className="font-bold text-lg ">{classData?.className}</h2>
              <p>
                <span className="block">Section: {classData?.section}</span>
                <span className="block font-semibold">
                  Subject: {classData?.subject}
                </span>
              </p>
            </div>
          </div>
          <div className="px-4 py-2 mb-5 bg-[#004085] text-white flex justify-between items-center rounded-b-xl">
            <p>
              Conducting By:{" "}
              <span className="font-semibold">{classData?.teacher.name}</span>
            </p>
            <div className="flex space-x-2 ">
              {classData?.quizzes?.length > 0 ? (
                <>
                  <div
                    className="text-2xl tooltip"
                    data-tip={`${classData.quizzes.length} quiz`}
                  >
                    <MdQuiz />
                  </div>
                </>
              ) : (
                <></>
              )}
              {classData?.assignments?.length > 0 ? (
                <>
                  <div
                    className="text-2xl tooltip "
                    data-tip={`${classData.assignments.length} assignment`}
                  >
                    <MdAssignment />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClassCard;
ClassCard.propTypes = {
  classData: PropTypes.object,
  refetch: PropTypes.func,
};
