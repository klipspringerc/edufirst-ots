import React from "react";
import {Circle} from 'rc-progress';
export default class CircleComp extends React.Component{
	render(){
		const circleContainerStyle = {
	      width: '100px',
	      height: '150px',
	      textAlign: 'center',
	    };
	    return(
	    	<div style={circleContainerStyle}>
        <Circle
              value={this.props.value}
              max = {this.props.max}
              min = {this.props.min}
              strokeWidth="6"
              strokeLinecap="round"
              
            />
        <p style={{fontSize:13}}>
            {this.props.label1}<br />
            {this.props.label2}
        </p> 
        </div>

	   	)
	}
}