import React, { Component } from 'react';
import StudentsTable from './StudentsTable'
import * as func from '../functions'

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
    //console.log('studentsState', this.state)
    //console.log('studentsProps', this.props)

    func.getFromAPI("/users").then(response => {
      console.log(response)
    })
  }
render() {
  return (
    
    <div>
      <div> 
      <StudentsTable></StudentsTable>
      </div>
    </div>
    )
  }
}

 
export default Students