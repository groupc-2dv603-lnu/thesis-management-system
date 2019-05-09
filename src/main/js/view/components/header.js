'use strict';

import React, { Component } from 'react'

class Header extends React.Component {
    
    render() {
        return(
            <div className="topbar">
                {/* dropdown menu (normally hidden) */}
                <div className="dropdown-button">
                    <i className="fa fa-bars"></i>
                    <div className="dropdown-menu">
                        <a href="/#">front page</a>
                        <a href="/#/student">student</a>
                        <a href="/#/coordinator">coordinator</a>
                    </div>
                </div>
                <div className="fluid-container">
                    <div className="logo">
                        <a href="/#">
                            <i className="fas fa-feather"></i>
                            thesis mgmt
                        </a>
                    </div>
                {/* default menu */}
                    <div className="menu">
                        <a href="/#">menu item #1</a>
                        <a href="/#/student">student</a>
                        <a href="/#/coordinator">coordinator</a>
                    </div>
                </div>
                <select className="role">
                    <option>Role: Student</option>
                    <option>Role: Opponent</option>
                </select>
            </div>
        )
    }
}

export default Header