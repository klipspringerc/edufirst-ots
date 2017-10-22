import {login} from '../actions/users';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

let LoginPage = ({handleLogin, form}) => (
    <form onSubmit={e => {
      e.preventDefault();
      if (form.login) {
        handleLogin(form.login);
      }
    }}>
      <div>
        <label>Username</label>
        <Field name="username" component="input" type="text"/>
      </div>
      <div>
        <label>Password</label>
        <Field name="password" component="input" type="password"/>
      </div>
      <button type="submit">Login</button>
    </form>
);

LoginPage.propTypes = {
  form: PropTypes.object.isRequired,
  handleSignup: PropTypes.func.isRequired,
};


const mapStateToProps = ({form}) => ({form});
const mapDispatchToProps = dispatch => ({
  handleLogin: loginRequest => dispatch(login(loginRequest)),
});

LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default reduxForm({form: 'login'})(LoginPage);