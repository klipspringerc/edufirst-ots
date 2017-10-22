import {Circle} from 'rc-progress';
import React from "react";
//const svg_circle = require('../../2-react-router/src/js/components/layout/svg_circle')
export default class Example extends React.Components{
  Constructor() {
    this.state =  {
      percent: 30,
      color: '#3FC7FA',
    };
  }
  changeState() {
    const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
    this.setState({
      percent: parseInt(Math.random() * 100, 10),
      color: colorMap[parseInt(Math.random() * 3, 10)],
    });
  }
  render() {
    const containerStyle = {
      width: '250px',
    };
    const circleContainerStyle = {
      width: '250px',
      height: '250px',
    };
    return (
      <div>
        <h3>Circle Progress {this.state.percent}%</h3>
        <div style={circleContainerStyle}>
          <Circle
            percent={this.state.percent}
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={this.state.color}
          />
        </div>
        <p>
          <button onClick={this.changeState}>Change State</button>
        </p>
      </div>
    );
  }
};

//ReactDOM.render(<Example/>, document.getElementById('__react-content'));
