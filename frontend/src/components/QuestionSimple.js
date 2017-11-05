import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const QuestionSimple = ({title, author, votes, topAnswer, questionId}) => (
    <div className="question-simple">
      <table>
        <tbody>
        <tr>
          <td className="question-title">
            <Link to={`/questions/${questionId}`}>{title}</Link>
          </td>
          <td className="author">{author}</td>
        </tr>
        <tr>
          <td className="votes">{votes}</td>
          {topAnswer ? (<td className="topAnswer">
            <Link to={`/questions/${questionId}`}>{topAnswer}</Link>
          </td>) : null}
        </tr>
        </tbody>
      </table>
    </div>
);

QuestionSimple.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  topAnswer: PropTypes.string,
  questionId: PropTypes.number.isRequired,
};

export default QuestionSimple;