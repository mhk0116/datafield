import React from "react";

export default function Disqus() {
  let com = () => {
    var d = document,
      s = d.createElement("script");
    s.src = "https://mhk0116.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  };
  return <div id="disqus_thread">{com()}</div>;
}
