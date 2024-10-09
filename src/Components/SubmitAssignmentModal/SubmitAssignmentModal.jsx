import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import useUser from "../../CustomHooks/useUser";
import useAxiosPrivate from "../../CustomHooks/useAxiosPrivate";

const SubmitAssignmentModal = ({ isOpen, onRequestClose, classId, assignment}) => {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  const { userdb, refetch } = useUser();
  const { title, _id } = assignment;

  const onSubmit = async () => {
    const formData = new FormData();

    formData.append("assignment_name", title);
    formData.append("student_name", userdb.name);
    formData.append("student_email", userdb.email);

    if (file) {
      formData.append("submit_file", file);
    }

    try {
      const response = await axiosPrivate.patch(`/classes/${classId}/assignments/${_id}/submissions`, formData, {headers: {"Content-Type": "multipart/form-data"}})
      if(response.data){
        console.log("Submitted successfully", response.data);
        reset();
        onRequestClose();
        refetch();
      }
    } catch (error) {
      console.error("Assignment not submitted", error)
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
        <h2 className="font-semibold text-lg">{title}</h2>

        <div className="">
          <input
            {...register("file", { required: true })}
            type="file"
            accept=".pdf,.doc,.docx,.zip,.txt"
            onChange={(e) => setFile(e.target.files[0])}
            className="input input-bordered w-full mb-2 pt-2"
          />
        </div>

        <div className="flex justify-center gap-1">
          <button
            type="submit"
            className="px-4 py-2 bg-[#004085] text-white rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

SubmitAssignmentModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  assignment: PropTypes.object,
  classId: PropTypes.string,
};

export default SubmitAssignmentModal;
