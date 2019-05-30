"use strict";

import React, { Component } from "react";
import RolesCheckbox from "./rolesCheckbox";
import { consolePrint } from "./functions";
import { postToAPI } from "../../functions";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      roles: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onCheckboxChange(event) {
    const roles = this.state.roles;

    if (event.target.checked) {
      roles.push(event.target.value);
    }
    //remove from array when unchecked
    else {
      let index = roles.indexOf(event.target.value);
      roles.splice(index);
    }

    this.setState({ roles: roles });
  }
  /*
    TODO: make handleClick do something useful instead
     */
  handleClick() {
    const { password, confirmPassword, roles } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords dont match");
      return;
    }
    if (roles.length === 0) {
      alert("You must choose at least 1 role for the user");
    } else {
      postToAPI("/admin/createUser", {
        name: this.state.name,
        password: this.state.password,
        emailAdress: this.state.email,
        roles: this.state.roles
      });
    }
  }

  render() {
    const { name, password, confirmPassword, email } = this.state;
    return (
      <div style={styles.container}>
        <h1 style={{ margin: 0, marginBottom: 20 }}>Welcome admin</h1>
        <form style={styles.form}>
          <h3 style={{ margin: 0, marginBottom: 20 }}>Create new user</h3>

          <label htmlFor="name" style={styles.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            style={styles.input}
            placeholder="Create new name"
            value={name}
            onChange={this.handleChange}
          />

          <label htmlFor="email" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            name="password"
            style={styles.input}
            placeholder="Create new password"
            value={password}
            onChange={this.handleChange}
          />

          <label htmlFor="email" style={styles.label}>
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            style={styles.input}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={this.handleChange}
          />

          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            style={styles.input}
            placeholder="Create new email"
            value={email}
            onChange={this.handleChange}
          />

          <label htmlFor="roles" style={styles.label}>
            Choose user role(s)
          </label>
          <div className="checkBoxes">
            <input
              type="checkbox"
              value="COORDINATOR"
              name="coordinator"
              onChange={this.onCheckboxChange}
            />
            Coordinator
            <br />
            <input
              type="checkbox"
              value="STUDENT"
              name="student"
              onChange={this.onCheckboxChange}
            />
            Student
            <br />
            <input
              type="checkbox"
              value="READER"
              name="reader"
              onChange={this.onCheckboxChange}
            />
            Reader
            <br />
            <input
              type="checkbox"
              value="SUPERVISOR"
              name="supervisor"
              onChange={this.onCheckboxChange}
            />
            Supervisor
            <br />
            <input
              type="checkbox"
              value="OPPONENT"
              name="opponent"
              onChange={this.onCheckboxChange}
            />
            Opponent
            <br />
          </div>

          <button
            className="loginButton"
            type="submit"
            onClick={this.handleClick}
          >
            Create
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

export default CreateUser;
