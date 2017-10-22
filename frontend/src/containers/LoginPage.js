import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {login} from '../actions/users';

let LoginPage = ({handleLogin, loginRequest}) => (
    <form onSubmit={e => {
      e.preventDefault();
      return handleLogin(loginRequest);
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
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </form>
);

LoginPage.propTypes = {
  loginRequest: PropTypes.object,
  handleLogin: PropTypes.func.isRequired,
};

LoginPage = reduxForm({form: 'login'})(LoginPage);
const selector = formValueSelector('login');

const mapStateToProps = state => {
  const loginRequest = selector(state, 'username', 'password');
  return {loginRequest};
};

const mapDispatchToProps = dispatch => ({
  handleLogin: loginRequest => dispatch(login(loginRequest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
