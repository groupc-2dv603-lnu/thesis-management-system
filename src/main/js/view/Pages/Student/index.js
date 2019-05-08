'use strict';

import React, { Component } from 'react'
const client = require('../../client');

class Student extends Component {
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
                <p>Student page</p>
            </div>
        )
    }
}

export default Student