import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
  }
});

class Cluster extends React.Component {
  constructor(props){
      super(props);
      this.state={
          imgSrc:"/download/img/cluster.png",
          imageHash: "",
      }
  }

  componentDidMount() {
    this.setState({imageHash: Date.now()});
  }

  render() {
    const {imgSrc, imageHash} = this.state;
    const { classes } = this.props;
    const des = ``

    return (
      <div className="clusterBox">
        <img src={`${imgSrc}?${imageHash}`} />
        <p>그룹0 : 자전거 이용률도 적고, 인프라도 적은 구 -> 이상적</p>
        <p>그룹1 : 자전거 이용률에 비해 인프라가 많은 구 -> 인프라 충분</p>
        <p>그룹2 : 자전거 이용률도 높고, 인프라도 많은 구 -> 이상적</p>
        <p>그룹3 : 자전거 이용률에 비해 인프라가 적은 구 -> 더 많은 인프라 필요</p>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography className={classes.heading}>군집분석 설명</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <p style={{ lineHeight: "1.5rem" }}>
            구별 따릉이를 이동 수단으로 이용하는 비율, 따릉이를 운동 수단으로 이용하는 비율, 자전거 전용도로 길이, 사고 발생건수, 따릉이 대여소수, 따릉이 자전거수, 자전거 편의시설수를 PCA 기법을 통해 차원축소하고, K-means 군집화를 진행한 결과이다.
x축에 해당하는 PC1 변수는 자전거 인프라(전용도로길이, 대여소수, 자전거수)를 나타내는 변수이고, y축에 해당하는 PC2 변수는 자전거 이용률(이동수단, 운동수단) 대비 자전거 인프라(전용도로길이, 대여소수, 자전거수)를 나타내는 변수이다.
자전거 인프라가 충분하면 PC1 값이 커지게 되고(x축 기준 오른쪽에 존재), 자전거 인프라가 부족하면 PC1 값이 작아지게 된다(x축 기준 왼쪽에 존재).<br/><br/>
자전거 이용률이 높고 자전거 인프라도 잘 갖추어져 있으면 PC2 값은 0에 가까워지고(y축 기준 가운데 존재), 자전거 이용률이 높지만 그에 비해 자전거 인프라가 잘 갖추어져 있지 않으면 PC2 값이 커지게 되며(y축 기준 위에 존재), 자전거 이용률이 낮지만 그에 비해 자전거 인프라가 잘 갖추어져 있으면 PC2 값이 작아지게 된다(y축 기준 아래에 존재).
            </p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Comment id="1" page="cluster" />
      </div>
    );
  }
}

export default withStyles(styles)(Cluster);
