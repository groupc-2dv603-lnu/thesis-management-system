'use strict';

import React, { Component } from 'react';


class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    render() {
        return (
            <div className="submission">

                <form style={{backgroundColor: "yellow"}}>
                    <div style={{width: "50%", margin: "0 auto", backgroundColor: "green"}}>
                        <p>E-mail: </p>
                        <input type="email" style={styles.textInput}/>
                    </div>
                    <div style={styles.inputContainer}>
                        <p>Password: </p>
                        <input type="password" style={styles.textInput}/>
                    </div>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}

const styles = {
    textInput: {
        size: 40,
        height: 30,
        maxWidth: "100%"
    },
    inputContainer: {
        width: "50%",
        margin: "0 auto",
        backgroundColor: "orange"
    }

};


export default Login