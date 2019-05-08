'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
		client({method: 'GET', path: '/users'}).then(response => {
			this.setState({users: response.entity._embedded.userses});
		});
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

                        </div>
                        <select class="role">
                            <option>Role: Student</option>
                            <option>Role: Opponent</option>
                        </select>
                    </div>
                </div>
                {/*  Content */}
                <div class="fluid-container content">
                    {/* Thesis status: N/A */}
                    <UserList users={this.state.users}/>
                </div>
            </div>
        )
    }
}

class UserList extends React.Component{
	render() {
		const users = this.props.users.map(user =>
			<User key={user._links.self.href} user={user}/>
		);
		return (
            <table>
				<tbody>
					<tr>
						<td><strong>Name</strong></td>
						<td><strong>Password</strong></td>
					</tr>
					{users}
				</tbody>
			</table>
		)
	}
}

class User extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.password}</td>
            </tr>
        )
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
