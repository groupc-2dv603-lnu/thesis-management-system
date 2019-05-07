'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="topbar">
                    {/* dropdown menu (normally hidden) */}
                    <div class="dropdown-button">
                        <i class="fa fa-bars"></i>
                        <div class="dropdown-menu">
                            <a>menu item #1</a>
                            <a>menu item #2</a>
                            <a>menu item #3</a>
                        </div>
                    </div>

                    <div class="fluid-container">
                        <div class="logo">
                            <i class="fas fa-feather"></i>
                            thesis mgmt
                        </div>
                        {/* default menu */}
                        <div class="menu">
                            <a>menu item #1</a>
                            <a>menu item #2</a>
                            <a>menu item #3</a>

                            <select class="role">
                                <option>Role: Student</option>
                                <option>Role: Opponent</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/*  Content */}
                <div class="fluid-container content">
                    Thesis status: N/A
                </div>
            </div>
        )
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
