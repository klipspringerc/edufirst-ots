import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory} from "react-router";
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Archives from "./pages/Archives";
import Featured from "./pages/Featured";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";
//import {Example} from './components/layout/test';
//ReactDOM.render(<Example />, app);

const app = document.getElementById('app');
ReactDOM.render(
  <Router >
    <Route path="/" component={Layout}>
      <IndexRoute component={Featured}></IndexRoute>
      <Route path="archives(/:article)" name="archives" component={Archives}></Route>
      <Route path="settings" name="settings" component={Settings}></Route>
    </Route>
  </Router>,
app);
