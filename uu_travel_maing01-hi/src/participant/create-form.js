//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-forms";

import Config from "./config/config.js";

import "./create-form.less";
import LSI from "./create-form-lsi.js";
//@@viewOff:imports

export const Form = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "CreateForm",
    classNames: {
      main: Config.CSS + "CreateForm"
    },
    lsi: LSI
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>

        <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="name" label={this.getLsiComponent("name")} required />
        <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="surname" label={this.getLsiComponent("surname")} required />
        <UU5.Forms.DatePicker
          label={this.getLsiComponent("birthDate")}
          valueType="iso"
          name="birthDate"
        />
        <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="citizenship" label={this.getLsiComponent("citizenship")} />
        <UU5.Forms.Iconpicker name="icon" label={this.getLsiComponent("icon")} value="mdi-label" openToContent={true} />
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Form;
