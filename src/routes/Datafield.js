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
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;
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




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
const PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

    const handleDrawerClose = () => {
      setOpen(false);
    };
}


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
        return d._source.visualization.title.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((d, index) => {
        return (
          <Data
            key={d._id}
            number={index}
            _id={d._id}
            // _score={d._score}
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

                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                      >
                        <MenuIcon />
                      </IconButton>

                  <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                  >
                    <div className={classes.drawerHeader}>
                      <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                      </IconButton>
                    </div>
                    <Divider />
                    <List>
                      {['분석4', '분석3', '분석2', '분석1'].map((text, index) => (
                        <ListItem button key={text}>
                          <ListItemText primary={text} />
                        </ListItem>
                      ))}
                    </List>
                    <Divider />
                    <List>
                      {['데이터3', '데이터2', '데이터1'].map((text, index) => (
                        <ListItem button key={text}>
                          <ListItemText primary={text} />
                        </ListItem>
                      ))}
                    </List>
                  </Drawer>

          <AppBar
            position="static"
            style={{ background: "white" }}
            elevation={1}
            >

            <Toolbar>

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
