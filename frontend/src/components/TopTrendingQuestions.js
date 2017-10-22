import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

const TopTrendingQuestions = ({loading, questions}) => (
    <Row className="show-grid">
      <Col xs={3} xsOffset={9}>
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
      </Col>
    </Row>
);
TopTrendingQuestions.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};
export default TopTrendingQuestions;