import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postAnswer} from '../actions/answer';
import AnswerForm from '../components/AnswerForm';

class EditAnswerPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    question: PropTypes.string.isRequired,
    handlePostAnswer: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSubmit() {
    const {form, user, match, handlePostAnswer} = this.props;
    if (form.answer) {
      handlePostAnswer(match.params.questionId, form.answer.answer,
          user.authentication);
    }
  }

  render() {
    const {question} = this.props;
    return (
        <AnswerForm question={question} handleSubmit={this.handleLogin}/>
    );
  }
}

const mapStateToProps = ({form, user, posts}, {match}) => ({
  form, user,
  question: posts.find(match.params.questionId).title,
});
const mapDispatchToProps = dispatch => ({
  handlePostAnswer: (postId, answerBody, authentication) =>
      dispatch(postAnswer(postId, answerBody, authentication)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAnswerPage);