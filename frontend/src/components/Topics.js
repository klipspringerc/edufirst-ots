import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import AlarmIcon from 'material-ui/svg-icons/action/alarm';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
        style={styles.gridList}
      >
        {topics.map((topic) => (
          <Link to={`/topics/${topic.topic_name}`}>
          <GridTile
            title={topic.topic_name}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
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