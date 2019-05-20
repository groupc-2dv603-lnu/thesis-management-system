/**
 * TODO
 *  - nav disappears on doubleClick
 *  - 
 */
import React, { Component } from 'react';
import CorNav from '../Components/CorNav';
import ReportsTable from './ReportsTable';


class CorReports extends Component {

render() {
  return (
    <div>
      <CorNav></CorNav>
      <ReportsTable></ReportsTable>
    </div>
    )
  }
}
 
export default CorReports