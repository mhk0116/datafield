import React from "react";
import { Link } from "react-router-dom";
import "./Data.css";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function Data({ number, _id, _score, _source }) {
  const title = _source.visualization.title;
  const type = JSON.parse(_source.visualization.visState).type;
  const description = _source.visualization.description;
  const id = _id.slice(14);
  // console.log(_id.slice(14));
  return (
    <TableRow className="datarow">
      <TableCell>{number}</TableCell>
      <TableCell>
        <Link
          to={{
            pathname: `/${_source.type}/${id}`,
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

Data.propTypes = {
  _id: PropTypes.string.isRequired,
  _source: PropTypes.object,
};

export default Data;
