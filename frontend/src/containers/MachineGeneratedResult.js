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
            <div>
                {results.map((result, index) => {
                    if (index < 3){
                        return <CardExampleControlled result={result}/>
                    }
                })}

            </div>
        );
    }
}

export default (MachineGeneratedResult);