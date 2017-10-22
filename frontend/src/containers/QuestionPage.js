import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import AnswersArea from '../components/AnswersArea';
import QuestionDetail from '../components/QuestionDetail';

const QuestionPage = ({question}) => (
    <div>
      <QuestionDetail questionId={question.id}
                      questionDetail={question.body}/>
      <AnswersArea answers={question.answers}/>
    </div>
);

QuestionPage.propTypes = {
  question: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = ({posts}, {match}) => ({
  question: posts.find(match.params.questionId),
});

export default connect(mapStateToProps)(QuestionPage);