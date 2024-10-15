import PropTypes from "prop-types";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../CustomHooks/useAxiosPrivate";

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

  const onSubmit = async (data) => {
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
        onRequestClose();
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
      style={{
        content: {
          width: "50%",
          height: "50%",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          zIndex: 1050,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="">
          <input
            {...register("student_marks", { required: true })}
            type="number"
            placeholder="Marks"
            className="input input-bordered w-full mb-2 pt-2"
          />
        </div>
        <div className="">
          <input
            {...register("assignment_feedback", { required: true })}
            type="text"
            placeholder="Feedback"
            className="input input-bordered w-full mb-2 pt-2"
          />
        </div>

        <div className="flex justify-center flex-col lg:flex-row gap-1">
          <button
            type="submit"
            className="btn btn-sm bg-[#004085] text-white rounded"
          >
            Submit
          </button>
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
