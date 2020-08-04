import React from "react";
import PropTypes from "prop-types";

const CardName = (props) => {
  const { cardName, cardText, mobileMode, onClickHandler, uri } = props;

  return mobileMode ? (
    <a href={uri} onClick={onClickHandler}>
      {cardText ? cardText : cardName}
    </a>
  ) : (
    <a href={uri} data-tip data-for={cardName}>
      {cardText ? cardText : cardName}
    </a>
  );
};

CardName.propTypes = {
  uri: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardText: PropTypes.string,
  mobileMode: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func,
};

export default CardName;
