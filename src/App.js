/*
import React from "react";
import { Route, Switch } from "react-router-dom";


export default function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/datafield" component={Datafield} />
        <Route path="/cluster/:id" component={Cluster} />
        <Route path="/trend/:id" component={Trend} />
        <Route path="/visualization/:id" component={Chart} />
      </Switch>
    </div>
  );
}
*/
import React,{useRef,useEffect} from 'react';
import {TimelineLite ,TweenMax, Power3} from 'gsap'
import './App.scss';
import Header from './Header.js'
import Chart from "./routes/Chart";
import Cluster from "./routes/Cluster";
import About from "./routes/About"
import Datafield from "./routes/Datafield";
import Trend from "./routes/Trend";
import Cloud from "./routes/Cloud"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


//Assets

import wordcloud from './images/wordcloud.png'
//import girlbike from './images/girlbike.jpg'

function App(props) {

  return(

      <Router>
        <div className="App">

          <div className="container">
            <div className="wrapper">
              <div className="home">
                <Switch>
                <Route exact path='/' component={Home} />
                    <Route exact path="/cluster/:id" component={Cluster}  />
                    <Route exact path="/datafield" component={Datafield} />
                    <Route exact path='/aboutus' component={About} />
                    <Route path="/trend/:id" component={Trend} />
                    <Route exact path="/cloud/:id" component={Cloud} />
                    <Route path="/visualization/:id" component={Chart} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
    }


    function Home(){
      let app = useRef(null)
      let images = useRef(null)
      let content = useRef(null)
      let tl = new TimelineLite({ delay: .8});


      useEffect(() => {

        // Images Vars
        //const  girlbikeImage = images.firstElementChild; // or children[0]
        const wordcloudImage = images.lastElementChild;

        //content vars
        const headlineFirst = content.children[0].children[0];
        const headlineSecond = headlineFirst.nextSibling;
        const headlineThird = headlineSecond.nextSibling;
        const contentP = content.children[1];
        const contentp2 = contentP.nextSibling;

        //Remove initial flash
        TweenMax.to(app, 0, {css: {visibility: 'visible'}})

        //Images Animation
        tl.from(wordcloudImage, 1.2, {y: 1280, ease: Power3.easeOut},'Start')
        .from(wordcloudImage.firstElementChild, 2, {scale: 1.6, ease: Power3.easeOut}, .2)
      //  .from(girlbikeImage, 1.4, {y: 1280, ease: Power3.easeOut}, .2)
      //  .from(girlbikeImage.firstElementChild, 2, {scale: 1.6, ease: Power3.easeOut}, .2)

        //Content Animation
tl.staggerFrom([headlineFirst.children, headlineSecond.children, headlineThird.children ], 1, {
  y: 64,
  ease:Power3.easeOut,
  delay: .8
}, .15, 'Start')
.from(contentP, 1, {y: 40, opacity: 0, ease: Power3.easeOut}, 1.4)
.from(contentp2, 1, {y: 40, opacity: 0, ease: Power3.easeOut}, 1.4)


}, [tl])




      return <div>
      <Header isWhite="true" />
      <div className="page" ref={el => app = el}>
        <div className="container">
          <div className="page-inner">
            <div className="page-content">
              <div className="page-content-inner"ref={el => content = el}>
              <h1>
            <div className="page-content-line">
            <div className="page-content-line-inner">스마트시티를 위한</div>
            </div>
            <div className="page-content-line">
            <div className="page-content-line-inner">자전거 데이터 연구소</div>
            </div>
            <div className="page-content-line">
            <div className="page-content-line-inner"></div>
            </div>
          </h1>
          <p className="p">스마트시티 설계자들을 위해 서울시 자전거 데이터를 시각화하고,군집분석</p>
          <p className="p2">워드클라우드, 데이터가공을 통한 인사이트 서비스를 제공합니다. </p>



                    </div>
                  </div>
                    <div className="page-images">
                        <div  ref={el => images = el} className="page-images-inner">
                          <div className="page-image wordcloud">
                            <img src={wordcloud} alt="wordcloud"/>
                          </div>

                      </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          }

export default App;
