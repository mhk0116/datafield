import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import './Hamburger.scss';
import {Link} from "react-router-dom";

import {
    staggerText,
    staggerReveal,
    fadeInUp,
    handleHover,
    handleHoverExit,
    handleFunctionReturn,
    handleFunction,
    staggerRevealClose
  } from "./Animations.js";

  import kibanareport from "./images/kibanareport.JPG";
  import prediction from "./images/prediction.png";
  import wordcloud from "./images/wordcloud.png";
  import grouping from "./images/grouping.JPG";

  const functionarray = [
    { name: "분석 보고서", image: kibanareport, path: "report"},
    { name: "시계열 예측", image: prediction, path: "trend/1" },
    { name: "워드클라우드", image: wordcloud, path: "cloud/1"},
    { name: "군집 분석", image: grouping, path: "cluster/1"}
  ];
const Hamburger = ({state}) => {
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let functionBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);


  useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

      staggerRevealClose(reveal2, reveal1);
      // Set menu to display none
      gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      // Set menu to display block
      gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      //Allow menu to have height of 100%
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state]);

  return(
    <div ref={el => (menuLayer = el)} className='hamburger-menu'>
      <div ref={el => (reveal1 = el)} className="menu-secondary-background-color" />
      <div ref={el => (reveal2 = el)}className="menu-layer">
        <div ref={el => (functionBackground = el)} className="menu-func-background" />
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line1 = el)}
                      to='/'>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line2 = el)}
                      to='/datafield'>
                      Data
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line3 = el)}
                      to='/aboutus'>
                      About us
                    </Link>
                  </li>
                </ul>
              </nav>
              <div ref={el => (info = el)} className='info'>
                <h3>Our Promise</h3>
                <p>공공데이터 기관에서 불러온 데이터로 얄라얄라얄라리얄라셩</p>
              </div>
              <div className="functions">
                  Insights:
                  {functionarray.map(el=>(
                      <span key = {el.name}
                      onMouseEnter={()=>handleFunction(el.image, functionBackground)}
                      onMouseOut={()=>handleFunctionReturn(functionBackground)}><Link to={`/${el.path}`} style={{ textDecoration: 'none', color: 'white' }}>{el.name}</Link></span>
                      // onClick={()=>handleFunctionReturn(functionBackground)}
                  ))
                  }
              </div>
            </div>
         </div>
      </div>
    </div>
  </div>
);
}
export default Hamburger;
