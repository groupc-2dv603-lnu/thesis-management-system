'use strict';

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getFromAPI, capitalizeFirstLetter } from './../functions';

class Header extends Component {
    
    constructor(props) {
        super(props);

        this.state = { currentUser: null, currentRole: '' }
    }

    componentDidMount() {
        getFromAPI("/loginUser").then(user => {
            this.setState({ currentUser: user.entity, currentRole: user.entity.roles[0] });
        })
    }

    logout() {
        getFromAPI("/logout").then(() => {
            this.setState({ currentUser: null });
        });
    }

    navigate(url) {
        window.location.href = '/#/' + url;
        this.setState({ currentRole: url });
    }

    render() {
        let roles;

        if(this.state.currentUser) {
            roles = this.state.currentUser.roles.map(role =>
                <option key={role} value={role.toLowerCase()}>Role: {capitalizeFirstLetter(role)}</option>
                );
        }

        return(
            <div className="topbar">
                {/* dropdown menu (normally hidden) */}
                <div className="dropdown-button">
                    <i className="fa fa-bars"></i>
                    <div className="dropdown-menu">
                    {this.state.currentUser ? 
                        <Link to="" onClick={() => this.logout()}>log out</Link>
                    :
                        <a href="/login">log in</a>
                    }
                    </div>
                </div>
                <div className="fluid-container">
                    <div className="logo">
                        <Link to="/#">
                            <i className="fas fa-feather"></i>
                            thesis mgmt
                        </Link>
                    </div>
                    {/* default menu */}
                    <div className="menu">
                        <Link to={"/"  + this.state.currentRole.toLowerCase()}>temp navigation</Link>
                        {this.state.currentUser ? 
                            <Link to="" onClick={() => this.logout()}>log out</Link>
                        :
                            <a href="/login">log in</a>
                        }
                    </div>
                </div>

                <div className="role">
                    {/* User logged in, show role dropdown */}
                    {this.state.currentUser ? 
                        <form>
                            <select id="dropdown" onChange={() => this.navigate(document.getElementById("dropdown").value)}>
                                {roles}
                                {/* <option value="student">Role: Student</option>
                                <option value="coordinator">Role: Coordinator</option>
                                <option value="supervisor">Role: Supervisor</option>
                                <option value="reader">Role: Reader</option>
                                <option value="opponent">Role: Opponent</option> */}
                            </select>
                        </form>
                    :
                        null
                    }
                </div>
            </div>
        )
    }
}

export default Header