import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const QuestionDetail = ({questionId, questionDetail}) => (
    <div className="question-detail">
      <div className="title">{questionDetail.title}</div>
      <div className="description">
        {questionDetail.description ? questionDetail.description : ''}
      </div>
      <Link to={`/question/${questionId}/editAnswer`}>
        <button>Add Answer</button>
      </Link>
    </div>
);

QuestionDetail.propTypes = {
  questionId: PropTypes.string.isRequired,
  questionDetail: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default QuestionDetail;