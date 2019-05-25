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
const client = require("../client");

class App extends Component {
  componentDidMount() {
    client({ method: "GET", path: "/users" }).then(response => {
      this.setState({ users: response.entity._embedded.users });
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
            <Route exact path="/student" component={Student} />
            <Route exact path="/coordinator" component={Coordinator} />
            <PrivateRoute
              authenticated={true}
              exact
              path="/reader"
              component={Reader}
            />
          </div>
          {/* </Switch> */}
        </HashRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
