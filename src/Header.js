import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Hamburger from "./Hamburger";
import "./Header.scss";
import logo from "./images/logo.PNG";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },

}));



const Header = ({ history, isWhite }) => {
    // State of our Menu
    const [state, setState] = useState({
      initial: false,
      clicked: null,
      menuName: "Menu",
      isWhite: false
    });
    // State of our button
    const [disabled, setDisabled] = useState(false);

    //Use Effect
    useEffect(() => {
      //Listening for page changes.
      history.listen(() => {
        setState({ clicked: false, menuName: "Menu" });
      });
    }, [history]);

    // Toggle menu
    const handleMenu = () => {
      disableMenu();
      if (state.initial === false) {
        setState({
          initial: null,
          clicked: true,
          menuName: "Close"
        });
      } else if (state.clicked === true) {
        setState({
          clicked: !state.clicked,
          menuName: "Menu"
        });
      } else if (state.clicked === false) {
        setState({
          clicked: !state.clicked,
          menuName: "Close"
        });
      }
    };

    //Determine if menu button should be disabled
    const disableMenu = () => {
      setDisabled(!disabled);
      setTimeout(() => {
        setDisabled(false);
      }, 1200);
    };
    const classes = useStyles();
 return <header>
      <div className="container">
          <div className="wrapper">
              <div className="inner-header">
                  <div className="logo">
                        <Link to='/'><img className="logopic" src={logo} alt="자전거데이터연구소"></img></Link>
                  </div>
                  <div className="menu">
                  <Button  disabled={disabled} onClick={handleMenu} variant="contained" size="large" color={isWhite?"primary":"inherit"}
                  className={classes.margin}>
                    {state.menuName}
                    </Button>

                  </div>
              </div>
          </div>
      </div>
      <Hamburger state={state}/>
  </header>;
};

export default withRouter(Header);
