import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const Topics = ({topics}) => (
    <div>
      {topics.map((topic, index) => (
          <Link to={`/topics/${index}`}>
            <div key={index}>
              {topic.image
                  ? <img src={topic.image} alt={topic.topic_name}/>
                  : null}
              <div>{topic.topic_name}</div>
            </div>
          </Link>
      ))}
    </div>
);

Topics.propTypes = {
  topics: PropTypes.array.isRequired,
};
export default Topics;