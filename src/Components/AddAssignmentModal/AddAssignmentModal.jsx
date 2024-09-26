import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAssignmentAdd } from "react-icons/md";
import Modal from "react-modal";

const AddAssignmentModal = ({ isOpen, onRequestClose }) => {
  const { register, handleSubmit } = useForm();

  const [file, setFile] = useState();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("dueDate", data.dueDate);
    if (file) {
      formData.append("file", file);
    }
  };
  return (
    <div className="">
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
              className="textarea textarea-bordered textarea-md"
            />
          </div>

          <div className="form-control">
            <input
              {...register("dueDate", { required: true })}
              type="date"
              placeholder="Due Date"
              className="input input-bordered mb-2"
            />
          </div>

          <div className="">
            <input
              {...register("file", { required: true })}
              type="file"
              accept=".pdf,.doc,.docx,.zip,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="input input-bordered mb-2 pt-2"
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
};

export default AddAssignmentModal;
