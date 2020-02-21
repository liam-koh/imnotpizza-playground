// Components/Routes.js
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Aladin from "../Screens/Aladin";
import FormView from "../Screens/FormView";
import LionKing from "../Screens/LionKing";
import Header from "./Header"
import ListView from "../views/ListView"

// App.js에 있던 Aladin, LionKing, SpiderMan을
// Components/Routes.js 로 이동
export default () => (
  <Router>
    <Route path="/aladin" component={Aladin} />
    <Route path="/lionking" component={LionKing} />
    <Route path="/list" component={ListView}/>
    <Route path="/form" component={FormView}/>
  </Router>
);
