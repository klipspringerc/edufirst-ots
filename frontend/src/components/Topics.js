import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '80%',
    height: 450,
    overflowY: 'auto',
  },
};
const Topics = ({topics}) => (
    <div style={styles.root}>
      <GridList
          cellHeight={80}
          style={styles.gridList}>
        {topics.map(topic => (
            <Link to={`/topics/${topic.topic_name}`}>
              <GridTile
                  title={topic.topic_name}
                  actionIcon={<IconButton><StarBorder
                      color="white"/></IconButton>}>
              </GridTile>
              <AlarmIcon/>
            </Link>
        ))}
      </GridList>
    </div>
);

Topics.propTypes = {
  topics: PropTypes.array.isRequired,
};
Topics.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};
export default Topics;