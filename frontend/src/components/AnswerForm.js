import PropTypes from 'prop-types';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Field, reduxForm} from 'redux-form';

const AnswerForm = ({question, handleSubmit}) => {
  return (
      <form onSubmit={handleSubmit}>
        <div className="questionTitle">{question.title}</div>
        <div className="questionBody">{question.body}</div>
        <Field name="answer" component={ReactQuill}/>
        <input type="submit"/>
      </form>
  );
};

AnswerForm.propTypes = {
  question: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({form: 'answer'})(AnswerForm);