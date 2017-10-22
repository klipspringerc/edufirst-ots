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
    const {img, answerBody} = this.props.machineGeneratedResult;
    const imageUrl = img, text = answerBody;
    return (
        <div>
          {this.props.folded ? (<div className="folded">{text}</div>) : (
              <div>
                {imageUrl
                    ?
                    <img src={imageUrl} className="unfolded" alt="geneerated"/>
                    : null}
                <div className="unfolded">{text}</div>
              </div>
          )}
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