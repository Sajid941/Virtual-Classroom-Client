import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const AddAssignmentModal = ({ isOpen, onRequestClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};
  return (
    <div className="">
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        {/* assignment form */}
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            {/* <label className="label">
              <span className="label-text">Title</span>
            </label> */}
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
            <textarea
              {...register("dueDate", { required: true })}
              type="date"
              placeholder="Due Date"
              className="input input-bordered mb-2"
            />
          </div>

          <input type="submit" />
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