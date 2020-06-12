import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Comment from "../components/Comment";
import "./Chart.css";
import { withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

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
      hits: [],
    };
  }

  storeData() {
    window.localStorage.setItem("title", this.props.location.state.title);
    window.localStorage.setItem(
      "description",
      this.props.location.state.description
    );
    window.localStorage.setItem("type", this.props.location.state.type);
    window.localStorage.setItem("raw", this.props.location.state.raw);
  }

  setData() {
    this.setState({
      title: window.localStorage.getItem("title"),
      description: window.localStorage.getItem("description"),
      type: window.localStorage.getItem("type"),
    });
  }

  getIndexName = async () => {
    const {
      data: {
        hits: { hits },
      },
    } = await axios.get("/api/index", {
      params: {
        raw: window.localStorage.getItem("raw").split(","),
      },
    });
    this.setState({ hits });
  };

  handleClick(indexName, type) {
    this.getLog(String(indexName), String(type));
  }
  getLog = async (e, t) => {
    await axios.get("/api/log", {
      params: { indexName: e, type: t },
    });
  };

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.setData();
    } else {
      this.storeData();
      this.setData();
    }
    this.getIndexName();
  }

  render() {
    const { id, title, description, type, hits } = this.state;
    const { classes } = this.props;
    const indexName = hits.map((d) => {
      return d._source["index-pattern"].title;
    });
    const regExp = (str) => {
      var reg = /[?.,;:|*~`!^\-+<>@$%&]/gi;
      if (reg.test(str)) {
        return str.replace(reg, "");
      } else {
        return str;
      }
    };
    return (
      <div className="chartRoot">
        <div className="chartHeader">
          <h2 className="chartTitle">{title}</h2>
          <p className="chartType">{type}</p>
        </div>
        {type === "dashboard" || type === "map" ? (
          <iframe
            className="chart"
            title={title}
            src={`http://49.50.167.198:5601/app/kibana#/dashboard/${id}?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Cto%3Anow))`}
            height="600"
            width="800"
            frameBorder="none"
          ></iframe>
        ) : (
          <iframe
            className="chart"
            title={title}
            src={`http://49.50.167.198:5601/app/kibana#/visualize/edit/${id}?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Cto%3Anow))`}
            height="600"
            width="800"
            frameBorder="none"
          ></iframe>
        )}

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
          <div className="downloadline">
            <a
              href={`http://localhost:5000/download/${regExp(
                String(indexName)
              )}.csv`}
              download
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => this.handleClick(indexName, type)}
              >
                Download
              </Button>
            </a>
          </div>
          <Comment id={id} page="visualization" />
          <div className="goBack">
            <Link to="/datafield">Click to go back</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Chart);
