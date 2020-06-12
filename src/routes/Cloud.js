import React from "react";
import axios from "axios";
import Comment from "../components/Comment";
import { withStyles } from "@material-ui/core/styles";
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

class Cloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "따릉이", list: [], name: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.getList(event.target.value);
    event.preventDefault();
  }

  getList = async (value) => {
    const list = await axios.get("/api/cloud", {
      params: {
        name: value,
      },
    });
    this.setState({ name: value, list: list.data });
  };

  componentDidMount() {
    this.getList("따릉이");
  }

  render() {
    const keyword = [
      "따릉이",
      "자전거",
      "bicycle",
      "전기자전거",
      "서울자전거",
    ];
    const { classes } = this.props;

    return (
      <div className="chartRoot">
      <div className="cloudBox">
        <form>
          <label>
            검색어를 골라주세요.
            <select className="comboBox" value={this.state.value} onChange={this.handleChange}>
              {keyword.map((data, index) => {
                return <option key={index} value={data}>{data}</option>;
              })}
            </select>
          </label>
        </form>

        <span>
          <img src={`/download/img/wordcloud_${this.state.name}.png`} width="1000" height="800" alt="cloud" />
          <div>
            <h2>따릉이 핫플레이스!</h2>
            {this.state.list.map((data, index) => {
              return (
                <p key={index}>
                  {index + 1}. {data}{" "}
                </p>
              );
            })}
          </div>
        </span>
        <div className="cloudBox">
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography className={classes.heading}>워드클라우드 설명</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <p style={{ lineHeight: "1.5rem" }}>
            인스타그램에서 사용자가 설정한 검색어가 태그된 최근 게시물 1000개를 수집한다. 수집된 데이터를 바탕으로 검색어와 함께 해시태그된 단어들에 대해 워드클라우드를 생성한다. 워드클라우드에서 보여지는 단어의 크기는 태그된 횟수에 비례한다. 또한, 태그 횟수를 기반으로 명소를 추천해준다.
            </p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
          <Comment id="1" page="cloud" />
        </div>
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(Cloud);
