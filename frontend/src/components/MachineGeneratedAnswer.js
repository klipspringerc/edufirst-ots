import React, {Component} from 'react';
import './MachineGeneratedAnswer.css';

class MachineGeneratedAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folded: true,
    };
    this.handleFoldButtonClick = this.handleFoldButtonClick.bind(this);
  }

  handleFoldButtonClick() {
    this.setState(state => ({folded: !state.folded}));
  }

  render() {
    const {image, text} = this.props;
    return (
        <div>
          {this.state.folded ? (<div className="folded">{text}</div>) : (
              <div>
                <img src={image} className="unfolded"/>
                <div className="unfolded">{text}</div>
              </div>
          )}
          <button onClick={this.handleFoldButtonClick}>
            {this.state.folded ? 'Show All' : 'Collapse'}
          </button>
        </div>
    );
  }
}

export default MachineGeneratedAnswer;