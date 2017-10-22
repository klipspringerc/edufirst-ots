import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleFoldAction} from '../actions/toggle-fold';
import './MachineGeneratedResult.css';

class MachineGeneratedResult extends Component {

  static propTypes = {
    folded: PropTypes.bool.isRequired,
    machineGeneratedResult: PropTypes.object.isRequired,
    handleFoldButtonClick: PropTypes.func.isRequired,
  };

  render() {
    const results = this.props.machineGeneratedResult.pods;
    return (
        <div>
          {results.map((result, index) => (
              <div key={index}>
                <div>{result.title}</div>
                <img src={result.img.src} alt={result.img.alt}/>
                <div>{result.text}</div>
              </div>
          ))}
          {/*TODO: implement folding behavior here*/}
          <div onClick={this.props.handleFoldButtonClick}>
            {this.props.folded ? 'v' : '^'}
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleFoldButtonClick: () => dispatch(toggleFoldAction()),
});
export default connect(null, mapDispatchToProps)(MachineGeneratedResult);