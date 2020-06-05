import React from "react";
import { Link } from "react-router-dom";

class Cluster extends React.Component {
  render() {
    return (
      <div>
        <img src="http://localhost:5000/download/img/cluster.png" />
        <Link to="/datafield">Datafield</Link>
      </div>
    );
  }
}

export default Cluster;
