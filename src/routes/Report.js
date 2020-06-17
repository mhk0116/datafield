import React from "react";
import Header from '../Header.js'
import Comment from "../components/Comment";
import "./Report.css";
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

class Report extends React.Component {
render(){

  const { classes } = this.props;
  const {id}='66fe99d0-abc5-11ea-88c6-7b05551adf3a';

    return (
      <div className="reportRoot">
      <Header />
        <div className="reportHeader">
          <h2 className="reportTitle">분석보고서</h2>
          <p className="reportType">군집분석에 쓰인 세부 데이터 분석</p>
        </div>
        <div className="reportBody">

          <iframe title="report" src={'http://49.50.167.198:5601/app/kibana#/dashboard/66fe99d0-abc5-11ea-88c6-7b05551adf3a?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-2y%2Fy%2Cto%3Anow-2y%2Fy))'}
           height="1200" width="1200" frameBorder="none">
          </iframe>
        </div>

        <div className="reportDescription">
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>데이터 설명</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p style={{ lineHeight: "1.5rem" }}>지역별 자전거 이용률, 사고 발생건수, 자전거 전용 도로, 공공자전거 대여소 및 편의시설위치 차트입니다.</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Comment id={id} page="report" />

        </div>
      </div>


    );
  }
}

export default withStyles(styles)(Report);
