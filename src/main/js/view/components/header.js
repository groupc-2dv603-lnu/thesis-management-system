'use strict';

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    
    constructor(props) {
        super(props);

        //mock
        this.state = { currentRole: '' }
    }
    navigate(url) {
        window.location.href = '/#/' + url;
        this.setState({ currentRole: url });
    }
    
    render() {
        return(
            <div className="topbar">
                {/* dropdown menu (normally hidden) */}
                <div className="dropdown-button">
                    <i className="fa fa-bars"></i>
                    <div className="dropdown-menu">
                        menu item #1
                        <Link to="">menu item #1</Link>
                        <Link to="">menu item #2</Link>
                    </div>
                </div>
                <div className="fluid-container">
                    <div className="logo">
                        {/* <Link to="/#"> */}
                            <i className="fas fa-feather"></i>
                            thesis mgmt
                        {/* </Link> */}
                    </div>
                {/* default menu */}
                    <div className="menu">
                        <Link to="">menu item #1</Link>
                        <Link to="">menu item #2</Link>
                        <Link to="">menu item #3</Link>
                    </div>
                </div>
                <form>
                    <select className="role" id="dropdown" onChange={() => this.navigate(document.getElementById("dropdown").value)}>
                        <option value="student">Role: Student</option>
                        <option value="coordinator">Role: Coordinator</option>
                        <option value="supervisor">Role: Supervisor</option>
                        <option value="reader">Role: Reader</option>
                        <option value="opponent">Role: Opponent</option>
                    </select>
                </form>
            </div>
        )
    }
}

export default Header