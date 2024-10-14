import PropTypes from 'prop-types';
import Modal from "react-modal";
import { useForm } from "react-hook-form";

const AssignmentFeedbackModal = ({ isOpen, onRequestClose}) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = ()=>{

    }
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
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
  
          <div className="">
            <input
              {...register("assignment_marks", { required: true })}
              type="number"
            //   onChange={(e) => setFile(e.target.files[0])}
              className="input input-bordered w-full mb-2 pt-2"
            />
          </div>
  
          <div className="flex justify-center gap-1">
            <button
              type="submit"
              className="btn btn-sm px-4 py-2 bg-[#004085] text-white rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="btn btn-sm mr-2 px-4 py-2 bg-gray-300 rounded"
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
    onRequestClose: PropTypes.func
};

export default AssignmentFeedbackModal;