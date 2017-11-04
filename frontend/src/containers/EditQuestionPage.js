import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postPost} from '../actions/posts';
import PostForm from '../components/PostForm';

class EditQuestionPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handlePostPost: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(post) {
    const {user, handlePostPost} = this.props;
    handlePostPost(post, user.authentication);
  }

  render() {
    const title = this.props.match.params.title;
    return (
        <PostForm handleSubmit={this.handleSubmit} title={title}/>
    );
  }
}

const mapStateToProps = ({user}) => ({user});
const mapDispatchToProps = dispatch => ({
  handlePostPost: (post, authentication) =>
      dispatch(postPost(post, authentication)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestionPage);