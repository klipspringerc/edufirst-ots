import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearSearchResults, showSearchBox} from '../actions/search';
import {fetchTopTrendingQuestions} from '../actions/top-trending-questions';
import TopTrendingQuestions from '../components/TopTrendingQuestions';
import MachineGeneratedResult from './MachineGeneratedResult';
import QuestionSimple from '../components/QuestionSimple';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Grid, Row, Col} from 'react-bootstrap';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class SearchPage extends Component {
  static propTypes = {
    handleFetchTopTrendingQuestions: PropTypes.func.isRequired,
    handleShowSearchBox: PropTypes.func.isRequired,
    handleClearSearchResults: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    topTrendingQuestions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
    machineGeneratedResult: PropTypes.object,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    showSearchResults: PropTypes.bool.isRequired,
    folded: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.handleFetchTopTrendingQuestions();
    this.props.handleShowSearchBox();
  }

  componentWillUnmount() {
    this.props.handleClearSearchResults();
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
    console.log(this.props);
    return (
        <div >
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

  renderTopTrendingQuestions() {
    const {loading, topTrendingQuestions} = this.props;
    const TestCards = () => (
      <Card style={{width: '350px', height: '80%'}}>
        <CardHeader
          title="Trending Topics"
          avatar="https://placeimg.com/80/80/animals"
        />
        <TopTrendingQuestions loading={loading}
                                questions={topTrendingQuestions}/>
      </Card>
    );
    return (
        <Grid style={{height: '80%'}}>
            <Col className="pull-right">
              <TestCards/>
            </Col>
        </Grid>
    );
    /*
      <div style={{textAlign: 'right'}}>
          <TestCards/>
      </div>
      <Paper style={style}>
          <TopTrendingQuestions loading={loading}
                                questions={topTrendingQuestions}/>
        </Paper>
    */
  }

  renderSearchResults() {
    const {user, keywords} = this.props;
    return (
        <div>
          {/*this.renderMachineGeneratedResult()*/}
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

  render() {
    return (
        <div>
          {this.renderTopTrendingQuestions()}
          {this.renderSearchResults()}

        </div>
    );
  }
}

const mapStateToProps = ({topTrendingQuestions, posts, fold, user}) => {
  return ({
    loading: topTrendingQuestions.loadingTopTrendingQuestions,
    topTrendingQuestions: topTrendingQuestions.topTrendingQuestions,
    machineGeneratedResult: posts.machineAnswer,
    questions: posts.similarPosts,
    showSearchResults: posts.showSearchResults,
    keywords: posts.keywords,
    folded: fold.folded,
    user,
  });
};
const mapDispatchToProps = dispatch => ({
  handleFetchTopTrendingQuestions: () => dispatch(fetchTopTrendingQuestions()),
  handleShowSearchBox: () => dispatch(showSearchBox()),
  handleClearSearchResults: () => dispatch(clearSearchResults()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);