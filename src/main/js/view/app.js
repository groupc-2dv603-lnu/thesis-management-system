'use strict';

import React, { Component } from 'react'
const ReactDOM = require('react-dom');
import { Route, Switch, HashRouter } from 'react-router-dom'
import Header from './components/header'
import FrontPage from './Pages/FrontPage'
import Student from './Pages/Student'
import Supervisor from './Pages/Supervisor'
import Coordinator from './Pages/Coordinator'

class App extends Component {
	
    render() {
        return (
            <div>
                <HashRouter>
                    <Header />
                    {/* <Switch> */}
                        <div className="fluid-container content">
                            <Route exact path='/' component={FrontPage} />
                            <Route exact path='/supervisor' component={Supervisor} />
                            <Route exact path='/student' component={Student} />
                            <Route exact path='/coordinator' component={Coordinator} />
                        </div>
                    {/* </Switch> */}
                </HashRouter>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
