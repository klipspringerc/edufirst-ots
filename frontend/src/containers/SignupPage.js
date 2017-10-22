import {signup} from '../actions/users';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

const SignupPage = ({handleSignup, form}) => (
    <form onSubmit={e => {
      e.preventDefault();
      if (form.signup) {
        handleSignup(form.signup);
      }
    }}>
      <div>
        <label>Email</label>
        <Field name="email" component="input" type="email"/>
      </div>
      <div>
        <label>Username</label>
        <Field name="username" component="input" type="text"/>
      </div>
      <div>
        <label>Password</label>
        <Field name="password" component="input" type="password"/>
      </div>
      <button type="submit">Signup</button>
    </form>
);

SignupPage.propTypes = {
  form: PropTypes.object.isRequired,
  handleSignup: PropTypes.func.isRequired,
};

const mapStateToProps = ({form}) => ({form});
const mapDispatchToProps = dispatch => ({
  handleSignup: signUpRequest => dispatch(signup(signUpRequest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({form: 'signup'})(SignupPage));