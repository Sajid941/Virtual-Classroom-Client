import PropTypes from "prop-types";
import Modal from "react-modal";

const AddAssignmentModal = ({ isOpen, onRequestClose }) => {
  
  return (
    <div className="">
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        {/* form */}
      </Modal>
    </div>
  );
};

AddAssignmentModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

export default AddAssignmentModal;
