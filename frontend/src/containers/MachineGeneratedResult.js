import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MachineGeneratedResult.css';
import CardExampleControlled from "../components/ExpandableMachineGeneratedAnswerTab"

class MachineGeneratedResult extends Component {

    static propTypes = {
        machineGeneratedResult: PropTypes.object.isRequired,
    };

    render() {
        const results = this.props.machineGeneratedResult.pods;
        return (
            <div className="col-md-9">
                {results.map((result, index) => {
                    if (index < 3){
                        return <div>
                            <CardExampleControlled result={result}/>
                            <div style={{height:20}}/>
                        </div>
                    }
                })}

            </div>
        );
    }
}

export default (MachineGeneratedResult);