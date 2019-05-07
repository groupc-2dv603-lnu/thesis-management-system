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
                    <div class="menu">
                        <div class="logo">
                            <i class="fas fa-feather"></i>
                            thesis mgmt
                        </div>
                        <a>menu item #1</a>
                        <a>menu item #2</a>
                        <a>menu item #3</a>

                        <select class="role">
                            <option>Role: Student</option>
                            <option>Role: Opponent</option>
                        </select>
                    </div>
                </div>
                <div class="content">
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
