import React, { createElement, useState } from "react";
import slugify from "slugify";
import { isMobile } from "react-device-detect";

import { MtgCardViewer } from "./mtg-card-viewer/MtgCardViewer";

const AnchorHeading = (props) => {
  const { children, slug } = props;
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      className="heading"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      {isHovered && (
        <a className="anchor" aria-hidden="true" href={`#${slug}`}>
          <svg
            className="anchor-link"
            viewBox="0 0 16 16"
            version="1.1"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
            ></path>
          </svg>
        </a>
      )}
      {children}
    </div>
  );
};

const renderers = {
  heading: ({ level, children }) => {
    const slug = slugify(children[0].props.value);
    const heading = createElement(
      `h${level}`,
      {
        id: slug,
      },
      children
    );
    return level === 1 ? (
      <div className="title">{heading}</div>
    ) : (
      <AnchorHeading slug={slug}>{heading}</AnchorHeading>
    );
  },
  image: ({ alt, title, src }) => {
    if (src === ".") {
      return (
        <MtgCardViewer searchTerm={alt} text={title} mobileMode={isMobile} />
      );
    }
    return <img alt={alt} title={title} src={src} />;
  },
};

export default renderers;
