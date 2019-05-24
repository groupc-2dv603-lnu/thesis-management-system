import React, { Component } from "react";
import * as Style from "../Styles/ReportStyles";
import * as PopupStyle from "../Styles/PopupStyles";
import { getInitialReport, getName, getOpponents } from "../functions";

class ReportPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: null,
      bids: [],
      assignedReaders: [],
      assignedOpponent: [],
      availableOpponents: []
    };
    this.state.report = getInitialReport();
    this.state.bids = this.state.report.bids;
    this.state.assignedReaders = this.state.report.assignedReaders;
    this.state.assignedOpponent = this.state.report.assignedOpponent;
    this.state.availableOpponents = getOpponents();
  }

  showBids() {
    return this.state.bids.map(userId => {
      return (
        <div style={Style.bidRow}>
          {getName(userId)}
          <i
            onClick={() => this.assignReader(userId)}
            style={Style.plus}
            className="fas fa-plus"
          />
        </div>
      );
    });
  }

  showReaders() {
    return this.state.assignedReaders.map(userId => {
      return (
        <div style={Style.bidRow}>
          {getName(userId)}
          <i
            onClick={() => this.removeReader(userId)}
            style={Style.plus}
            className="fas fa-times"
          />
        </div>
      );
    });
  }
  showAvailbableOpponents() {
    return this.state.availableOpponents.map(userId => {
      return (
        <div style={Style.bidRow}>
          {getName(userId)}
          <i
            onClick={() => this.assignOpponent(userId)}
            style={Style.plus}
            className="fas fa-plus"
          />
        </div>
      );
    });
  }

  showAssignedOpponent() {
    return this.state.assignedOpponent.map(userId => {
      return (
        <div style={Style.bidRow}>
          {getName(userId)}
          <i
            onClick={() => this.removeAssignedOpponent(userId)}
            style={Style.plus}
            className="fas fa-times"
          />
        </div>
      );
    });
  }
  assignReader(userId) {
    let bids = this.state.bids.filter(id => userId !== id);
    this.state.assignedReaders.push(userId);
    this.setState({
      assignedReaders: this.state.assignedReaders,
      bids: bids
    });
    console.log(`${userId} removed from bids ${this.state.bids}`);
    console.log(
      `${userId} added as reader, readers: ${this.state.assignedReaders}`
    );
  }
  removeReader(userId) {
    let readers = this.state.assignedReaders.filter(id => userId !== id);
    this.state.bids.push(userId);
    this.setState({
      assignedReaders: readers,
      bids: this.state.bids
    });
    console.log(`${userId} removed from readers ${this.state.assignedReaders}`);
    console.log(`${userId} added to bids, bids: ${this.state.bids}`);
  }

  assignOpponent(userId) {
    let availableOpponents = this.state.availableOpponents.filter(
      id => userId !== id
    );
    this.state.assignedOpponent.push(userId);
    this.setState({
      assignedOpponent: this.state.assignedOpponent,
      availableOpponents: availableOpponents
    });
    console.log(
      `${userId} removed from availableOpponents ${
        this.state.availableOpponents
      }`
    );
    console.log(
      `${userId} added as opponent, assignedOpponent: ${
        this.state.assignedReaders
      }`
    );
  }

  removeAssignedOpponent(userId) {
    let assignedOpponent = this.state.assignedOpponent.filter(
      id => userId !== id
    );
    this.state.availableOpponents.push(userId);
    this.setState({
      availableOpponents: this.state.availableOpponents,
      assignedOpponent: assignedOpponent
    });
    console.log(
      `${userId} removed from assigned opponents ${this.state.assignedOpponent}`
    );
    console.log(
      `${userId} added as available, opponents: ${
        this.state.availableOpponents
      }`
    );
  }

  render() {
    return (
      <div style={PopupStyle.popup}>
        <div style={PopupStyle.popupInner}>
          <i
            className="fas fa-window-close"
            onClick={this.props.closePopup}
            style={PopupStyle.popupClose}
          />
          <h3 style={PopupStyle.popupHeader}>
            {getName(this.state.report.userId)}
          </h3>
          <div style={PopupStyle.popupBody}>
            <div style={Style.bidsDiv}>
              <span style={Style.reportTypeHeader}>Bidders</span>
              {this.state.bids.length > 0 ? (
                this.showBids()
              ) : (
                <div style={Style.noBids}>Report has no bidders</div>
              )}
            </div>
            <div style={Style.bidsDiv}>
              <span style={Style.reportTypeHeader}>Readers</span>
              {this.state.assignedReaders.length > 0 ? (
                this.showReaders()
              ) : (
                <div style={Style.noBids}>Report has no readers</div>
              )}
            </div>
            <div style={Style.bidsDiv}>
              <span style={Style.reportTypeHeader}>Assigned opponent</span>
              {this.state.assignedOpponent.length > 0 ? (
                this.showAssignedOpponent()
              ) : (
                <div style={Style.noBids}>Report has no assigned opponent</div>
              )}
            </div>
            <div style={Style.bidsDiv}>
              <span style={Style.reportTypeHeader}>Available opponents</span>
              {this.state.availableOpponents.length > 0 ? (
                this.showAvailbableOpponents()
              ) : (
                <div style={Style.noBids}>There is no available opponents</div>
              )}
            </div>{" "}
            <button
              onClick={() => this.handleSubmit()}
              style={PopupStyle.submitButton}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ReportPopup;
