import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { isMobile } from "react-device-detect";

import renderers from "./renderers";

import "./Main.css";
import mainMd from "./Main.md";

const Main = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(mainMd)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  });

  return (
    <div className="cube">
      <ReactMarkdown source={markdown} renderers={renderers} />
      {isMobile && (
        <a className="top fixed" href="#index">
          top
        </a>
      )}
    </div>
  );
};

export default Main;
