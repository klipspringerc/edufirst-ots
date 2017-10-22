import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {signup} from '../actions/users';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import "../components/auxiliary_position.css";

let SignupPage = ({handleSignup, signupRequest}) => (
    <form className="middle-down-row" onSubmit={e => {
      e.preventDefault();
      handleSignup(signupRequest);
    }}>
      <div>
        <label style={{width:100}}>Email</label>
        <TextField>
        <Field name="email" component="input" type="email"/>
        </TextField>
      </div>
      <div>
        <label style={{width:100}}>Username</label>
        <TextField>
        <Field name="username" component="input" type="text"/>
        </TextField>
      </div>
      <div>
        <label style={{width:100}}>Password</label>
        <TextField>
        <Field name="password" component="input" type="password"/>
        </TextField>
      </div>
      <br/>
      <RaisedButton label="Submit" primary={true} onClick={(event) => handleSignup(signupRequest)}/>
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