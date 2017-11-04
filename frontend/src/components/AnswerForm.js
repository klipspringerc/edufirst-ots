import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';

let AnswerForm = ({question, handleSubmit, answer}) => {
  return (
      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit(answer);
      }}>
        <div className="questionTitle">{question.title}</div>
        <div className="questionBody">{question.body}</div>
        <Field name="answer" component="input" type="text"/>
        <input type="submit"/>
      </form>
  );
};

AnswerForm.propTypes = {
  question: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  answer: PropTypes.string,
};

AnswerForm = reduxForm({form: 'answer'})(AnswerForm);
const selector = formValueSelector('answer');

const mapStateToProps = state => {
  return {answer: selector(state, 'answer')};
};

export default connect(mapStateToProps)(AnswerForm);