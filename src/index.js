import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//amazon S3 setup
/*import AWS from 'aws-sdk'
import{s3Config, s3Region} from './config'
  AWS.config.update(s3Config)
AWS.config.region =s3Region;
const s3 = new AWS.S3();
App.s3 = s3;
*/

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
