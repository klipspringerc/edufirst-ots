import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {form} from 'react-form';
import {connect} from 'react-redux';

@connect((store)=>{
    return{
        user: store.user
    }
})
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
    console.log(this.props.user);
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      <form onSubmit={this.handleSubmit}>
          <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default App;
