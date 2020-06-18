//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";

import Config from "./config/config.js";
import Uri from "../helpers/uri-helpers.js";
import {nl2br} from "../helpers/string-helper";

import {TravelConsumer} from "../core/travel-provider.js";
import "./detail.less";
import LSI from "./detail-lsi.js";
//@@viewOff:imports

export const Detail = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Detail",
    classNames: {
      main: Config.CSS + "detail",

      line: Config.CSS + "detail-line"
    },
    lsi: LSI
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.shape({
      id: UU5.PropTypes.string,
      name: UU5.PropTypes.string,
      text: UU5.PropTypes.string,
      dateFrom: UU5.PropTypes.date,
      dateTo: UU5.PropTypes.date,
      capacity: UU5.PropTypes.number,
      visibility: UU5.PropTypes.boolean,
      uuIdentityName: UU5.PropTypes.string,
      participantList: UU5.PropTypes.array,
      locationList: UU5.PropTypes.string,
      image: UU5.PropTypes.string
    })
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _getLine(icon, content) {
    return (
      <UU5.Bricks.Div className={this.getClassName("line")}>
        <UU5.Bricks.Icon icon={icon} />
        {content}
      </UU5.Bricks.Div>
    );
  },

  _buildParticipantNames(participantList) {
    let participantIds = new Set(this.props.data.participantList);
    return participantList
      .reduce((acc, participant) => {
        if (participantIds.has(participant.id)) {
          acc.push(participant.name);
        }
        return acc;
      }, [])
      .join(", ");
  },
  _buildParticipantSurNames(participantList) {
    // for faster lookup
    let participantIds = new Set(this.props.data.participantList);
    return participantList
      .reduce((acc, participant) => {
        if (participantIds.has(participant.id)) {
          acc.push(participant.surname);
        }
        return acc;
      }, [])
      .join(", ");
  },
  _buildLocationNames(locationList) {
    // for faster lookup
    let locationId = new Set(this.props.data.locationList);
    return locationList.name;
  },
  _getImage() {
    let imageUrl = Uri.getBinaryUrl(this.props.data.image);
    return <UU5.Bricks.Image src={imageUrl} authenticate />;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <TravelConsumer>
          {({ participantList }) => this._getLine("mdi-account", this._buildParticipantNames(participantList))}
        </TravelConsumer>
        <TravelConsumer>
        {({ participantList }) => this._getLine("mdi-account", this._buildParticipantSurNames(participantList))}
        </TravelConsumer>

        {this._getLine("mdi-calendar", this.props.data.locationList)}
        {this._getLine("mdi-calendar", this.props.data.dateFrom)}
        {this._getLine("mdi-calendar", this.props.data.dateTo)}
        {this._getLine("mdi-counter", this.props.data.capacity)}
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Detail;
