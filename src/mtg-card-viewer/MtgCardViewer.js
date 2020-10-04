import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import classnames from "classnames";

import "./MtgCardViewer.css";

import CardImageBox from "./components/CardImageBox";
import CardName from "./components/CardName";

export class MtgCardViewer extends React.Component {
  constructor(props) {
    super(props);

    const st = props.searchTerm.split("|");

    this.state = {
      searchTerm: st[0],
      searchSet: st[1],
      cardName: "",
      imageUri: "#",
      imageBackUri: "#",
      uri: "#",
      isHovered: false,
      cardFound: false,
      imageWidth: props.imageWidth ? props.imageWidth : "280px",
      isDfc: false,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    this.mouseClickHandler = this.mouseClickHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    const { searchTerm, searchSet } = this.state;
    document.addEventListener("mousedown", this.onClickOutsideHandler);

    axios
      .get(this.buildUrl(searchTerm, searchSet))
      .then((res) => {
        const data = res.data;
        const amount = data.total_cards;

        if (amount) {
          const object = data.data[0];
          const isDfc = !!object.card_faces;
          let imageUri = "#";
          let imageBackUri = "#";

          if (isDfc) {
            imageUri = object.card_faces[0].image_uris.normal;
            imageBackUri = object.card_faces[1].image_uris.normal;
          } else {
            imageUri = object.image_uris.normal;
          }

          this.setState({
            cardName: object.name,
            isDfc,
            imageUri,
            imageBackUri,
            uri: object.scryfall_uri,
            cardFound: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          cardName: "[card not found]",
        });
      });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickOutsideHandler);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  onClickOutsideHandler(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isHovered: false,
      });
    }
  }

  onClickHandler(e) {
    e.preventDefault();

    this.setState({
      isHovered: true,
    });
  }

  mouseOverHandler() {
    this.setState({
      isHovered: true,
    });
  }

  mouseLeaveHandler() {
    this.setState({
      isHovered: false,
    });
  }

  mouseClickHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      isHovered: false,
    });
  }

  buildUrl(cardName, cardSet) {
    const set = cardSet ? `set:${cardSet}` : "";
    return `${this.scryfallSearch}!"${cardName}"${set}`;
  }

  get scryfallSearch() {
    return "https://api.scryfall.com/cards/search?q=";
  }

  render() {
    const { mobileMode, text } = this.props;
    const {
      cardName,
      isDfc,
      imageUri,
      imageBackUri,
      uri,
      isHovered,
      cardFound,
      imageWidth,
    } = this.state;

    return (
      <>
        <ins
          className={classnames("mtgCardViewer", {
            mobile: mobileMode,
          })}
          ref={this.setWrapperRef}
        >
          <CardName
            mobileMode={mobileMode}
            uri={uri}
            cardName={cardName}
            cardText={text}
            onClickHandler={this.onClickHandler}
          />
          {cardFound && (
            <CardImageBox
              imageUri={imageUri}
              imageBackUri={imageBackUri}
              isDfc={isDfc}
              cardName={cardName}
              imageWidth={imageWidth}
              display={isHovered}
              mobileMode={mobileMode}
              mouseClickHandler={this.mouseClickHandler}
            />
          )}
        </ins>
      </>
    );
  }
}

MtgCardViewer.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  text: PropTypes.string,
  mobileMode: PropTypes.bool,
  imageWidth: PropTypes.string,
};
