import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';

@connect(store => ({users: store.users}))
class App extends Component {
  render() {
    return (
        <div>The app worked!</div>
    );
  }
}

export default App;