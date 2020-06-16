import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from '../Header.js'
import "./About.css";
import { urlencoded } from "body-parser";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  scrollEvent = () => {
    window.onscroll = function () {
      let data = this.document.getElementsByClassName("js-sr--main");
      for (let i = 0; i < data.length; i++) {
        let bottomObject = ReactDOM.findDOMNode(
          data[i]
        ).getBoundingClientRect();
        let bottomWindow = window.innerHeight;
        if (bottomWindow > bottomObject.bottom - bottomObject.height / 2) {
          data[i].style.transform = "translateY(0) scale(1)";
          data[i].style.opacity = "1";
        }
      }
    };
  };

  componentDidMount() {
    this.scrollEvent();
  }

  render() {
    return (
      <div className="chartRoot">
      <div className="content-header">
        <Header isWhite="true"/>
      </div>
      <div className="content">
        <div className="media-container">
          <ul className="media-container__slideshow">
            <li
              className="media-container__list-item"
              style={{ backgroundImage: "url(" + "/img/image1.jpg" + ")" }}
            />
            <li
              className="media-container__list-item"
              style={{ backgroundImage: "url(" + "/img/image2.jpg" + ")" }}
            />
            <li
              className="media-container__list-item"
              style={{ backgroundImage: "url(" + "/img/image3.jpg" + ")" }}
            />
            <li
              className="media-container__list-item"
              style={{ backgroundImage: "url(" + "/img/image4.jpg" + ")" }}
            />
            <li
              className="media-container__list-item"
              style={{ backgroundImage: "url(" + "/img/image5.jpg" + ")" }}
            />
            <li
              className="media-container__list-item"
              style={{ backgroundImage: "url(" + "/img/image6.jpg" + ")" }}
            />
          </ul>
          <video
            class="media-container__video"
            poster="/img/image4.jpg"
            autoPlay
            loop
            muted
            playsInline
            src="/img/aboutus.mp4"
          />
        </div>
        <div className="content-container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="info-hero">
                <h1 className="info-hero__headline js-sr--main">About Us</h1>
                <br />
                <p className="margin-bottom-sm js-sr--main">
                  자전거 안전사고를 예방하기 위해
                  <br />
                  스마트 시티 설계자들에게 사고 유형별 교통사고 현황과
                  서울시 안전표지 관리 정보 등의 데이터를 이용하여
                  <br />
                  사고가 자주 일어나는 곳에 사고를 방지하기 위한 대책을 세울 수 있도록 한다.
                  <br />
                  또, 워드클라우드, 시계열 예측, 군집분석을 통하여 자전거 관련 인프라를 세우는데 인사이트를 제공하도록 한다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <section class="background-gray">
          <div className="content-container">
            <div className="row justify-content-center">
              <div className="col-12">
                <article className="info-article row">
                  <div className="col-md-6 col-sm-5 align-self-center">
                    <div className="info-article__image js-sr--main">
                      <img src="/img/image5.jpg" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-7 align-self-center">
                    <div className="info-article__content">
                      <small className="info__caption js-sr--main">
                        팀장 문혜리
                      </small>
                      <hr className="hr--accent js-sr--main" />
                      <h2 className="info-article__headline js-sr--main">
                        We Dare To Design The Future
                      </h2>
                      <p className="margin-bottom-sm js-sr--main">
                        To make big leaps, we take big risks.
                      </p>
                    </div>
                  </div>
                </article>
                <article className="info-article info-article--alt row">
                  <div className="col-md-6 col-sm-5 align-self-center">
                    <div className="info-article__image js-sr--main">
                      <img src="/img/image2.jpg" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-7 align-self-center">
                    <div className="info-article__content">
                      <small className="info__caption js-sr--main">
                        팀원 김민환
                      </small>
                      <hr className="hr--accent js-sr--main" />
                      <h2 className="info-article__headline js-sr--main">
                        We Dare To Design The Future
                      </h2>
                      <p className="margin-bottom-sm js-sr--main">
                        To make big leaps, we take big risks.
                      </p>
                    </div>
                  </div>
                </article>
                <article className="info-article row">
                  <div className="col-md-6 col-sm-5 align-self-center">
                    <div className="info-article__image js-sr--main">
                      <img src="/img/image3.jpg" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-7 align-self-center">
                    <div className="info-article__content">
                      <small className="info__caption js-sr--main">
                        팀원 김정훈
                      </small>
                      <hr className="hr--accent js-sr--main" />
                      <h2 className="info-article__headline js-sr--main">
                        We Dare To Design The Future
                      </h2>
                      <p className="margin-bottom-sm js-sr--main">
                        To make big leaps, we take big risks.
                      </p>
                    </div>
                  </div>
                </article>
                <article className="info-article info-article--alt row">
                  <div className="col-md-6 col-sm-5 align-self-center">
                    <div className="info-article__image js-sr--main">
                      <img src="/img/image4.jpg" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-7 align-self-center">
                    <div className="info-article__content">
                      <small className="info__caption js-sr--main">
                        팀원 정호령
                      </small>
                      <hr className="hr--accent js-sr--main" />
                      <h2 className="info-article__headline js-sr--main">
                        We Dare To Design The Future
                      </h2>
                      <p className="margin-bottom-sm js-sr--main">
                        To make big leaps, we take big risks.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    );
  }
}

export default About;
