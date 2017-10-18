import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class AnswerEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({text: value});
  }

  render() {
    const {question, onPostAnswer} = this.props;
    return (
        <div>
          <div className="question">{question}</div>
          <ReactQuill value={this.state.text} onChange={this.handleChange}/>
          <input type="submit"
                 onSubmit={() => onPostAnswer(this.state.text)}/>
        </div>
    );
  }
}

export default AnswerEditor;