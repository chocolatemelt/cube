import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactTooltip from "react-tooltip";

const CardImageBox = (props) => {
  const {
    display,
    mobileMode,
    isDfc,
    imageUri,
    imageBackUri,
    imageWidth,
    cardName,
    mouseClickHandler,
  } = props;

  let defaultStyling = { width: imageWidth };
  console.log(mobileMode);

  if (mobileMode) {
    if (isDfc) {
      return (
        display && (
          <div
            className={classnames("mtgCardViewerBox", { mobile: mobileMode })}
          >
            <img
              src={imageUri}
              alt={cardName}
              style={defaultStyling}
              onClick={mouseClickHandler}
            ></img>
            <img
              src={imageBackUri}
              alt={cardName}
              style={defaultStyling}
              onClick={mouseClickHandler}
            ></img>
          </div>
        )
      );
    } else {
      return (
        display && (
          <>
            <img
              className={classnames("mtgCardViewerBox", { mobile: mobileMode })}
              src={imageUri}
              alt={cardName}
              style={defaultStyling}
              onClick={mouseClickHandler}
            ></img>
          </>
        )
      );
    }
  } else {
    return (
      <ReactTooltip
        className="mtg-tooltip"
        id={cardName}
        arrowColor="transparent"
        place="bottom"
        wrapper="span"
      >
        <img
          src={imageUri}
          alt={cardName}
          style={defaultStyling}
          onClick={mouseClickHandler}
        ></img>
        {isDfc && (
          <img
            src={imageBackUri}
            alt={cardName}
            style={defaultStyling}
            onClick={mouseClickHandler}
          ></img>
        )}
      </ReactTooltip>
    );
  }
};

CardImageBox.propTypes = {
  cardName: PropTypes.string,
  isDfc: PropTypes.bool,
  imageUri: PropTypes.string,
  imageBackUri: PropTypes.string,
  style: PropTypes.object,
  imageWidth: PropTypes.string,
  mobileMode: PropTypes.bool,
  mouseClickHandler: PropTypes.func,
};

export default CardImageBox;
