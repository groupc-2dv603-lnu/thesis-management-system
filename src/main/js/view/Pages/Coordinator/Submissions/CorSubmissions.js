import React, { Component } from "react";
import CorNav from "../Components/CorNav";
import CorSubNav from "./CorSubNav";
import Submission from "./Submission";
/**
 * Indexpage for coordinator submissions
 * TODO
 *  - Remove corSubNav ? 
 */
class CorSubmissions extends Component {
  render() {
    return (
      <div>
        <CorNav />
        <Submission />
      </div>
    );
  }
}

export default CorSubmissions;
