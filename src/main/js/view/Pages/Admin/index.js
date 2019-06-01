"use strict";

import React, { Component } from "react";
import CreateUser from "./createUser";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";

class Admin extends Component {
  render() {
    return (
      <div>
        <CreateUser />
        <UpdateUser />
        {/*<DeleteUser />*/}
      </div>
    );
  }
}

export default Admin;
