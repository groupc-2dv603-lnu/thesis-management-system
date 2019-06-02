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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
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
              authenticated={true}
            />
            <PrivateRoute
              exact
              path="/coordinator"
              component={Coordinator}
              authenticated={true}
            />
            <PrivateRoute
              exact
              path="/supervisor"
              component={Supervisor}
              authenticated={true}
            />
            <PrivateRoute
              exact
              path="/admin"
              component={Admin}
              authenticated={true}
            />
            <PrivateRoute
              authenticated={true}
              exact
              path="/reader"
              component={Reader}
            />
            <PrivateRoute
              exact
              path="/opponent"
              component={Opponent}
              authenticated={true}
            />
          </div>
          {/* </Switch> */}
        </HashRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
