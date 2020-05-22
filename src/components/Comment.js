import React from "react";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.stat = {};
  }
  livre = () => {
    {
      window.livereOptions = {
        refer: `49.50.167.198/#/visualization/${this.props.id}`,
      };
    }
    (function (d, s) {
      var j,
        e = d.getElementsByTagName(s)[0];

      if (typeof LivereTower === "function") {
        return;
      }

      j = d.createElement(s);
      j.src = "https://cdn-city.livere.com/js/embed.dist.js";
      j.async = true;

      e.parentNode.insertBefore(j, e);
    })(document, "script");
  };
  componentDidMount() {
    this.livre();
  }
  render() {
    return (
      <div
        id="lv-container"
        data-id="city"
        data-uid="MTAyMC81MDA1My8yNjU0NA=="
      ></div>
    );
  }
}
