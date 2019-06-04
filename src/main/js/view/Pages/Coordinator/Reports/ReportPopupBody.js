import React, { Component } from "react";
import * as Style from "../Styles/ReportStyles";
import * as PopupStyle from "../Styles/PopupStyles";
import * as corFunc from '../coordinatorFunctions'
import { dbSubmissionTypes } from '../../../enums'

class ReportPopupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidders: this.props.bidders,
      assignedReaders: [],
      availableOpponents: this.props.availableOpponents,
      assignedOpponents: this.props.assignedOpponents,
      showMessage: false,
      message: "",
    };
    this.getBidders = this.getBidders.bind(this);
    this.getReaders = this.getReaders.bind(this);
    this.getAvailableOpponents = this.getAvailableOpponents.bind(this);
    console.log('PROPS', this.props)

  }

  assignReader(user) {
    if (this.state.assignedReaders.length === 1) {
      this.toggleMessage("One at a time pls");
      this.resetMessage()
      return;
    }
    let bidders = this.state.bidders.filter(
      bidder => bidder.userId !== user.userId
    );
    this.state.assignedReaders.push(user);
    this.setState({
      bidders: bidders,
      assignedReaders: this.state.assignedReaders
    });
  }

  removeReader(user) {
    let readers = this.state.assignedReaders.filter(
      reader => reader.userId !== user.userId
    );
    this.state.bidders.push(user);
    this.setState({
      bidders: this.state.bidders,
      assignedReaders: readers
    });
  }

  assignOpponent(user) {
    if (this.state.assignedOpponents.length === 1) {
      this.toggleMessage("Max one opponent can be assigned");
      this.resetMessage()
      return;
    }
    for (const opponent of this.state.assignedOpponents) {
      if (opponent.userId === user.userId) {
        this.toggleMessage(`${user.name} is already assigned as opponent`);
        this.resetMessage()
        return;
      } else {
        let opponents = this.state.availableOpponents.filter(
          opponent => opponent.userId !== user.userId
        );
        this.state.assignedOpponents.push(user);
        this.setState({
          availableOpponents: opponents,
          assignedOpponents: this.state.assignedOpponents
        });
        console.log('assignedOpponent', this.state.assignedOpponents)
      }
    }
    let opponents = this.state.availableOpponents.filter(
      opponent => opponent.userId !== user.userId
    );
    this.state.assignedOpponents.push(user.userId);
    this.setState({
      availableOpponents: opponents,
      assignedOpponents: this.state.assignedOpponents
    });
    console.log('STATE', this.state)
  }

  removeOpponent(user) {
    let opponents = this.state.assignedOpponents.filter(
      opponent => opponent.userId !== user.userId
    );
    this.state.availableOpponents.push(user);
    this.setState({
      assignedOpponents: [],
      availableOpponents: this.state.availableOpponents
    });
    console.log('Assigned opps', this.state.assignedOpponents)
  }

  getReaders(readers) {
    if (readers.length === 0) {
      return <div style={Style.reportBoxRow}>No assigned readers</div>;
    }
    let i = 0;
    return readers.map(reader => {
      return (
        <div style={Style.reportBoxRow} key={i++}>
          {reader.name}
          <i
            style={Style.reportBoxRowSymbol}
            onClick={() => this.removeReader(reader)}
            className="fa fa-minus"
            aria-hidden="true"
          />
        </div>
      );
    });
  }

  getBidders(bidders) {
    if (bidders.length === 0) {
      return <div style={Style.reportBoxRow}>No bids</div>;
    }
    let i = 0;
    return bidders.map(bidder => {
      return (
        <div style={Style.reportBoxRow} key={i++}>
          {bidder.name}
          <i
            style={Style.reportBoxRowSymbol}
            onClick={() => this.assignReader(bidder)}
            className="fa fa-plus"
            aria-hidden="true"
          />
        </div>
      );
    });

  }

  getAvailableOpponents(opponents) {
    if (opponents.length === 0) {
      return <div style={Style.reportBoxRow}>No Available Opponents</div>;
    }
    let i = 0;
    return opponents.map(opponent => {
      return (
        <div style={Style.reportBoxRow} key={i++}>
          {opponent.name}
          <i
            style={Style.reportBoxRowSymbol}
            onClick={() => this.assignOpponent(opponent)}
            className="fa fa-plus"
            aria-hidden="true"
          />
        </div>
      );
    });
  }

  getAssignedOpponents(opponents) {
    console.log('OPPONENTS', opponents)
    if (opponents.length === 0) {
      return <div style={Style.reportBoxRow}>No assigned opponents</div>;
    }

    let i = 0;
    return opponents.map(opponent => {
      return (
        <div style={Style.reportBoxRow} key={i++}>
          {opponent.name}
          <i
            style={Style.reportBoxRowSymbol}
            onClick={() => this.removeOpponent(opponent)}
            className="fa fa-minus"
            aria-hidden="true"
          />
        </div>
      );
    });
  }

  async submitAssignedOpponent() {

    this.props.report.assignedOpponents = this.removeNames(
      this.state.assignedOpponents
    );
    let initialReport = Object.assign({}, this.props.report);
    delete initialReport.name;
    
    console.log('subop state', this.state.assignedOpponents)
    this.props.report.assignedOpponents = this.state.assignedOpponents
    console.log('PROPSOPP', this.props.report.assignedOpponents )
    const request = await corFunc.updateOpponent(this.state.assignedOpponents[0], this.props.report.id, this.props.report)

  }

  submitAssignedReader() {
    this.props.report.bids = this.removeNames(this.state.bidders);
    this.props.report.assignedReaders = this.removeNames(
      this.state.assignedReaders
    );

    console.log('READERID', this.state.assignedReaders[0], this.props.report.id, this.props.report)
    const request = corFunc.updateReader(this.state.assignedReaders[0].userId, this.props.report.id, this.props.report)
    }
    

  removeNames(users) {
    let userIds = [];
    for (const user of users) {
      userIds.push(user.userId);
    }
    return userIds;
  }

  toggleMessage(message) {
    this.setState({
      message: message,
      showMessage: !this.state.showMessage
    });
  }

  resetMessage() {
    setTimeout(() => {
      this.toggleMessage("");
    }, 2000);
  }


  getMessage() {
    return <div style={PopupStyle.message}>{this.state.message}</div>;
  }

  render() {
    return (
      <div style={Style.reportBody}>
        <div>{this.state.showMessage === true ? this.getMessage() : null}</div>
        {/* ---- BIDS ---- */}
        <div style={Style.reportBox}>
          <div style={Style.reportBoxHeader}>Bids</div>
          {this.getBidders(this.state.bidders)}
        </div>

        {/* ---- ASSIGNED READERS ---- */}
        <div style={Style.reportBox}>
          <div style={Style.reportBoxHeader}>Assign Reader</div>
          {this.getReaders(this.state.assignedReaders)}
        </div>
             {/* ---- SUBMIT ---- */}
            <div style={PopupStyle.reportSubmitDiv}>
          <button
            style={PopupStyle.submitButton}
            onClick={() => this.submitAssignedReader()}
          >
            Assign reader
          </button>
           </div>

        {/* ---- AVAILABLE OPPONENTS ---- */}
        <div style={Style.reportBox}>
          <div style={Style.reportBoxHeader}>Available Opponents</div>
          {this.getAvailableOpponents(this.state.availableOpponents)}
        </div>

        {/* ---- ASSIGNED OPPONENTS ---- */}
        <div style={Style.reportBox}>
          <div style={Style.reportBoxHeader}>Assigned Opponents</div>
          {this.getAssignedOpponents(this.state.assignedOpponents)}
        </div>

        {/* ---- SUBMIT ---- */}
        <div style={PopupStyle.reportSubmitDiv}>
          <button
            style={PopupStyle.submitButton}
            onClick={() => this.submitAssignedOpponent()}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default ReportPopupBody;
