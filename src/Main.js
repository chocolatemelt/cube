import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MtgCardViewer } from "./mtg-card-viewer/MtgCardViewer";

import "./Main.css";
import mainMd from "./Main.md";

const renderers = {
  image: ({ alt, title, src }) => {
    if (!src) {
      return <MtgCardViewer searchTerm={alt} />;
    }
    return null;
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
    <div className="sss">
      <ReactMarkdown source={markdown} renderers={renderers} />
    </div>
  );
};

export default Main;
