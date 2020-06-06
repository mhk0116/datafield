import React from "react";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";

class Cluster extends React.Component {
  render() {
    return (
      <div>
        <img src="http://localhost:5000/download/img/cluster.png" />
        <Link to="/datafield">Datafield</Link>
        <Comment id="1" page="cluster" />
      </div>
    );
  }
}

export default Cluster;
