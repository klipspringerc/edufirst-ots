import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {login} from '../actions/users';
import '../components/auxiliary_position.css';

let LoginPage = ({handleLogin, loginRequest, user}) => {
  if (user.username && user.authentication.status === 'success') {
    return <Redirect to="/"/>;
  } else {
    return (
        <div>
          <form className="middle-down-row" onSubmit={e => {
            e.preventDefault();
            return handleLogin(loginRequest);
          }}>
            <div>
              <label style={{width: 100}}>Username</label>
              <TextField id="username">
                <Field name="username" component="input" type="text"/>
              </TextField>
            </div>
            <div>
              <label style={{width: 100}}>Password</label>
              <TextField id="username">
                <Field name="password" component="input" type="password"/>
              </TextField>
            </div>
            {/*<button type="submit">Login</button>*/}
            <br/>
            <br/>
            <RaisedButton label="Submit" primary={true}
                          onClick={(event) => handleLogin(loginRequest)}/>
            <Link to="/signup">
              <RaisedButton label="Signup"/>
            </Link>
          </form>
        </div>
    );
  }
};
/*
import '../components/auxiliary_position.css';

let LoginPage = ({handleLogin, loginRequest, user}) => {
  if (user.username && user.authentication) {
    return <Redirect to="/"/>;
  } else {
    return (
        <form className="middle-to-right" onSubmit={e => {
          e.preventDefault();
          return handleLogin(loginRequest);
        }}>
          <div>
            <label style={{width: 100}}>Username</label>
            <Field name="username" component="input" type="text"/>
          </div>
          <div>
            <label style={{width: 100}}>Password</label>
            <Field name="password" component="input" type="password"/>
          </div>
          <button type="submit">Login</button>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </form>
    );
  }
};
*/

LoginPage.propTypes = {
  loginRequest: PropTypes.object,
  handleLogin: PropTypes.func.isRequired,
};

LoginPage = reduxForm({form: 'login'})(LoginPage);
const selector = formValueSelector('login');

const mapStateToProps = state => {
  const loginRequest = selector(state, 'username', 'password');
  return {loginRequest, user: state.user};
};

const mapDispatchToProps = dispatch => ({
  handleLogin: loginRequest => dispatch(login(loginRequest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
