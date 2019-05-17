/**
 * TODO
 *  - nav disappears on doubleClick
 *  - 
 */
import React, { Component } from 'react';
import CorNav from '../Components/CorNav';
import * as Mock from './StuMock';


class CorStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
}

componentDidMount() {
  const students = 
}
render() {
  return (
    <div>
      <CorNav></CorNav> {/* disappears on doubleClick */}

    </div>
    )
  }
}
 
export default CorStudents