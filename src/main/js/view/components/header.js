'use strict';

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    
    render() {
        return(
            <div className="topbar">
                {/* dropdown menu (normally hidden) */}
                <div className="dropdown-button">
                    <i className="fa fa-bars"></i>
                    <div className="dropdown-menu">
                        menu item #1
                        <Link to="/student">student</Link>
                        <Link to="/coordinator">coordinator</Link>
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
                        <Link to="">menu item #1</Link>
                        <Link to="/student">student</Link>
                        <Link to="/coordinator">coordinator</Link>
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