import React from "react";
import { Link } from "react-router-dom";
import "./Data.css";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Axios from "axios";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "",
      description: "",
      id: this.props._id,
      number: this.props.number,
      raw: this.props.raw,
      hits: [],
      isDashboard: false,
    };
  }
  getSource = (props) => {
    if(this.state.id.slice(0, 1) === "v"){
       this.setState({
          title: this.props._source.visualization.title,
          type: JSON.parse(this.props._source.visualization.visState).type,
          description: this.props._source.visualization.description,
          id: this.props._id.slice(14),
        })}
      else if(this.state.id.slice(0, 1) === "d"){
      this.setState({
          title: this.props._source.dashboard.title,
          type: "dashboard",
          description: this.props._source.dashboard.description,
          id: this.props._id.slice(10),
        })}
        else
        this.setState({
          title: this.props._source.map.title,
          type: "map",
          description: this.props._source.map.description,
          id: this.props._id.slice(4),
        })
  };
  componentDidMount() {
    this.getSource();
    if (this.state.id.slice(0, 1) === "d") {
      this.getDashboard();
    }
  }
  getDashboard = async () => {
    const {
      data: {
        hits: { hits },
      },
    } = await Axios.get("/api/dashboard", { params: { raw: this.props.raw } });
    this.setState({ hits });
    this.setState({ isDashboard: true });
    if(this.state.hits.length===1){
      this.setState({type:"map"})
    }
  };

  render() {
    const {
      title,
      type,
      description,
      id,
      number,
      raw,
      hits,
      isDashboard,
    } = this.state;
    const data = [];
    if (isDashboard) {
      hits.map((d) => {
        return data.push(d._source.references[0].id);
      });
    }
    return (
      <TableRow className="datarow">
        <TableCell>{number}</TableCell>
        <TableCell>
          <Link
            to={{
              pathname: `/visualization/${id}`,
              state: {
                id: id,
                type: type,
                description: description,
                title: title,
                raw: isDashboard?data:raw,
              },
            }}
            className="Link"
          >
            {title}
          </Link>
        </TableCell>
        <TableCell>
          {description.length > 80
            ? description.slice(0, 80) + "..."
            : description}
        </TableCell>
        <TableCell>{type}</TableCell>
      </TableRow>
    );
  }
}

Data.propTypes = {
  _id: PropTypes.string.isRequired,
  _source: PropTypes.object,
};

export default Data;
