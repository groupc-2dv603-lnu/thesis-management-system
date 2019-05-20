import React, { Component } from "react";
import CorNav from "../Components/CorNav";
import Submission from "./Submission";
/**
 * Indexpage for coordinator submissions
 * TODO
 *  -
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
