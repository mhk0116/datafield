
/*import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import "./Home.css";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white",
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
});

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      list1:[],
      imgSrc:"/download/img/cloud.png",
      imageHash: ""
    }
  }

  componentDidMount(){
    this.getList();
  }
  getList = async () => {
      const list1 = await axios.get("/api/cloud")
      this.setState({list1:list1.data});
      this.setState({imageHash: Date.now()});
  }

  render() {
    const { classes } = this.props;
    const {list1, imgSrc, imageHash} = this.state;
    return (
      <div className="root">
        <Paper className="title" elevation={0}>
          <img src="/img/logo.png" alt="로고" />
          <p>
            자전거 데이터 연구소는 서울시 자전거 데이터를 시각화하고, 분석
            레포트를 제공하는 서비스입니다.
          </p>
        </Paper>
        <Paper className="cloudContainer" elevation={0}>
          <h2>오늘의 핫이슈!</h2>
          <div className="goodPlace">
            <div>
              <img src={`${imgSrc}?${imageHash}`} alt="워드 클라우드" className="cloud" />
            </div>
            <div className="hotplace">
              {list1.map((d,index)=>{
                if(index===0){
                  return <div key={index} ><h3>{d}</h3></div>
                }else{
                  return <div key= {index} ><p>{index}{d}</p></div>
                }
              })}
            </div>
          </div>
        </Paper>
        <Paper className="navBlock" elevation={0}>
          Get Insights from Data!
          <Box className="line" />
        </Paper>
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile
              key="Subheader"
              cols={2}
              style={{ height: "auto" }}
            ></GridListTile>
            <GridListTile>
              <Link to="/datafield" className="Link">
                <div className="imageContainer">
                  <img src="/img/Picture1.png" alt="전체 데이터 조회" />
                </div>
                <GridListTileBar
                  className="category"
                  title="전체 데이터 조회"
                />
              </Link>
            </GridListTile>
            <GridListTile>
              <Link to="/trend/1" className="Link">
                <div className="imageContainer">
                  <img src="/img/Picture2.png" alt="트렌드 분석" />
                </div>
                <GridListTileBar className="category" title="트렌드 분석" />
              </Link>
            </GridListTile>
            <GridListTile>
              <Link to="/cluster/1" className="Link">
                <div className="imageContainer">
                  <img src="/img/Picture3.png" alt="군집 분석" />
                </div>
                <GridListTileBar className="category" title="군집 분석" />
              </Link>
            </GridListTile>
            <GridListTile>
              <Link to="/datafield" className="Link">
                <div className="imageContainer">
                  <img src="/img/Picture4.png" alt="분석 보고서" />
                </div>
                <GridListTileBar className="category" title="분석 보고서" />
              </Link>
            </GridListTile>
          </GridList>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
*/
