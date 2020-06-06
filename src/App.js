import React from "react";
import { Route, Switch } from "react-router-dom";
import Chart from "./routes/Chart";
import Cluster from "./routes/Cluster";
import Datafield from "./routes/Datafield";
import Trend from "./routes/Trend";
import Home from "./routes/Home";

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
