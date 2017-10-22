import PropTypes from 'prop-types';
import React, {Component} from 'react';
import CardExampleControlled from '../components/ExpandableMachineGeneratedAnswerTab';
import './MachineGeneratedResult.css';

class MachineGeneratedResult extends Component {

  static propTypes = {
    machineGeneratedResult: PropTypes.object.isRequired,
  };

  render() {
    const results = this.props.machineGeneratedResult.pods;
    return (
        <div>
          {results.map((result, index) => index < 3 ?
              <CardExampleControlled key={index} result={result}/> : null)}
        </div>
    );
  }
}

export default (MachineGeneratedResult);