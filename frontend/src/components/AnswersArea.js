import PropTypes from 'prop-types';
import React from 'react';

const AnswersArea = ({answers}) => (
    <div>
      {answers.map(answer => (
          <div key={answer.id}>
            <div className="user">{answer.author.username}</div>
            <div className="certificate">{answer.author.certificate}</div>
            <div className="answer-detail">{answer.body}</div>
            <div className="horizontal-rule"/>
            <div className="likes">{answer.votes_total}</div>

            {/*<CommentArea likes={answer.votes_total}*/}
            {/*comments={answer.comments}*/}
            {/*answerId={answer.id}/>*/}
          </div>
      ))}
    </div>
);

AnswersArea.propTypes = {
  answers: PropTypes.array.isRequired,
};

export default AnswersArea;