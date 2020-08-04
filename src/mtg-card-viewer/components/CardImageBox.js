import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const CardImageBox = (props) => {
  const {
    display,
    mobileMode,
    imageUri,
    imageWidth,
    cardName,
    imageStyling,
    mouseClickHandler,
  } = props;

  let defaultStyling = { width: imageWidth };

  return display ? (
    <img
      className={classnames("mtgCardViewerBox", { mobile: mobileMode })}
      src={imageUri}
      alt={cardName}
      style={imageStyling ? imageStyling : defaultStyling}
      onClick={mouseClickHandler}
    ></img>
  ) : null;
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
