import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postAnswer} from '../actions/answer';
import {fetchPost} from '../actions/posts';
import AnswerForm from '../components/AnswerForm';

class EditAnswerPage extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    question: PropTypes.object,
    handlePostAnswer: PropTypes.func.isRequired,
    handleFetchPost: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {question, handleFetchPost, match} = this.props;
    if (!question) {
      handleFetchPost(match.params.questionId);
    }
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
    return <AnswerForm question={question} handleSubmit={this.handleSubmit}/>;
  }
}

const mapStateToProps = ({form, user, posts}, {match}) => ({
  form, user,
  question: posts.posts.find(p => p.id === +match.params.questionId),
});
const mapDispatchToProps = dispatch => ({
  handlePostAnswer: (postId, answerBody, authentication) =>
      dispatch(postAnswer(postId, answerBody, authentication)),
  handleFetchPost: postId => dispatch(fetchPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAnswerPage);