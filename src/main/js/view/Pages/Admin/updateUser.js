"use strict";

import React, { Component } from "react";
import RolesCheckbox from "./rolesCheckbox";
import { consolePrint } from "./functions";
import { putToAPI } from "../../functions";

class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  handleClick() {
    putToAPI("/admin/assignRoles?email2=" + this.state.email, {
      //emailAdress: this.state.email,
      roles: this.state.roles
    });
  }

  render() {
    const { email } = this.state;
    return (
      <div style={styles.container}>
        <form style={styles.form}>
          <h3 style={{ margin: 0, marginBottom: 20 }}>Update user</h3>

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

          <label htmlFor="roles" style={styles.label}>
            Choose user role(s)
          </label>
          <div className="checkBoxes">
            <input
              type="checkbox"
              value="Coordinator"
              name="coordinator"
              onChange={this.onCheckboxChange}
            />
            Coordinator
            <br />
            <input
              type="checkbox"
              value="Student"
              name="student"
              onChange={this.onCheckboxChange}
            />
            Student
            <br />
            <input
              type="checkbox"
              value="Reader"
              name="reader"
              onChange={this.onCheckboxChange}
            />
            Reader
            <br />
            <input
              type="checkbox"
              value="Supervisor"
              name="supervisor"
              onChange={this.onCheckboxChange}
            />
            Supervisor
            <br />
            <input
              type="checkbox"
              value="Opponent"
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
            Update
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

export default UpdateUser;
