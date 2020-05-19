import React from "react";
import { Link } from "react-router-dom";

class Report extends React.Component {
  render() {
    return (
      <div>
        <h2>
          This is <h1>Report</h1> page!
        </h2>
        <Link to="/datafield">Datafield</Link>
      </div>
    );
  }
}

export default Report;
