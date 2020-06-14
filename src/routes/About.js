import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
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
                <p className="margin-bottom-sm js-sr--main">
                  Our mission is what drives us to do everything possible to
                  expand human potential. We do that by creating groundbreaking
                  sport innovations, by making our products more sustainably, by
                  building a creative and diverse global team and by making a
                  positive impact in communities where we live and work.
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
                        We Dare To Design The Future Of Sport
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
                        We Dare To Design The Future Of Sport
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
                        We Dare To Design The Future Of Sport
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
                        We Dare To Design The Future Of Sport
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
        <div className="thanks">
          <h1>Thank You For Comming Our Site</h1>
        </div>
      </div>
    );
  }
}

export default About;
