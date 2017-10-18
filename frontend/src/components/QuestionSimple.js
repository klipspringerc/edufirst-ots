import React from 'react';

const QuestionSimple = ({title, author, votes, topAnswer}) => {
  return (
      <div className="question-simple">
        <table>
          <tr>
            <td className="question-title">{title}</td>
            <td className="author">{author}</td>
          </tr>
          <tr>
            <td className="votes">{votes}</td>
            <td className="topAnswer">{topAnswer}</td>
          </tr>
        </table>
      </div>
  );
};
export default QuestionSimple;