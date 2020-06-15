import React from "react";
import axios from "axios";
import Header from '../Header.js'
import Comment from "../components/Comment";
import "./routes.css"
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";


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
  progress: {
    margin: theme.spacing(2),
  },
});

class Trend extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list1:[],
            rentalNo:"",
            imgSrc:"/download/img/predict.png",
            imageHash: "",
            isLoading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getList = this.getList.bind(this);
    }

    getList = async (e) => {
      this.setState({isLoading:true});
        const list1 = await axios.get("/api/trend",{
            params:{
                rentalNo: e
            }
        })
        this.setState({list1:list1.data});
        this.setState({imageHash: Date.now()});
        this.setState({isLoading:false});
    }
    handleChange = (e) => {
      let inputMessage = e.target.value;
      // console.log("input message : ",inputMessage);
      this.setState({
        rentalNo : inputMessage,
      })
    }
    handleKeyPress = (e) =>{
      if(e.key === 'Enter'){
        this.getList(e.target.value);
        console.log("enter");
      }
    }

  render() {
    const { classes } = this.props;
    const {list1, rentalNo, imgSrc, imageHash, isLoading} = this.state;
    const getMyList = () =>{
      const myList = [];
      for(let i = 3; i < list1.length; i++){
        if((i+1)%4 === 0){
          let temp = {"name":list1[i], "id":list1[i+1], "address":list1[i+2], "mean":list1[i+3],}
          myList.push(temp);
        }
      }
      return myList;
    }
    return (
      <div className="chartRoot">
      <Header />
        <div className="trendBox">
          <img src={`${imgSrc}?${imageHash}`} alt="trend" />
          <div className="legend">
            <img src="/img/legend.png" alt="legend" />
          </div>
        </div>
        <div className="trendBox">
          <input type ="text" placeholder="대여소 번호 입력 후 엔터" value={rentalNo} onChange={this.handleChange } onKeyPress = {this.handleKeyPress} />
          {isLoading?(
            <div className="trendBox">
              <div className="progress">
                <CircularProgress color="secondary"/>
                <h2>잠시만 기다려 주세요.</h2>
              </div>
            </div>
          ):(
            <div className="trendBox">
                <h1>{list1[0]}</h1>
                <h1>{list1[1]}</h1>
                <h3>{list1[2]}</h3>
                <div>{getMyList().map((d,i)=>{
                  return (<div className="result" key={i}><p>{`${d.name}\t${d.id}\t${d.address}\t${d.mean}`}</p></div>)
                })}
                </div>
            </div>
          )}
        </div>
        <div className="trendBox">
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography className={classes.heading}>시계열 예측 설명</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <p style={{ lineHeight: "1.5rem" }}>
            딥러닝 기반의 LSTM 모델을 사용해서 검색한 대여소의 30일 이후까지 자전거 대여수를 예측한다. 플랏에서 파란선은 과거 시점을 나타내고, 빨간색은 미래 시점을 나타낸다. 또한, 검색한 대여소와 거리가 가장 가까운 5곳의 대여소에 대해 대여소명, 대여소ID, 대여소 주소, 일주일 평균 대여량을 함께 제공하여 검색한 대여소의 자전거가 부족할 것으로 예상된다면 자전거가 남을 것이라 예측되는 근처 대여소에서 가져올 수 있도록 인사이트를 제공한다.
            </p>
          </ExpansionPanelDetails>
        </ExpansionPanel>
          <Comment id="1" page="trend" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Trend);
