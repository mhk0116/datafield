import React from "react";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import Disqus from "../components/Disqus";
import "./Chart.css";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  menuButton: {
    color: "black",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: "",
      description: "",
      type: "",
    };
  }

  storeData() {
    window.localStorage.setItem("title", this.props.location.state.title);
    window.localStorage.setItem(
      "description",
      this.props.location.state.description
    );
    window.localStorage.setItem("type", this.props.location.state.type);
  }

  setData() {
    this.setState({
      title: window.localStorage.getItem("title"),
      description: window.localStorage.getItem("description"),
      type: window.localStorage.getItem("type"),
    });
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.setData();
    } else {
      this.storeData();
      this.setData();
    }
  }

  render() {
    const { id, title, description, type } = this.state;
    const { classes } = this.props;
    return (
      <div className="chartRoot">
        <AppBar position="static" style={{ background: "white" }} elevation={1}>
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
          </Toolbar>
        </AppBar>
        <div className="chartHeader">
          <h2 className="chartTitle">{title}</h2>
          <p className="chartType">{type}</p>
        </div>
        <iframe
          className="chart"
          src={`http://49.50.167.198:5601/app/kibana#/visualize/edit/${id}?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Cto%3Anow))`}
          height="600"
          width="800"
          frameBorder="none"
        ></iframe>
        <div className="chartDescription">
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>데이터 설명</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p style={{ lineHeight: "1.5rem" }}>{description}</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {/* <Disqus /> */}
          <Disqus />
          <div className="goBack">
            <Link to="/datafield">Click to go back</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Chart);
