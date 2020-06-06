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
    const getMyList = () =>{
      const myList = [];
      for(let i = 3; i < list1.length; i++){
        if((i+1)%4 == 0){
          let temp = {"name":list1[i], "id":list1[i+1], "address":list1[i+2], "mean":list1[i+3],}
          myList.push(temp);
        }
      }
      return myList;
    }
    const myList = list1.slice(3);
    return (
      <div>
        <input type ="text" placeholder="대여소 번호 입력 후 엔터" value={rentalNo} onChange={this.handleChange } onKeyPress = {this.handleKeyPress} />
        <img src={`${imgSrc}?${imageHash}`} />
        <Link to="/datafield">Datafield</Link>
        <div>
          <h1>{list1[0]}</h1>
          <h1>{list1[1]}</h1>
          <h1>{list1[2]}</h1>
          <div>{getMyList().map((d)=>{
            const temp = d.name + "\t\t" + d.id + "\t\t" +  d.address + "\t\t" + d.mean
            return (<p>{temp}</p>)
          })}</div>
        </div>
        <Comment id="1" page="trend" />
      </div>
    );
  }
}

export default Trend;
