import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MtgCardViewer } from "./mtg-card-viewer/MtgCardViewer";
import { isMobile } from "react-device-detect";

import "./Main.css";
import mainMd from "./Main.md";

const renderers = {
  image: ({ alt, title, src }) => {
    if (!src) {
      return <MtgCardViewer searchTerm={alt} mobileMode={isMobile} />;
    }
    return <img alt={alt} title={title} src={src} />;
  },
};

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
    </div>
  );
};

export default Main;
