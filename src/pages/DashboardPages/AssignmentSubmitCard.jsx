import React from 'react';
import PropTypes from 'prop-types';

const AssignmentSubmitCard = ({submission}) => {
    const {assignment_name, student_name, submitAt, submit_file} = submission;
    return (
        <div >
              <h3>{assignment_name}</h3>
              <h3>{student_name}</h3>
              <h3>{submitAt}</h3>
              <h3>{submit_file}</h3>
            </div>
    );
};

AssignmentSubmitCard.propTypes = {
    submission: PropTypes.object
};

export default AssignmentSubmitCard;