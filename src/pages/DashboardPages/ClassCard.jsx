import { GoFileCode, GoComment, GoFileZip } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Swal from "sweetalert2";
const ClassCard = ({ classData, refetch }) => {
  const axiosPublic = useAxiosPublic();

  const handleDelete = async () => {
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
      <div className="absolute top-2 right-4 text-3xl text-white p-2 rounded hover:shadow-gray-800 cursor-pointer hover:bg-red-700 backdrop-blur-sm shadow bg-Primary group z-50">
        <div
          className="group-hover:rotate-180 transition-transform duration-500 ease-in-out"
          onClick={handleDelete}
        >
          <RxCrossCircled />
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
              {classData?.resources.map((resource, index) => (
                <button key={index} className="p-2 rounded">
                  {resource.type === "ZIP" && <GoFileZip size={30} />}
                  {resource.type === "Code" && <GoFileCode size={30} />}
                  {resource.type === "Comments" && <GoComment size={30} />}
                </button>
              ))}
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
