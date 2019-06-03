'use strict';

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getFromAPI, capitalizeFirstLetter } from './../functions';

const availableRoles = ["student", "coordinator", "supervisor", "reader", "opponent", "admin"];

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = { currentUser: null, currentRole: '' }
    }

    componentDidMount() {
        getFromAPI("/loginUser").then(user => {
            const roleFromUrl = this.getRoleFromUrl();
            let role;
            availableRoles.find(role => role == roleFromUrl)
                ? role = roleFromUrl
                : role = user.entity.roles[0]

            this.setState({ currentUser: user.entity, currentRole: role });
            this.navigate(this.state.currentRole);
        })
    }

    getRoleFromUrl() {
        const arr = location.href.split("/");
        if (arr.length == 0)
            return null;
        return arr[arr.length - 1];
    }

    logout() {
        getFromAPI("/logout").then(() => {
            localStorage.removeItem(this.state.currentUser);
            this.setState({ currentUser: null });
            location.href = '/login';
        });
    }

    navigate(roleUrl) {
        window.location.href = '/#/' + roleUrl.toLowerCase();
        this.setState({ currentRole: roleUrl });
    }
    render() {
        let roles;

        if (this.state.currentUser) {
            roles = this.state.currentUser.roles.map(role =>
                <option key={role} value={role.toLowerCase()}>Role: {capitalizeFirstLetter(role)}</option>
            );
        }

        return (
            <div className="topbar">
                {/* dropdown menu (normally hidden) */}
                <div className="dropdown-button">
                    <i className="fa fa-bars"></i>
                    <div className="dropdown-menu">
                        <Link to="" onClick={() => this.logout()}>log out</Link>
                    </div>
                </div>
                <div className="fluid-container">
                    <div className="logo">
                        <Link to={this.state.currentRole.toLowerCase()}>
                            <i className="fas fa-feather" />
                            thesis mgmt
                        </Link>
                    </div>
                    {/* default menu */}
                    <div className="menu">
                        <Link to="" onClick={() => this.logout()}>log out</Link>
                    </div>
                </div>

                <div className="role">
                    <form>
                        <select id="dropdown" value={this.state.currentRole} onChange={() => this.navigate(document.getElementById("dropdown").value)}>
                            {roles}
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}

export default Header