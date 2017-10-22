import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostsByUser} from '../actions/users';
import Profile from '../components/Profile';

class ProfilePage extends Component {
  static propTypes = {
    questions: PropTypes.array.isRequired,
    handleFetchPostsByUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {match, handleFetchPostsByUser} = this.props;
    handleFetchPostsByUser(match.params.userId);
  }

  render() {
    const {user, questions} = this.props;
    const username = user.username;
    return (<Profile name={username} questions={questions}/>);
  }
}

const mapStateToProps = ({user, posts}, {match}) => ({
  questions: posts.userPosts.find(d => d.userId === match.params.userId)
      .posts
      .map(id => posts.posts.find(p => p.id === id)),
});

const mapDispatchToProps = dispatch => ({
  handleFetchPostsByUser: userId => dispatch(fetchPostsByUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);