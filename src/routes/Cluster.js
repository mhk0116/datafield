import React from "react";
import ReactDOM from "react-dom";
import Header from '../Header.js'
import Comment from "../components/Comment";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import"./Cluster.css";

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
          imgSrc:"/download/img/cluster2.png",
          imageHash: "",
          cityTitle:"",
          group:[
            {"name":"양천구","x":605, "y":232, "groupNumber":3},
            {"name":"영등포구","x":812, "y":418, "groupNumber":2},
            {"name":"송파구","x":921, "y":461, "groupNumber":2},
            {"name":"동대문구","x":451, "y":408, "groupNumber":1},
            {"name":"광진구","x":491, "y":450, "groupNumber":1},
            {"name":"노원구","x":470, "y":485, "groupNumber":1},
            {"name":"성동구","x":461, "y":497, "groupNumber":1},
            {"name":"은평구","x":446, "y":514, "groupNumber":1},
            {"name":"서대문구","x":376, "y":500, "groupNumber":1},
            {"name":"종로구","x":436, "y":566, "groupNumber":1},
            {"name":"강서구","x":484, "y":589, "groupNumber":1},
            {"name":"서초구","x":539, "y":575, "groupNumber":1},
            {"name":"마포구","x":592, "y":554, "groupNumber":1},
            {"name":"강남구","x":590, "y":663, "groupNumber":1},
            {"name":"도봉구","x":223, "y":434, "groupNumber":0},
            {"name":"강북구","x":226, "y":447, "groupNumber":0},
            {"name":"금천구","x":255, "y":470, "groupNumber":0},
            {"name":"동작구","x":277, "y":456, "groupNumber":0},
            {"name":"중구","x":270, "y":490, "groupNumber":0},
            {"name":"용산구","x":301, "y":474, "groupNumber":0},
            {"name":"중랑구","x":341, "y":436, "groupNumber":0},
            {"name":"성북구","x":369, "y":430, "groupNumber":0},
            {"name":"관악구","x":385, "y":435, "groupNumber":0},
            {"name":"구로구","x":333, "y":542, "groupNumber":0},
            {"name":"강동구","x":394, "y":534, "groupNumber":0},
        ]
      }
      this.mouseMoveEvent = this.mouseMoveEvent.bind(this);
  }

  mouseMoveEvent = () => {
    window.onmousemove = (e) => {
      if(document.getElementsByClassName("groupexp__list-item")[0] !== undefined){

      let listData = document.getElementsByClassName("groupexp__list-item");
      listData[0].style.opacity ="0";
      listData[1].style.opacity ="0";
      listData[2].style.opacity ="0";
      listData[3].style.opacity = "0";

      let titleData = document.getElementsByClassName("groupexp__title");
      titleData[0].style.opacity ="0";

      let imageData = document.getElementsByClassName("groupexp__image");
      let marginData = ReactDOM.findDOMNode(imageData[0]).getBoundingClientRect().x;
      if(marginData<0){
        marginData = 0;
      }
      // console.log(marginData);

      let group = this.state.group;
      for(let i=0; i<group.length; i++){
        // console.log(group[i].x);
        if(
          ((e.pageX>group[i].x-15+marginData) && (e.pageX<group[i].x+15+marginData)) &&
          ((e.pageY>group[i].y-15) && (e.pageY<group[i].y+15))
        ){
          listData[group[i].groupNumber].style.opacity = "1";
          this.setState({cityTitle:group[i].name});
          titleData[0].style.opacity = "1";
        }; // end if
      }; // end for
      // console.log(e.pageX, e.pageY);
    };
  };
  };


  componentDidMount() {
    this.setState({imageHash: Date.now()});
    this.mouseMoveEvent();
  }

  render() {
    const {imgSrc, imageHash, cityTitle} = this.state;
    const { classes } = this.props;

    return (
      <div className="chartRoot">
      <Header />
      <div className="clusterBox">
        <div className="groupexp">
        <img className="groupexp__image"src={`${imgSrc}?${imageHash}`} alt="cluster" />
        <div className="groupexp__text">
        <h2 className="explanation"> 정보를 보려면 각 구에</h2>
        <h2 className="explanation"> 마우스를 대보세요</h2>
        <div className="space"></div>
          <h2 className="groupexp__title">{cityTitle}</h2>
          <ul>
            <li className="groupexp__list-item">
              그룹0 : 자전거 이용률도 적고, 인프라도 적은 구 -> 이상적
            </li>
            <li className="groupexp__list-item">
              그룹1 : 자전거 이용률에 비해 인프라가 많은 구 -> 인프라 충분
            </li>
            <li className="groupexp__list-item">
              그룹2 : 자전거 이용률도 높고, 인프라도 많은 구 -> 이상적
            </li>
            <li className="groupexp__list-item">
              그룹3 : 자전거 이용률에 비해 인프라가 적은 구 -> 더 많은 인프라 필요
            </li>
          </ul>
        </div>
        </div>
        <div className="chartDescription">
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
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(Cluster);
