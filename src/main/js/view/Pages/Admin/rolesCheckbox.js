'use strict';

import React, { Component } from 'react'
// const client = require('../../../client');

class RolesCheckbox extends Component {
    constructor(props) {
        super(props);
        // this.state = { users: [] };
    }

    // componentDidMount() {
    //     client({ method: 'GET', path: '/users' }).then(response => {
    //         this.setState({ users: response.entity._embedded.users });
    //     });
    // }

    render() {
        return (
            <div>
                <input type="checkbox" value="Coordinator"/>Coordinator<br/>
                <input type="checkbox" value="Student"/>Student<br/>
                <input type="checkbox" value="Supervisor"/>Supervisor<br/>
                <input type="checkbox" value="Reader"/>Reader<br/>
                <input type="checkbox" value="Opponent"/>Opponent<br/>
            </div>


        )
    }
}

export default RolesCheckbox