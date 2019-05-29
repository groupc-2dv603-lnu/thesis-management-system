'use strict';

import React, { Component } from 'react'
import CreateUser from "./createUser";
// const client = require('../../../client');

class Admin extends Component {
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
                <CreateUser/>

            </div>
        )
    }
}

export default Admin