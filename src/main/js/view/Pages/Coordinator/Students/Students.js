import React, { Component } from 'react';
import StudentsTable from './StudentsTable'

class Students extends Component {

render() {
  return (
    
    <div>
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
 
export default Students