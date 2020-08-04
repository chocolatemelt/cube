import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactTooltip from "react-tooltip";

const CardImageBox = (props) => {
  const {
    display,
    mobileMode,
    imageUri,
    imageWidth,
    cardName,
    mouseClickHandler,
  } = props;

  let defaultStyling = { width: imageWidth };

  return mobileMode ? (
    <>
      {display && (
        <img
          className={classnames("mtgCardViewerBox", { mobile: mobileMode })}
          src={imageUri}
          alt={cardName}
          style={defaultStyling}
          onClick={mouseClickHandler}
        ></img>
      )}
    </>
  ) : (
    <ReactTooltip
      className="mtg-tooltip"
      id={cardName}
      arrowColor="transparent"
      place="bottom"
    >
      <img
        src={imageUri}
        alt={cardName}
        style={defaultStyling}
        onClick={mouseClickHandler}
      ></img>
    </ReactTooltip>
  );

  // return display ? (
  //   <img
  //     className={classnames("mtgCardViewerBox", { mobile: mobileMode })}
  //     src={imageUri}
  //     alt={cardName}
  //     style={imageStyling ? imageStyling : defaultStyling}
  //     onClick={mouseClickHandler}
  //   ></img>
  // ) : null;
};

CardImageBox.propTypes = {
  cardName: PropTypes.string,
  imageUri: PropTypes.string,
  style: PropTypes.object,
  imageWidth: PropTypes.string,
  mobileMode: PropTypes.bool,
  mouseClickHandler: PropTypes.func,
};

export default CardImageBox;
