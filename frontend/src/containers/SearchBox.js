import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Subject } from 'rxjs';
import { search } from '../actions/search';
import QuestionSimple from '../components/QuestionSimple';
import MachineGeneratedResult from './MachineGeneratedResult';

class SearchBox extends Component {

  static propTypes = {
    machineGeneratedResult: PropTypes.object,
    questions: PropTypes.arrayOf(PropTypes.shape({
      questionId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      votes: PropTypes.string.isRequired,
      topAnswer: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired
    })).isRequired,
    handleSearch: PropTypes.func.isRequired,
    showSearchResults: PropTypes.bool.isRequired,
    folded: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.handleChangeSubject = new Subject();
    this.handleChangeSubject.debounceTime(200)
      .subscribe(this.handleChange);
  }

  renderMachineGeneratedResult() {
    const { machineGeneratedResult, folded } = this.props;
    return (
      <MachineGeneratedResult
        folded={folded}
        machineGeneratedResult={machineGeneratedResult} />
    );
  }

  renderSuggestedQuestions() {
    const { questions } = this.props;
    return (
      <div>
        {questions.map(question => (
          <QuestionSimple
            key={question.questionId}
            title={question.title}
            author={question.author}
            votes={question.votes}
            topAnswer={question.topAnswer}
            questionId={question.questionId}
            authorId={question.authorId} />
        ))}
      </div>
    );
  }

  renderSearchResults() {
    return (
      <div>
        {this.renderMachineGeneratedResult()}
        {this.renderSuggestedQuestions()}
      </div>
    );
  }

  handleChange(text) {
    this.props.handleSearch(text);
  }

  render() {
    return (
      <div>
        <input type="search" placeholder="Search here."
          onChange={e => this.handleChangeSubject.next(e.target.value)} />
        {this.props.showSearchResults ? this.renderSearchResults() : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  machineGeneratedResult: state.machineGeneratedResult,
  questions: state.similarQuestions,
  showSearchResults: state.showSearchResults,
  folded: state.folded,
});

const mapDispatchToProps = dispatch => ({
  handleSearch: text => dispatch(search(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);