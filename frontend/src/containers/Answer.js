import React, {Component} from 'react';
import CommentArea from './CommentArea';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedFlags: new Array(props.answers.length).fill(false),
    };
    this.handleCommentButtonClick = this.handleCommentButtonClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handlePostComment = this.handlePostComment.bind(this);
  }

  handleCommentButtonClick(answerId) {
    const index = this.props.answers.findIndex(
        answer => answer.id === answerId);
    this.setState(state => ({
      ...state,
      collapsedFlags: state.collapsedFlags.map(
          (collapsed, i) => i === index ? !collapsed : collapsed),
    }));
  }

  handleLike(answerId) {
    this.props.onLike(answerId);
  }

  handlePostComment(answerId, comment) {
    this.props.onPostComment(answerId, comment);
  }

  render() {
    const {answers} = this.props;
    return (
        <div>
          {answers.map((answer, index) => (
              <div key={answer.id}>
                <div className="user">{answer.author}</div>
                <div className="answer-detail">{answer.text}</div>
                <div className="horizontal-rule"/>
                <CommentArea collapsed={this.state.collapsedFlags[index]}
                             likes={answer.likes}
                             comments={answer.comments}
                             onLike={this.handleLike}
                             onCommentButtonClick={this.handleCommentButtonClick}
                             onPostComment={this.handlePostComment}
                             answerId={answer.id}
                />
              </div>
          ))}
        </div>
    );
  }
}

export default Answer;