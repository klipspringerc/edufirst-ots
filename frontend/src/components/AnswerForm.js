import PropTypes from 'prop-types';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Field, reduxForm} from 'redux-form';

const AnswerForm = ({question, handleSubmit}) => (
    <form>
      <div className="question">{question}</div>
      <Field name="answer" component={ReactQuill}/>
      <input type="submit" onSubmit={handleSubmit}/>
    </form>
);

AnswerForm.propTypes = {
  question: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default reduxForm({form: 'answer'})(AnswerForm);