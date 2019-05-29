"use strict";

import React, { Component } from "react";
const ReactDOM = require("react-dom");
import { Route, Switch, HashRouter } from "react-router-dom";
import Header from "./components/header";
import FrontPage from "./Pages/FrontPage";
import Student from "./Pages/Student";
import Coordinator from "./Pages/Coordinator";
import Reader from "./Pages/Reader";
import PrivateRoute from "./utils/PrivateRoute";
import Opponent from "./Pages/Opponent";
import Supervisor from "./Pages/Supervisor";
import { Submission as SupervisorSubmission } from "./Pages/Supervisor/submission";

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Header />
          {/* <Switch> */}
          <div className="fluid-container content">
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/student" component={Student} />
            <Route exact path="/coordinator" component={Coordinator} />
            <Route exact path="/supervisor" component={Supervisor} />
            <Route exact path="/supervisor/submission/:id" component={SupervisorSubmission} />
            <PrivateRoute
              authenticated={true}
              exact
              path="/reader"
              component={Reader}
            />
            <Route exact path="/opponent" component={Opponent} />
          </div>
          {/* </Switch> */}
        </HashRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
