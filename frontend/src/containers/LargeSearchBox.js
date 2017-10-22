import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Form, FormControl, FormGroup, Input} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Subject} from 'rxjs';
import {saveQuery} from '../actions/search';
import QuestionSimple from '../components/QuestionSimple';
import MachineGeneratedResult from './MachineGeneratedResult';

class SearchBox extends Component {

  static propTypes = {
    machineGeneratedResult: PropTypes.object,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    showSearchResults: PropTypes.bool.isRequired,
    folded: PropTypes.bool.isRequired,
    handleSaveQuery: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.handleChangeSubject = new Subject();
    this.handleChangeSubject.debounceTime(200)
        .subscribe(this.handleChange);
  }

  renderMachineGeneratedResult() {
    const {machineGeneratedResult, folded} = this.props;
    return (
        <MachineGeneratedResult
            folded={folded}
            machineGeneratedResult={machineGeneratedResult}/>
    );
  }

  renderSuggestedQuestions() {
    const {questions} = this.props;
    return (
        <div>
          {questions.map(question => (
              <QuestionSimple
                  key={question.id}
                  title={question.title}
                  author={question.author.username}
                  votes={question.votes_total}
                  topAnswer={question.top_answer.body}
                  questionId={question.id}/>
          ))}
        </div>
    );
  }

  renderSearchResults() {
    const {user, keywords} = this.props;
    return (
        <div>
          {this.renderMachineGeneratedResult()}
          {this.renderSuggestedQuestions()}
          <Link to={user.authentication
              ? `/question/editQuestion/${keywords}`
              : '/login'}>
            <button>
              {user.authentication
                  ? 'Create New Post'
                  : 'Login to Create a Post'}
            </button>
          </Link>
        </div>
    );
  }

  handleChange(text) {
    // this.props.handleSaveQuery(text);
  }

  render() {
    return (
        <Form inline className='navbar-form' action=""
              onSubmit={e => e.preventDefault()}>
          <FormGroup>
            <FormControl className="form-control form-control-lg"
                         style={{width: 450, height: 50}} type="text"
                         placeholder="Ask me anything..."
                         onChange={e => {
                           const query = e.target.value;
                           this.handleChangeSubject.next(e.target.value);
                           this.props.handleSaveQuery(query);
                         }}/>
          </FormGroup>
          <Link to="/search">
            <Button bsStyle='success' type='submit'
                    style={{width: 100, height: 50}}>Search</Button>
          </Link>
        </Form>
    );
  }
}

const mapStateToProps = ({posts, fold, user}) => ({
  machineGeneratedResult: posts.machineAnswer,
  questions: posts.similarPosts,
  showSearchResults: posts.showSearchResults,
  keywords: posts.keywords,
  folded: fold.folded,
  user,
});

const mapDispatchToProps = dispatch => ({
  handleSaveQuery: query => dispatch(saveQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);