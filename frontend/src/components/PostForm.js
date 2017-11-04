import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';

let PostForm = ({handleSubmit, post}) => {
  return (
      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit(post);
      }}>
        <div>
          <label>Title</label>
          <Field name="title" component="input" type="text"/>
        </div>
        <div>
          <label>Body</label>
          {/*<Field name="body" component={ReactQuill}/>*/}
          <Field name="body" component="textarea" type="textarea"/>
        </div>
        <button type="submit">Submit Post</button>
      </form>
  );
};
PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  post: PropTypes.object,
};

PostForm = reduxForm({form: 'post'})(PostForm);
const selector = formValueSelector('post');

const mapStateToProps = state => {
  return {
    post: {
      title: selector(state, 'title'),
      body: selector(state, 'body'),
    },
  };
};

export default connect(mapStateToProps)(PostForm);