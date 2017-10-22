import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostsByTopic} from '../actions/posts';
import QuestionSimple from '../components/QuestionSimple';

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
        <div className="col-sm-3 text-right">
          {questions.map(question => (
              <QuestionSimple title={question.title}
                              author={question.author.username}
                              votes={question.votes_total}
                              topAnswer={question.top_answer.body}
                              questionId={question.id}/>
          ))}
        </div>
    );
  }
}

const mapStateToProps = ({posts}, {match}) => {
  const topic = posts.topics.find(t => t.topicId === match.params.topicId);
  let questions = [];
  debugger;
  if (topic) {
    questions = topic.posts;
  }
  return {questions};
};
const mapDispatchToProps = dispatch => ({
  handleFetchPostsByTopic: postId => dispatch(fetchPostsByTopic(postId, 0)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicQuestionsPage);