import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const QuestionDetail = ({questionId, title, body, allowAddingAnswer}) => (
    <div className="question-detail">
      <div className="title">{title}</div>
      <div className="body">{body}</div>
      <Link to={allowAddingAnswer
          ? `/questions/${questionId}/editAnswer`
          : '/login'}>
        <button>{allowAddingAnswer
            ? 'Add Answer'
            : 'Login to Add Answer'}</button>
      </Link>
    </div>
);

QuestionDetail.propTypes = {
  questionId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  allowAddingAnswer: PropTypes.bool.isRequired,
};

export default QuestionDetail;