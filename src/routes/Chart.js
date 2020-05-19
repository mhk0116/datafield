import React from "react";
import { Link } from "react-router-dom";

class Chart extends React.Component {
  render() {
    return (
      <div>
        <h2>
          This is <h1>Chart</h1> page!
        </h2>
        <Link to="/datafield">Datafield</Link>
      </div>
    );
  }
}

export default Chart;
