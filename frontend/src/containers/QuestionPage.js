import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions/posts';
import AnswersArea from '../components/AnswersArea';
import QuestionDetail from '../components/QuestionDetail';

class QuestionPage extends Component {
  static propTypes = {
    question: PropTypes.object,
    match: PropTypes.object.isRequired,
    handleFetchPost: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {question, handleFetchPost, match} = this.props;
    if (!question) {
      handleFetchPost(match.params.questionId);
    }
  }

  render() {
    const {question, user} = this.props;
    if (question) {
      return (
          <div>
            <QuestionDetail questionId={question.id}
                            title={question.title}
                            body={question.body}
                            allowAddingAnswer={!!user}/>
            <AnswersArea answers={question.answers}/>
          </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = ({posts, user}, {match}) => {
  const question = posts.posts.find(p => p.id === +match.params.questionId);
  return {question: question ? question : null, user};
};

const mapDispatchToProps = dispatch => ({
  handleFetchPost: postId => dispatch(fetchPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);