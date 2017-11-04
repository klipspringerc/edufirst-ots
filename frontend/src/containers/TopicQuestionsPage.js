import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPostsByTopic} from '../actions/posts';
import '../components/auxiliary_position.css';
import CardExampleExpandable from '../components/ExpandablePosts';

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

        <div className="middle-row">
          {questions.map(question => (
              <div className="col-md-12" style={{height: 1}}>
                <CardExampleExpandable
                    key={question.id}
                    title={question.title}
                    author={question.author.username}
                    votes={question.votes_total}
                    topAnswer={question.top_answer.body}
                    questionId={question.id}/>
              </div>
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