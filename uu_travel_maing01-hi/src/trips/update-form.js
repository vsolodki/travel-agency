//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-forms";

import Config from "./config/config.js";

import {TravelConsumer} from "../core/travel-provider.js";
import "./update-form.less";
import LSI from "./update-form-lsi.js";
//@@viewOff:imports

export const Form = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.PureRenderMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "UpdateForm",
    classNames: {
      main: Config.CSS + "UpdateForm"
    },
    lsi: LSI,
    opt: {
      pureRender: true
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    showPublished: UU5.PropTypes.bool
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
  _getParticipantsOptions(participants) {
    return participants.map(participant => (
      <UU5.Forms.Select.Option value={participant.id} key={participant.id}>
        {participant.name} {participant.surname}
      </UU5.Forms.Select.Option>
    ));
  },
  _getLocationsOptions(locations) {
    return locations.map(location => (
      <UU5.Forms.Select.Option value={location.city} key={location.city}>
        {location.city}
      </UU5.Forms.Select.Option>
    ));
  },
  _validateText(opt) {
    let result = { feedback: Config.FEEDBACK.INITIAL, value: opt.value };
    if (opt.event === undefined) {
      if (!opt.value && !this._file.getValue()) {
        // text is empty, check file
        result.feedback = Config.FEEDBACK.ERROR;
        result.message = this.getLsiComponent("textOrFile");
        opt.component.setFeedback(result.feedback, result.message);
      }
    }
    return result;
  },

  _registerFile(cmp) {
    this._file = cmp;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <TravelConsumer>
        {({ participantList, locationList }) => (
          <UU5.Bricks.Div {...this.getMainPropsToPass()}>
            {/* // Name */}
            <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} label={this.getLsiComponent("name")} name="name" />
            <UU5.Forms.DatePicker
              label={this.getLsiComponent("dateFrom")}
              valueType="iso"
              name="dateFrom"
            />
            <UU5.Forms.DatePicker
              label={this.getLsiComponent("dateTo")}
              valueType="iso"
              name="dateTo"
            />
            <UU5.Forms.Slider
              label={this.getLsiComponent("capacity")}
              min={0}
              max={50}
              step={1}
              name="capacity"
            />
            <UU5.Forms.Select
              label={this.getLsiComponent("location")}
              name="locationList"
              openToContent={true}
            >
              {this._getLocationsOptions(locationList)}
            </UU5.Forms.Select>
            <UU5.Forms.Select
              label={this.getLsiComponent("participant")}
              name="participantList"
              multiple
              openToContent={true}
            >
              {this._getParticipantsOptions(participantList)}
            </UU5.Forms.Select>
          </UU5.Bricks.Div>
        )}
      </TravelConsumer>
    );
  }
  //@@viewOff:render
});

export default Form;
