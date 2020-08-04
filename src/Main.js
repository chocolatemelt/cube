import React, { createElement, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MtgCardViewer } from "./mtg-card-viewer/MtgCardViewer";
import { isMobile } from "react-device-detect";
import slugify from "slugify";

import "./Main.css";
import mainMd from "./Main.md";

const renderers = {
  heading: ({ level, children }) => {
    const heading = createElement(
      `h${level}`,
      {
        id: slugify(children[0].props.value),
      },
      children
    );
    return level === 1 ? (
      heading
    ) : (
      <div class="heading">
        <svg
          class="anchor-link"
          viewBox="0 0 16 16"
          version="1.1"
          width="24"
          height="24"
        >
          <path
            fill-rule="evenodd"
            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
          ></path>
        </svg>
        {heading}
      </div>
    );
  },
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
