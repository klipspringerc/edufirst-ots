import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTopics} from '../actions/topics';
import Topics from '../components/Topics';

class TopicsPage extends Component {
  static propTypes = {
    topics: PropTypes.array.isRequired,
    handleFetchTopics: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.handleFetchTopics();
  }

  render() {
    return (
        <Topics topics={this.props.topics}/>
    );
  }
}

const mapStateToProps = ({topics}) => ({topics:topics.topics});
const mapDispatchToProps = dispatch => ({
  handleFetchTopics: () => dispatch(fetchTopics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage);