"use strict";

import React, { Component } from "react";
import RolesCheckbox from "./rolesCheckbox";
import { consolePrint } from "./functions";
import { deleteFromAPI } from "../../functions";

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick() {
	 deleteFromAPI("/admin/deleteUser?email=" + this.state.email);
  }

  render() {
    const { email } = this.state;
    return (
      <div style={styles.container}>
        <form style={styles.form}>
          <h3 style={{ margin: 0, marginBottom: 20 }}>Delete user</h3>

          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChange={this.handleChange}
          />

          <button
            className="loginButton"
            type="submit"
            onClick={this.handleClick}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#ffe000",
    margin: "50px auto",
    width: "94%",
    border: "1px solid black",
    padding: 20
  },
  label: {
    display: "block",
    marginTop: 20
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
  }
};

export default DeleteUser;
