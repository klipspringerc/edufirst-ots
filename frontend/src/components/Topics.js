import {GridList, GridTile} from 'material-ui/GridList';
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
    height: '100%',
    overflowY: 'auto',
  },
  img: {
    'max-width': 380,
    'max-height': 180,
  },
  GridTile: {
    'max-width': 380,
  },
};
const urlMap = {
  'Algorithm': 'http://www.geeksforgeeks.org/wp-content/uploads/Competitive-Programming-1.jpg',
  'algorithm': 'http://www.geeksforgeeks.org/wp-content/uploads/Competitive-Programming-1.jpg',
  'sql': 'https://msftplayground.com/wp-content/uploads/2017/04/logoAzureSql.png',
  'python': 'https://www.python.org/static/opengraph-icon-200x200.png',
  'javascript': 'https://www.javatpoint.com/images/javascript/javascript_logo.png',
  'algorithm': 'http://www.geeksforgeeks.org/wp-content/uploads/Competitive-Programming-1.jpg',
  'Django': 'https://cdn-images-1.medium.com/max/1200/1*1OBwwxzJksMv0YDD-XmyBw.png',
  'Java': 'https://knowm.org/wp-content/uploads/2015/03/Java_Logo.jpg',
  'android': 'https://static.giantbomb.com/uploads/original/15/157771/2312719-a6.jpg',
  'c++': 'http://www.cbronline.com/wp-content/uploads/2016/07/C.png',
  'big-o': 'https://i.ytimg.com/vi/n0Ig9sYy-nA/maxresdefault.jpg',
  'c++': 'http://www.cbronline.com/wp-content/uploads/2016/07/C.png',
  'c#': 'https://pluralsight.imgix.net/paths/path-icons/csharp-e7b8fcd4ce.png',
  'c': 'http://tvlap.com/images/C-lan.png',
  'computer-science': 'https://www.ccsf.edu/content/ccsf/en/educational-programs/school-and-departments/school-of-science-and-mathematics/computer-science/_jcr_content/flath-department/image/file.res/flath-department.gif',
  'ios': 'http://thebigboss.org/wp-content/uploads/2014/ios_logo.png',
  'jquery': 'https://camo.githubusercontent.com/02ed3f6695f288aedec24c2a329c667281efef5f/687474703a2f2f707265636973696f6e2d736f6674776172652e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031342f30342f6a5175726572792e676966',
  'time-complexity': 'http://codedreaming.com/wp-content/uploads/growth-of-function.png',

};

const Topics = ({topics}) => (
    <div style={styles.root}>
      <GridList
          cellHeight={180}
          style={styles.gridList}>
        {topics.map(topic => (
            <Link to={`/topics/${topic.topic_name}`}>
              <GridTile style={styles.GridTile}
                        title={topic.topic_name}>
                <img style={styles.img} src={urlMap[topic.topic_name]}/>
              </GridTile>
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