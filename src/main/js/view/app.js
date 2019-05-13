'use strict';

import React, { Component } from 'react'
const ReactDOM = require('react-dom');
const client = require('../client');
import { Route, Switch, HashRouter } from 'react-router-dom'
import Header from './components/header'
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
            this.setState({ users: response.entity._embedded.users });
        });
    }

    render() {
        return (
            <div>
                {/* <UserList users={this.state.users}/>  test list */}
                <HashRouter>
                    <Switch>
                        <Header />
                        <div className="fluid-container content">
                            <Route exact path='/' component={FrontPage} />
                            <Route path='/student' component={Student} />
                            <Route path='/coordinator' component={Coordinator} />
                            </div>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

// test
class UserList extends React.Component{
    render() {
        const users = this.props.users.map(user =>
            <User key={user._links.self.href} user={user}/>
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td><strong>Password</strong></td>
                    </tr>
                    {users}
                </tbody>
            </table>
        )
    }
}

// test
class User extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.password}</td>
            </tr>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
