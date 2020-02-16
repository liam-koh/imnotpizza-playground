import React from "react";
import { render } from 'render-dom'
import {Router, Route, IndexRoute, Link, browserHistory} from "react-router";

import App from "./components/App.js"
import Page1 from "./components/Page1.js"
import Page2 from "./components/Page2.js"


render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Page1} />
        <Route path="about" component={Page2}/>
      </Route>
    </Router>
  ), document.getElementById('root'))