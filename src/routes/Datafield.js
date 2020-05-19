import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Data from "../components/Data";
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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  paper: {
    marginTop: 18,
    marginLeft: 18,
    marginRight: 18,
  },
  tableHead: {
    fontSize: "1.0rem",
  },
  progress: {
    margin: theme.spacing(2),
  },
  menuButton: {
    color: "black",
    marginRight: theme.spacing(2),
  },
  title: {
    // color: "black",
    flexGrow: 1,
    display: "none",
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
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
      width: "12ch",
      "&:focus": {
        width: "20ch",
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

  // search event handler
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    // render data
    const filteredComponents = (data) => {
      data = data.filter((d) => {
        return d._source.title.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((d, index) => {
        return (
          <Data
            key={d._id}
            number={index}
            _id={d._id}
            // _score={d._score}
            _type={d._type}
            _source={d._source}
          />
        );
      });
    };
    const { classes } = this.props;
    const cellList = ["번호", "제목 (누르면 이동)", "설명", "구분"];

    return (
      <div className="root">
        <div className={classes.root}>
          <AppBar
            position="static"
            style={{ background: "white" }}
            elevation={1}
          >
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.title}
                color="inherit"
                aria-label="open drawer"
                variant="h6"
              >
                <Link to="/" color="inherit" className="Link">
                  <img src="/img/logo.png" alt="로고" className="logo" />
                </Link>
              </IconButton>
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
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {cellList.map((c, index) => {
                    return (
                      <TableCell className={classes.TableHead} key={index}>
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
