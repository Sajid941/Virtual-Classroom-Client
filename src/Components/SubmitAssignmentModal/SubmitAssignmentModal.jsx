import PropTypes from 'prop-types';
import Modal from 'react-modal'

const SubmitAssignmentModal = ({isOpen, onRequestClose}) => {

    return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          width: '50%',    
          height: '50%',
          margin: 'auto',
          padding: '20px',      
          borderRadius: '10px',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background for better UX
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
      }}
    >
      <h3>Input file</h3>
    </Modal>
    );
};

SubmitAssignmentModal.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func
};

export default SubmitAssignmentModal;

