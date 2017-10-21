import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const QuestionSimple = ({title, author, votes, topAnswer, questionId, authorId}) => {
  return (
      <div className="question-simple">
        <table>
          <tbody>
          <tr>
            <td className="question-title">
              <Link to={`/questions/${questionId}`}>{title}</Link>
            </td>
            <td className="author">
              <Link to={`/profile/${authorId}`}>{author}</Link>
            </td>
          </tr>
          <tr>
            <td className="votes">{votes}</td>
            <td className="topAnswer">
              <Link to={`/questions/${questionId}`}>{topAnswer}</Link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  );
};

QuestionSimple.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  topAnswer: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
};

export default QuestionSimple;