import React, { Component } from 'react';
import ReportPopupBody from './ReportPopupBody';
import * as PopupStyle from '../Styles/PopupStyles'
import * as func from './reportFunctions/reportFunctions'

class ReportPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidders: null,
      readers: [],
      availableOpponents: [],
      assignedOpponents: [],
      loading: true,
      alreadyAssignedReaderNames: null
    }
  }

  async componentDidMount () {
    const bidders = await func.getUsers(this.props.report.bids)
    const readers = await func.getUsers(this.props.report.assignedReaders)
    const availableOpponents = await func.getAvailableOpponents()
    const assignedOpponents = await func.getUsers(this.props.report.assignedOpponents)
    const alreadyAssignedReaderNames = await func.getAlreadyAssignedReaderNames(this.props.report.assignedReaders)
    
    this.setState({
      bidders: bidders,
      readers: readers,
      availableOpponents: availableOpponents,
      assignedOpponents: assignedOpponents,
      alreadyAssignedReaderNames: alreadyAssignedReaderNames,
      loading: false
    })

  }
  render() { 
    return (
      <div style={PopupStyle.popup}>
        <div style={PopupStyle.popupInner}>
          <div style={PopupStyle.headerDiv}>
          <div style={PopupStyle.closeButtonDiv}>
            <i
              className="fas fa-window-close"
              onClick={this.props.closePopup}
              style={PopupStyle.popupClose}
            />
          </div>
          <div style={PopupStyle.popupHeader}>Initial Report of {this.props.report.name}</div>
          </div>
          {this.state.loading === true ? (
            <div style={PopupStyle.loading}>Loading...</div>
          ) : (
            <div>

              <div style={PopupStyle.popupBody}>
                <ReportPopupBody
                  bidders={this.state.bidders}
                  readers={this.state.readers}
                  availableOpponents={this.state.availableOpponents}
                  assignedOpponents={this.state.assignedOpponents}
                  report={this.props.report}
                  alreadyAssignedReaderNames={this.state.alreadyAssignedReaderNames}
                ></ReportPopupBody>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

 
export default ReportPopup;