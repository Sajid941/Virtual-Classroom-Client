import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import useUser from "../../CustomHooks/useUser";
import useAxiosPrivate from "../../CustomHooks/useAxiosPrivate";
import Swal from "sweetalert2";

const SubmitAssignmentModal = ({
  isOpen,
  onRequestClose,
  classId,
  assignment,
  refetch,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const { userdb } = useUser();
  const { title, _id } = assignment;

  const onSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("student_name", userdb.name);
    formData.append("student_email", userdb.email);

    if (file) {
      formData.append("submit_file", file);
    }

    try {
      const response = await axiosPrivate.patch(
        `/assignment/${classId}/assignments/${_id}/submissions`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
      if (response.data) {
        reset();
        setIsLoading(false);
        onRequestClose();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Submitted successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch (error) {
      console.error("Assignment not submitted", error);
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-[90%] sm:w-[70%] md:w-[50%] max-w-lg h-auto p-5 bg-white rounded-lg shadow-lg overflow-auto relative"
      overlayClassName="fixed inset-0 bg-black/20 flex items-center justify-center"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="card-body z-40">
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

        <div className="flex flex-col lg:flex-row justify-center gap-1">
          {isLoading ? (
            <div className="w-24 px-4 py-2 bg-[#004085] text-white rounded-md flex justify-center items-center">
              <span className="loading loading-spinner w-4"></span>
            </div>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-[#004085] text-white hover:bg-gray-400 rounded-md"
            >
              Submit
            </button>
          )}
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
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
  refetch: PropTypes.func,
};

export default SubmitAssignmentModal;
