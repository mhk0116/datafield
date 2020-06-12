import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Data from "../components/Data";
// import Hamberger from "../components/Hamberger";
// style
import "./Datafield.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  paper: {
    margin: "0 auto",
    maxWidth: "1200px",
  },
  tableHead: {
    fontSize: "1.0rem",
    fontWeight: "1000",
  },
  progress: {
    margin: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "darkgray",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60ch",
      "&:focus": {
        width: "60ch",
      },
    },
  },
});

class Datafield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [], // json file from elasticsearch
      completed: 0,
      searchKeyword: "",
    };
  }

  // rerender data when state was changed
  stateRefresh = () => {
    this.setState({
      hits: [],
      completed: 0,
    });
    this.getData();
  };

  // get data from elasticsearch
  getData = async () => {
    const {
      data: {
        hits: { hits },
      },
    } = await axios.get("/api/data");
    this.setState({ hits });
  };
  componentDidMount() {
    this.state.hits
      ? this.getData()
      : (this.timer = setInterval(this.progress, 20));
  }

  // loading animation
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    // render data
    const filteredComponents = (data) => {
      data = data.filter((d) => {
        if (d._id.slice(0, 1) === "v") {
          return (
            d._source.visualization.title.indexOf(this.state.searchKeyword) > -1
          );
        } else if (d._id.slice(0, 1) === "d") {
          return (
            d._source.dashboard.title.indexOf(this.state.searchKeyword) > -1
          );
        }
        // else
        //   return d._source.map.title.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((d, index) => {
        if (d._id.slice(0, 1) !== "m"){
        return (
          <Data
            key={d._id}
            number={index}
            _id={d._id}
            _source={d._source}
            raw={d._source.references.map((d) => {
              return d.id;
            })}
          />
        );}
      });
    };
    const { classes } = this.props;
    const cellList = ["번호", "제목", "설명", "구분"];

    return (
      <div className="root">
        <div className={classes.root}>
          <Paper className={classes.paper}>
          <div className="dataTitle"></div>
          <div className="search">
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {cellList.map((c, index) => {
                    return (
                      <TableCell className={classes.tableHead} key={index}>
                        {c}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.hits ? (
                  filteredComponents(this.state.hits)
                ) : (
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress
                        className={classes.progress}
                        variant="determinate"
                        value={this.state.completed}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
          </div>
        </div>
    );
  }
}
export default withStyles(styles)(Datafield);
