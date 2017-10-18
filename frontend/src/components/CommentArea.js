import React, {Component} from 'react';
import './CommentArea.css';

class CommentArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: '',
    };
  }

  renderComments() {
    const {comments, onPostComment, answerId} = this.props;
    return (
        <div className="comments">
          {comments.map((comment, index) => (
              <div key={index}>
                <div className="comment-user">{comment.user}</div>
                <div className="comment-content">{comment.content}</div>
                <div className="horizontal-rule"/>
              </div>
          ))}
          <div>
            <input type="text" placeholder="Comment here"
                   onChange={value => this.setState(
                       state => ({...state, newComment: value}))}/>
            <input type="submit"
                   onSubmit={() => onPostComment(this.state.newComment,
                       answerId)}/>
          </div>
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
              <img className="inline" src="%PUBLIC_URL%/like.ico"
                   onClick={() => onLike(answerId)}/>
              <div className="inline">{likesString}</div>
            </div>
            <div className="inline">
              <img className="inline" src="%PUBLIC_URL%/comment.ico"
                   onClick={() => onCommentButtonClick(answerId)}/>
              <div className="inline">{commentsString}</div>
            </div>
          </div>
          {collapsed ? null : this.renderComments()}
        </div>
    );
  }
}

export default CommentArea;