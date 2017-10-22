import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import EditAnswerPage from '../containers/EditAnswerPage';
import EditQuestionPage from '../containers/EditQuestionPage';
import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import ProfilePage from '../containers/ProfilePage';
import QuestionPage from '../containers/QuestionPage';
import SearchPage from '../containers/SearchPage';
import SignupPage from '../containers/SignupPage';
import TopicQuestionsPage from '../containers/TopicQuestionsPage';
import TopicsPage from '../containers/TopicsPage';

import Layout from '../layout/Layout';

const Root = ({store}) => (
    <MuiThemeProvider>
      <Provider store={store}>
        <Router>
          <div>
            <Layout/>
            <Route path="/" exact component={HomePage}/>
            <Route path="/search" exact component={SearchPage}/>
            <Route path="/questions/:questionId" exact
                   component={QuestionPage}/>
            <Route path="/questions/editQuestion/:title"
                   component={EditQuestionPage}/>
            <Route path="/questions/:questionId/editAnswer" exact
                   component={EditAnswerPage}/>
            <Route path="/topics" exact component={TopicsPage}/>
            <Route path="/topics/:topicId" component={TopicQuestionsPage}/>
            <Route path="/profile/:userId" component={ProfilePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;