import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postComment} from '../actions/comments';
import {putLike} from '../actions/likes';
import {clearCollapse, toggleCollapse} from '../actions/toggle-collapse';
import CommentForm from '../components/CommentForm';
import './CommentArea.css';

class CommentArea extends Component {

  static propTypes = {
    answerId: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    form: PropTypes.object,
    collapsed: PropTypes.bool.isRequired,
    handlePostComment: PropTypes.func.isRequired,
    handlePutLike: PropTypes.func.isRequired,
    handleToggleCollapse: PropTypes.func.isRequired,
    handleClearCollapse: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillUnmount() {
    const {answerId, handleClearCollapse} = this.props;
    handleClearCollapse(answerId);
  }

  handleSubmit() {
    const {answerId, user, form, handlePostComment} = this.props;
    // Only allow post submission if form.comment exists
    if (form.comment) {
      handlePostComment(answerId, form.comment, user.authentication);
    }
  }

  renderComments() {
    const {comments, user} = this.props;
    return (
        <div className="comments">
          {comments.map(comment => (
              <div key={comment.id}>
                <div className="comment-user">{comment.author}</div>
                <div className="comment-content">{comment.body}</div>
                <div className="horizontal-rule"/>
              </div>
          ))}
          {user.authentication
              ? <CommentForm onSubmit={this.handleLogin}/>
              : null}
        </div>
    );
  }

  render() {
    const {collapsed, likes, comments, handlePutLike, handleToggleCollapse, answerId} = this.props;
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
                   onClick={() => handlePutLike(answerId)}/>
              <div className="inline">{likesString}</div>
            </div>
            <div className="inline">
              <img className="inline" src="%PUBLIC_URL%/comment.ico"
                   alt="comments"
                   onClick={() => handleToggleCollapse(answerId)}/>
              <div className="inline">{commentsString}</div>
            </div>
          </div>
          {collapsed ? null : this.renderComments()}
        </div>
    );
  }
}

const mapStateToProps = ({form, user, collapsed}, {answerId}) => ({
  form,
  user,
  collapsed: collapsed.find(c => c.id === answerId).collapsed,
});

const mapDispatchToProps = (dispatch) => ({
  handlePutLike: answerId => dispatch(putLike(answerId)),
  handlePostComment: (answerId, body, authentication) =>
      dispatch(postComment(answerId, 'answer', body, authentication)),
  handleToggleCollapse: answerId => dispatch(toggleCollapse(answerId)),
  handleClearCollapse: answerId => dispatch(clearCollapse(answerId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentArea);