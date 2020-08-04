import React from "react";
import PropTypes from "prop-types";

const CardName = (props) => {
  const { cardName, mobileMode, onClickHandler, uri } = props;

  return mobileMode ? (
    <a href={uri} onClick={onClickHandler}>
      {cardName}
    </a>
  ) : (
    <a href={uri} data-tip data-for={cardName}>
      {cardName}
    </a>
  );
};

CardName.propTypes = {
  uri: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  mobileMode: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func,
};

export default CardName;
