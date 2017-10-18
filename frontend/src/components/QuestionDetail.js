import React from 'react';

const QuestionDetail = ({title, description}) => (
    <div className="question-detail">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
);

export default QuestionDetail;