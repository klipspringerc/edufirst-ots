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
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSubmit() {
    const {form, user, handlePostPost} = this.props;
    if (form.post) {
      handlePostPost(form.post, user.authentication);
    }
  }

  render() {
    const title = this.props.match.params.title;
    return (
        <PostForm handleSubmit={this.handleLogin} title={title}/>
    );
  }
}

const mapStateToProps = ({user, form}) => ({user, form});
const mapDispatchToProps = dispatch => ({
  handlePostPost: (post, authentication) =>
      dispatch(postPost(post, authentication)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestionPage);