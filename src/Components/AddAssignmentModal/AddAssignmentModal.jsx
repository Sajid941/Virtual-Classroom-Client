import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const AddAssignmentModal = ({ isOpen, onRequestClose }) => {
  const { register, handleSubmit } = useForm();

  const [file, setFile] = useState();

  const onSubmit = () => {};
  return (
    <div className="">
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
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
          
          <div className="form-control">
            <input
              {...register("file", { required: true })}
              type="file"
              accept=".pdf,.doc,.docx,.zip"
              placeholder="upload file"
              onChange={(e)=>setFile(e.target.files[0])}
              className="input input-bordered mb-2"
            />
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onRequestClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
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