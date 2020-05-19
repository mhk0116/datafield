import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";
import Chart from "./routes/Chart";
import Report from "./routes/Report";
import Datafield from "./routes/Datafield";
import Home from "./routes/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { pageLink, path, dataType } = this.state;
    // this.setState({ path: `/${dataType}/${pageLink}` });
    return (
      <div>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/datafield" component={Datafield} />
          <Route path="/report/:_id" component={Report}></Route>
          <Route path="/chart/:_id" component={Chart}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
