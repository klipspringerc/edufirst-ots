import React from 'react';

const Topics = ({topics}) => (
    <div>
      <img src={topic.image}/>
      <div>{topic.topic}</div>
    </div>
);

export default Topics;