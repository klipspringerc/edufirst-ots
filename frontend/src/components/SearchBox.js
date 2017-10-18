import React, {Component} from 'react';
import MachineGeneratedAnswer from './MachineGeneratedAnswer';
import QuestionSimple from './QuestionSimple';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderMachineGeneratedAnswer() {
    const {machineGeneratedAnswer} = this.props;
    return (
        <MachineGeneratedAnswer image={machineGeneratedAnswer.image}
                                text={machineGeneratedAnswer.text}/>
    );
  }

  renderSuggestedQuestions() {
    const {questions} = this.props;
    return (
        <div>
          {questions.map(question => (
              <QuestionSimple title={question.title}
                              author={question.author}
                              votes={questions.votes}
                              answer={questions.answer}/>
          ))}
        </div>
    );
  }

  renderSearchResults() {
    return (
        <div>
          {this.renderMachineGeneratedAnswer()}
          {this.renderSuggestedQuestions()}
        </div>
    );
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.props.onSearch(this.state.searchQuery);
    }
  }

  handleChange(e) {
    this.setState(state => ({...state, searchQuery: e.target.value}));
  }

  render() {
    return (
        <div>
          <input type="search" placeholder="Search here."
                 onKeyPress={this.handleKeyPress}
                 onChange={this.handleChange}/>
          {this.props.showSearchResults ? this.renderSearchResults() : null}
        </div>
    );
  }
}

export default SearchBox;