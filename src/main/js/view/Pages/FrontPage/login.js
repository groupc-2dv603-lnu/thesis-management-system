'use strict';

import React, { Component } from 'react';


class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.type]: event.target.value
        });
    }
    /*
    TODO: make handleClick do something useful instead
     */
    handleClick() {
        alert("Entered email: " + this.state.email
        + "\nEntered password: " + this.state.password);
    }

    render() {
        const {email, password} = this.state;
        return (
            <div style={styles.container}>
                <h1>Welcome to thesis mgmt!</h1>
                <form style={styles.form}>
                    <h3>Login to enter website</h3>

                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="email" style={styles.label}>Password</label>
                    <input
                        type="password"
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChange={this.handleChange}
                    />

                    <button
                        className="loginButton"
                        type="submit"
                        onClick={this.handleClick}
                    >Login
                    </button>
                </form>
            </div>
        );
    }
}

const styles = {
    container: {
        backgroundColor: "#ffe000",
        margin: "9px auto",
        width: "94%",
        border: "1px solid black",
        padding: 20
    },
    label: {
        display: "block",
        marginTop: 20,
    },
    input: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 3,
        border: "1px solid #777",
        width: "100%",
        display: "block",
        boxSizing: "border-box"
    },
    form: {
        width: "70%",
        margin: "0 auto",
        backgroundColor: "white",
        border: "1px solid white",
        alignItems: "center",
        padding: 10,
        borderRadius: 3
    },

    /*
    This styling is currently inside found inside main.css because button:hover not working from here
    button: {
        color: "black",
        backgroundColor: "#ffe000",
        border: "1px solid #ffe000",
        padding: "10px 15px",
        fontWeight: "bold"


    }

     */

};


export default Login