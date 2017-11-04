import PropTypes from 'prop-types';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Field, reduxForm} from 'redux-form';

const PostForm = ({title, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <Field name="title" component="input" type="text"
               value={title ? title : ''}/>
      </div>
      <div>
        <label>Body</label>
        <Field name="body" component={ReactQuill}/>
      </div>
      <button type="submit">Submit Post</button>
    </form>
);
PostForm.propTypes = {
  title: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
};

export default reduxForm({form: 'post'})(PostForm);