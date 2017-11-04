import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const TopTrendingQuestions = ({loading, questions}) => (
    <div>
      {loading ? 'Loading...' : (
          <ul>
            {questions.map(question => (
                <li key={question.id}>
                  <Link to={`/questions/${question.id}`}>
                    {question.title}
                  </Link>
                </li>
            ))}
          </ul>
      )}
    </div>
);
TopTrendingQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default TopTrendingQuestions;