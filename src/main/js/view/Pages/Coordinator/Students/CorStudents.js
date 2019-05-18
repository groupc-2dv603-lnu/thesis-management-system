/**
 * TODO
 *  - 
 *  - 
 */
import React, { Component } from 'react';
import CorNav from '../Components/CorNav';
import StudentsTable from './StudentsTable'

class CorStudents extends Component {

render() {
  return (
    
    <div>
      <CorNav></CorNav>
      <div style={tableStyle}> 
      <StudentsTable></StudentsTable>
      </div>
    </div>
    )
  }
}

const tableStyle = {
  marginTop: '40px',
}
 
export default CorStudents