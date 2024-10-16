import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAssignmentAdd } from "react-icons/md";
import Modal from "react-modal";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddAssignmentModal = ({ isOpen, onRequestClose, classId, refetch }) => {
  const { register, handleSubmit, reset } = useForm();

  const [file, setFile] = useState();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("marks", data.marks);
    formData.append("dueDate", data.dueDate);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axiosPublic.patch(
        `/classes/${classId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("added:", response.data);

      reset();
      onRequestClose();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Assignment posted successfully",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    } catch (error) {
      console.error("assignment not added", error);
    }
  };

  return (
    <div className="relative z-50">
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className="flex gap-2">
          <MdAssignmentAdd size={25} />
          <h2 className="text-2xl font-semibold mb-4">Upload Assignment</h2>
        </div>
        {/* assignment form */}
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Title"
              className="input input-bordered mb-2"
            />
          </div>

          <div className="form-control">
            <textarea
              {...register("description", { required: true })}
              type="text"
              placeholder="Description"
              className="textarea textarea-bordered textarea-md mb-2"
            />
          </div>

          <div className="form-control">
            <input
              {...register("marks", { required: true })}
              type="text"
              placeholder="Marks"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Due Date</span>
            </label>
            <input
              {...register("dueDate", { required: true })}
              type="date"
              className="input input-bordered mb-2"
            />
          </div>

          <div className="">
            <input
              {...register("file", { required: true })}
              type="file"
              accept=".pdf,.doc,.docx,.zip,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="input input-bordered w-full lg:w-1/3 mb-2 pt-2"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onRequestClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#004085] text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

AddAssignmentModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  classId: PropTypes.string,
  refetch: PropTypes.func,
};

export default AddAssignmentModal;
