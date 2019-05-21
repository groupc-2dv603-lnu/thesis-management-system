import React, { Component } from "react";
import { getProjectDescription } from "../functions";
import * as Style from "../Styles";
import * as Mock from "../Mocks";

class ProjectDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: null,
      description: null
    };

    this.state.description = getProjectDescription(this.props.userId);
  }

  render() {
    console.log("desc", this.state.description);

    return (
      <div style={Style.submissionDivStyle}>
        {this.state.description !== null ? (
          <div style={Style.popupForm}>
            <button style={Style.downloadSubmission}>Download Description</button>
            <form>
              <div style={Style.deadline}>
                <label>
                  Deadline: 
                  <input
                    type="text"
                    name="deadline"
                    placeholder={this.state.description.deadline}
                    style={Style.input}
                  />
                </label>
              </div>
              <div style={Style.grade}>
              <label>
                Grade: 
                <select style={Style.input}>
                  <option value="none">Not set</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              </label>
              </div>
            </form>
          </div>
        ) : (
          "No description found"
        )}
      </div>
    );
  }
}

export default ProjectDescription;
