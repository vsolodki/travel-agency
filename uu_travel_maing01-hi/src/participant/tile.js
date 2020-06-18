//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";

import Config from "./config/config.js";

import { nl2br } from "../helpers/string-helper";
import "./tile.less";
//@@viewOff:imports

export const Tile = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.Common.PureRenderMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Tile",
    classNames: {
      main: Config.CSS + "tile",
      text: Config.CSS + "tile-text",
      header: Config.CSS + "tile-header",
      footer: Config.CSS + "tile-footer",
      content: Config.CSS + "tile-content"
    },
    defaults: {
      icon: "mdi-label"
    }
    // opt: {
    //   pureRender: true
    // }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onUpdate: UU5.PropTypes.func.isRequired,
    onDetail: UU5.PropTypes.func.isRequired,
    onDelete: UU5.PropTypes.func.isRequired,
    data: UU5.PropTypes.object.isRequired
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
  _handleUpdate() {
    this.props.onUpdate(this.props.data);
  },
  _handleDetail() {
    this.props.onDetail(this.props.data);
  },

  _handleDelete() {
    this.props.onDelete(this.props.data);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Div className={this.getClassName("header")} mainAttrs={{ onClick: this._handleDetail }}>
          {/*<UU5.Bricks.Icon icon={this.props.data.icon || this.getDefault().icon} />*/}
          <span className={this.getClassName("text")}>{this.props.data.name} {this.props.data.surname}</span>
          {/*<span className={this.getClassName("text")}>{this.props.data.birthDate}</span>
        <span className={this.getClassName("text")}>{this.props.data.citizenship}</span>*/}

        </UU5.Bricks.Div>
        <UU5.Bricks.Div className={this.getClassName("footer")}>
          <UU5.Bricks.Div>
            {/* // EditButton */}
            <UU5.Bricks.Icon icon="mdi-pencil" mainAttrs={{ onClick: this._handleUpdate }} />
            {/* // DeleteButton */}
            <UU5.Bricks.Icon icon="mdi-delete" mainAttrs={{ onClick: this._handleDelete }} />
          </UU5.Bricks.Div>
        </UU5.Bricks.Div>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Tile;
