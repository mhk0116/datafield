import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";


class Trend extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list1:[],
            rentalNo:"",
            imgSrc:"/download/img/predict.png",
            imageHash: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getList = this.getList.bind(this);
    }

    getList = async (e) => {
        const list1 = await axios.get("/api/trend",{
            params:{
                rentalNo: e
            }
        })
        this.setState({list1:list1.data});
        this.setState({imageHash: Date.now()});
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
    const {list1, rentalNo, imgSrc, imageHash} = this.state;
    return (
      <div>
        <h3>{list1.map((d)=>{
          console.log(d);
        })}</h3>
        <input type ="text" placeholder="대여소 번호 입력 후 엔터" value={rentalNo} onChange={this.handleChange } onKeyPress = {this.handleKeyPress} />
        <img src={`${imgSrc}?${imageHash}`} />
        <Link to="/datafield">Datafield</Link>
        <Comment id="1" page="trend" />
      </div>
    );
  }
}

export default Trend;
