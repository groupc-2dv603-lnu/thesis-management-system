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
import Admin from "./Pages/Admin";
import { getFromAPI } from "./functions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    getFromAPI("/loginUser").then(user => {
      this.setState({
        user: user.entity,
        roles: user.entity.rules
      });
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <HashRouter>
          <Header />
          {/* <Switch> */}
          <div className="fluid-container content">
            <Route exact path="/" component={FrontPage} />
            <PrivateRoute
              exact
              path="/student"
              component={Student}
              authenticated={user.roles && user.roles.includes("STUDENT")}
            />
            <PrivateRoute
              exact
              path="/coordinator"
              component={Coordinator}
              authenticated={user.roles && user.roles.includes("COORDINATOR")}
            />
            <PrivateRoute
              exact
              path="/supervisor"
              component={Supervisor}
              authenticated={user.roles && user.roles.includes("SUPERVISOR")}
            />
            <PrivateRoute
              exact
              path="/admin"
              component={Admin}
              authenticated={user.roles && user.roles.includes("ADMIN")}
            />
            <PrivateRoute
              authenticated={user.roles && user.roles.includes("READER")}
              exact
              path="/reader"
              component={Reader}
            />
            <PrivateRoute
              exact
              path="/opponent"
              component={Opponent}
              authenticated={user.roles && user.roles.includes("OPPONENT")}
            />
          </div>
          {/* </Switch> */}
        </HashRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
