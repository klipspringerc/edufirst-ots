import QuestionSimple from 'frontend/src/components/QuestionSimple';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostsByTopic} from '../actions/posts';

class TopicQuestionsPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    handleFetchPostsByTopic: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {match, handleFetchPostsByTopic} = this.props;
    handleFetchPostsByTopic(match.params.topicId);
  }

  render() {
    const {questions} = this.props;
    return (
        <div>
          {questions.map(question => (
              <QuestionSimple title={question.title}
                              author={question.author.username}
                              votes={question.votes_total}
                              topAnswer={question.topAnswer.body}
                              questionId={question.id}/>
          ))}
        </div>
    );
  }
}

const mapStateToProps = ({posts}, {match}) => ({
  questions: posts.topics.find(t => t.topicId === match.params.topicId).posts,
});
const mapDispatchToProps = dispatch => ({
  handleFetchPostsByTopic: postId => dispatch(fetchPostsByTopic(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicQuestionsPage);