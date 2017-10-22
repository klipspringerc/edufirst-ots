import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const Topics = ({topics}) => (
    <div>
      {topics.map(topic => (
          <Link to={`/topics/${topic.topic_name}`} key={topic.topic_name}>
            <div>
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