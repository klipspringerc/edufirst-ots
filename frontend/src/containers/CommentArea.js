import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {fetchComments, postComment} from '../actions/comments';
import {postLike} from '../actions/likes';
import CommentForm from '../components/CommentForm';
import './CommentArea.css';

class CommentArea extends Component {

  static propTypes = {
    handlePostComment: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newComment: '',
    };
  }

  renderComments() {
    const {comments, handlePostComment, answerId} = this.props;
    return (
        <div className="comments">
          {comments.map((comment, index) => (
              <div key={index}>
                <div className="comment-user">{comment.user}</div>
                <div className="comment-content">{comment.content}</div>
                <div className="horizontal-rule"/>
              </div>
          ))}
          <CommentForm onSubmit={handlePostComment}/>
        </div>
    );
  }

  render() {
    const {collapsed, likes, comments, onLike, onCommentButtonClick, answerId} = this.props;
    let likesString = `${likes}`;
    if (likes === 0) {
      likesString = 'Like';
    }
    const commentsCount = comments.length;
    let commentsString = `${commentsCount} Comments`;
    if (commentsCount === 0) {
      commentsString = 'No Comments';
    } else if (commentsCount === 1) {
      commentsString = '1 Comment';
    }
    return (
        <div className="comment-area">
          <div>
            <div className="inline">
              <img className="inline" src="%PUBLIC_URL%/like.ico" alt="likes"
                   onClick={() => onLike(answerId)}/>
              <div className="inline">{likesString}</div>
            </div>
            <div className="inline">
              <img className="inline" src="%PUBLIC_URL%/comment.ico"
                   alt="comments"
                   onClick={() => onCommentButtonClick(answerId)}/>
              <div className="inline">{commentsString}</div>
            </div>
          </div>
          {collapsed ? null : this.renderComments()}
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handlePostComment: () => dispatch(postComment()),
  handlePostLike: () => dispatch(postLike()),
});
export default CommentArea;