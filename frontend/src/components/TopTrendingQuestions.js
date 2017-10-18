import React from 'react';

const TopTrendingQuestions = ({questions}) => (
    <ul>
      {questions.map((question, index) => (
          <li key={index}>{question}</li>
      ))}
    </ul>
);

export default TopTrendingQuestions;