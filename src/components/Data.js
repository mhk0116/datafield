import React from "react";
import { Link } from "react-router-dom";
import "./Data.css";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "",
      description: "",
      id: this.props._id,
      number: this.props.number,
    };
  }
  getSource = (props) => {
    this.state.id.slice(0, 1) === "v"
      ? this.setState({
          title: this.props._source.visualization.title,
          type: JSON.parse(this.props._source.visualization.visState).type,
          description: this.props._source.visualization.description,
          id: this.props._id.slice(14),
        })
      : this.setState({
          title: this.props._source.dashboard.title,
          type: "dashboard",
          description: this.props._source.dashboard.description,
          id: this.props._id.slice(10),
        });
  };
  componentDidMount() {
    this.getSource();
  }
  render() {
    const { title, type, description, id, number } = this.state;
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
