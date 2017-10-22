import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {signup} from '../actions/users';

let SignupPage = ({handleSignup, signupRequest}) => (
    <form onSubmit={e => {
      e.preventDefault();
      handleSignup(signupRequest);
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
  signupRequest: PropTypes.object,
  handleSignup: PropTypes.func.isRequired,
};

SignupPage = reduxForm({form: 'signup'})(SignupPage);
const selector = formValueSelector('signup');

const mapStateToProps = state => {
  const signupRequest = selector(state, 'email', 'username', 'password');
  return {signupRequest};
};
const mapDispatchToProps = dispatch => ({
  handleSignup: signUpRequest => dispatch(signup(signUpRequest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);