import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {login} from '../actions/users';
import "../components/auxiliary_position.css";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/*
<form className="middle-to-right" onSubmit={e => {
      e.preventDefault();
      return handleLogin(loginRequest);
    }}>
      <div>
        <label style={{width:100}} >Username</label>
        <Field name="username" component="input" type="text"/>
      </div>
      <div>
        <label style={{width:100}}>Password</label>
        <Field name="password" component="input" type="password"/>
      </div>
      <button type="submit">Login</button>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
</form>

<div>
    <form className="middle-to-right" onSubmit={e => {
      e.preventDefault();
      return handleLogin(loginRequest);
      }}>
        <div>
          <label style={{width:100}} >Username</label>
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
        {/*<button type="submit">Login</button>* /}
        <RaisedButton label="Submit" primary={true} onClick={(event) => handleLogin(loginRequest)}/>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </form>
    </div>

*/

let LoginPage = ({handleLogin, loginRequest}) => (
    <div>
    <form className="middle-to-right" onSubmit={e => {
      e.preventDefault();
      return handleLogin(loginRequest);
      }}>
        <div>
          <label style={{width:100}} >Username</label>
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
        {/*<button type="submit">Login</button>*/}
        <RaisedButton label="Submit" primary={true} onClick={(event) => handleLogin(loginRequest)}/>
        <Link to="/signup">
          <RaisedButton label="Signup" primary={true}/>
        </Link>
      </form>
    </div>
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
