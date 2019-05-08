'use strict';

import React, { Component } from 'react'
const ReactDOM = require('react-dom');
const client = require('./client');
import { Route, Switch, HashRouter } from 'react-router-dom'
import FrontPage from './Pages/FrontPage'
import Student from './Pages/Student'
import Coordinator from './Pages/Coordinator'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        client({ method: 'GET', path: '/users' }).then(response => {
            this.setState({ users: response.entity._embedded.userses });
        });
    }

    render() {
        return (
            <div>
                <HashRouter >
                    <Switch>
                        <Route exact path='/' component={FrontPage} />
                        <Route path='/student' component={Student} />
                        <Route path='/coordinator' component={Coordinator} />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
