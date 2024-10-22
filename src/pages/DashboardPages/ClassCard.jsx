import { GoFileCode, GoComment, GoFileZip } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Swal from "sweetalert2";
import { MdAssignment, MdQuiz } from "react-icons/md";
const ClassCard = ({ classData, refetch }) => {
  const axiosPublic = useAxiosPublic();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      imageUrl: "https://i.ibb.co/hgXFcw0/classNet.png",
      imageHeight: "120",
      imageWidth: "120",
      showCancelButton: true,
      confirmButtonColor: "#004085",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(
            `/classes/delete/${classData?.classId}`
          );
          console.log(response);
          Swal.fire("Deleted!", response.data.message, "success");
          // Call refetch or any function to refresh your data
          refetch();
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
    <div className="relative">
      <div className="absolute top-2 right-4 text-3xl text-white p-2 rounded hover:shadow-gray-800 cursor-pointer hover:bg-red-700 backdrop-blur-sm shadow bg-Primary group z-50 tooltip-accent">
        <div
          className=" lg:tooltip"
          onClick={handleDelete}
          data-tip="delete class"
        >
          <RxCrossCircled className="group-hover:rotate-180 transition-transform duration-500 ease-in-out p-0 pb-0" />
        </div>
      </div>

      <Link
        className="wrap shadow w-full my-4 rounded-xl z-40 relative "
        to={`/class/${classData?.classId}`}
      >
        <div className="rounded-xl overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          <div
            className="bg-cover h-[200px] md:h-[250px] lg:h-[300px] text-white relative z-30"
            style={{ backgroundImage: `url(${classData?.classImage})` }}
          >
            <div className="bg-black/30 w-full h-full absolute"></div>
            <div className="relative px-5 py-5">
              <h2 className="font-bold text-lg z-10">{classData?.className}</h2>
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
                    className="text-2xl tooltip z-40"
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
                    className="text-2xl tooltip z-40"
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
};
