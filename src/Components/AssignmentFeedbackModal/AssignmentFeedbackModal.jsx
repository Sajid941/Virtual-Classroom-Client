import PropTypes from "prop-types";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../CustomHooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { useState } from "react";

const AssignmentFeedbackModal = ({
  isOpen,
  onRequestClose,
  classId,
  assignmentId,
  submissionId,
  refetch,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.patch(
        `/classes/${classId}/assignments/${assignmentId}/assignmentSubmissions/${submissionId}`,
        {
          student_marks: data.student_marks,
          assignment_feedback: data.assignment_feedback,
        }
      );
      
      if (res.data) {
        reset();
        setIsLoading(false);
        onRequestClose();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Feedback has been saved",
          showConfirmButton: false,
          timer: 2000
        });
        refetch();
      }
    } catch (error) {
      console.error("Failed to add", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-[90%] sm:w-[70%] md:w-[50%] max-h-[80%] p-5 bg-white rounded-lg shadow-lg z-[1050] overflow-auto relative"
  overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="card-body z-40">
        <div className="">
          <input
            {...register("student_marks", { required: true })}
            type="number"
            placeholder="Marks"
            className="input input-bordered w-full mb-2 pt-2"
          />
        </div>
        <div className="">
          <textarea
            {...register("assignment_feedback", { required: true })}
            type="text"
            placeholder="Feedback"
            className="textarea textarea-bordered w-full mb-2 pt-2"
          />
        </div>

        <div className="flex justify-center flex-col lg:flex-row gap-1">
        {isLoading ? (
            <div className="w-24 px-4 py-2 bg-[#004085] text-white rounded-md flex justify-center items-center">
              <span className="loading loading-spinner w-4"></span>
            </div>
          ) :
          <button
            type="submit"
            className="btn btn-sm bg-[#004085] text-white rounded"
          >
            Submit
          </button>}
          <button
            type="button"
            onClick={onRequestClose}
            className="btn btn-sm bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

AssignmentFeedbackModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  classId: PropTypes.string,
  assignmentId: PropTypes.string,
  submissionId: PropTypes.string,
  refetch: PropTypes.func,
};

export default AssignmentFeedbackModal;
