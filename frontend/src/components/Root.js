import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from '../containers/HomePage';
import SearchPage from '../containers/SearchPage';
import TopBar from '../containers/TopBar';

const Root = ({store}) => (
    <Provider store={store}>
      <Router>
        <div>
          <TopBar/>
          <Route path="/" exact component={HomePage}/>
          <Route path="/search" exact component={SearchPage}/>
          {/*<Route path="/question/:questionId" component={QuestionPage} />
      <Route path="/question/:questionId/editanswer" component={EditAnswerPage} />
      <Route path="/topics" component={TopicsPage} />
<Route path="/profile/:userId" component={ProfilePage} />*/}
        </div>
      </Router>
    </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;