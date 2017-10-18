import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>The app worked!</div>
    );
  }
}

const mapStateToProps = store => ({users: store.users});

export default connect(mapStateToProps)(App);