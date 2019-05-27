'use strict';

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Style from './HeaderStyle'

class CoordinatorHeader extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
      }
    
    render() {
        return(
            <div className="topbar">
                {/* dropdown menu (normally hidden) */}
                <div className="dropdown-button">
                    <i className="fa fa-bars"></i>
                    <div className="dropdown-menu">
                        <button style={Style.dropdownButtons} onClick={() => this.props.handleChange('submissions')}>Submissions</button>
                        <button style={Style.dropdownButtons} onClick={() => this.props.handleChange('students')}>Students</button>
                        <button style={Style.dropdownButtons} onClick={() => this.props.handleChange('reports')}>Initial Reports</button>
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
                        <button style={Style.headerButtons} onClick={() => this.props.handleChange('submissions')}>Submissions</button>
                        <button style={Style.headerButtons} onClick={() => this.props.handleChange('students')}>Students</button>
                        <button style={Style.headerButtons} onClick={() => this.props.handleChange('reports')}>Initial Reports</button>

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

export default CoordinatorHeader