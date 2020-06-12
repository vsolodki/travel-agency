//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";

import { TravelConsumer } from "../../core/travel-provider.js";
import "./participant.less";
import LSI from "./participant-lsi.js";
//@@viewOff:imports

export const Participant = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Participant",
    classNames: {
      main: Config.CSS + "participant"
    },
    lsi: LSI
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    addFilter: UU5.PropTypes.func.isRequired,
    getValues: UU5.PropTypes.func.isRequired,
    filters: UU5.PropTypes.array.isRequired,
    values: UU5.PropTypes.string
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
  _handleSubmit(participantList) {
    let values = this.props.getValues();
    let usedFilter = this.props.filters.find(filter => filter.key === values.type);
    this.props.addFilter(
      values.type,
      this.getLsiComponent("participant", null, participantList.find(participant => participant.id === values[values.type]).name),
      values[values.type],
      usedFilter.filterFn
    );
  },

  _getOptions(participantList) {
    return participantList.map(participant => (
      <UU5.Forms.Select.Option value={participant.id} key={participant.id} style="whiteSpace: nowrap">
        {participant.name}
      </UU5.Forms.Select.Option>
    ));
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <TravelConsumer>
        {({ participantList }) => (
          <UU5.Bricks.Div {...this.getMainPropsToPass()}>
            <UU5.Forms.Select value={this.props.values} name="participant" inputWidth="auto" controlled={false}>
              {this._getOptions(participantList)}
            </UU5.Forms.Select>
            <UU5.Bricks.Button
              onClick={() => this._handleSubmit(participantList)}
              colorSchema="primary"
              content={this.getLsiValue("apply")}
            />
          </UU5.Bricks.Div>
        )}
      </TravelConsumer>
    );
  }
  //@@viewOff:render
});

export default Participant;
