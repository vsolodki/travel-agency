//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";

import Uri from "../helpers/uri-helpers.js";

import "./tile.less";
import Config from "./config/config";
//@@viewOff:imports

export const Tile = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Tile",
    classNames: {
      main: Config.CSS + "tile",
      notPublished: Config.CSS + "tile-not-published",
      header: Config.CSS + "tile-header",
      footer: Config.CSS + "tile-footer",
      content: Config.CSS + "tile-content",
      text: Config.CSS + "tile-text"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onDetail: UU5.PropTypes.func.isRequired,
    onUpdate: UU5.PropTypes.func.isRequired,
    onDelete: UU5.PropTypes.func.isRequired,
    onUpdateVisibility: UU5.PropTypes.func.isRequired,
    data: UU5.PropTypes.shape({
      id: UU5.PropTypes.string,
      text: UU5.PropTypes.text
    }).isRequired
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
  _getMainProps() {
    let props = this.getMainPropsToPass();
    if (!this.props.data.visibility) {
      props.className = props.className + ` ${this.getClassName("notPublished")}`;
    }

    return props;
  },

  _handleDetail() {
    this.props.onDetail(this.props.data);
  },

  _handleUpdate() {
    this.props.onUpdate(this.props.data);
  },

  _handleDelete() {
    this.props.onDelete(this.props.data);
  },

  _handleUpdateVisibility() {
    this.props.onUpdateVisibility({ ...this.props.data, visibility: !this.props.data.visibility });
  },

  _canManage(trip, identity) {
    return (
      UU5.Environment.App.authorization.canManageAll() ||
      (UU5.Environment.App.authorization.canManage() && trip.uuIdentity === identity)
    );
  },

  _getImage() {
    let imageUrl = Uri.getBinaryUrl(this.props.data.image);
    return <UU5.Bricks.Image src={imageUrl} authenticate />;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this._getMainProps()}>
        <UU5.Bricks.Div className={this.getClassName("header")} mainAttrs={{ onClick: this._handleDetail }}>
          <span>
            {
              // basic HTML tags are used to prevent possible uu5string from execution
              this.props.data.name
            }
          </span>
        </UU5.Bricks.Div>
        <UU5.Bricks.Div className={this.getClassName("content")} mainAttrs={{ onClick: this._handleDetail }}>
          {/*<div className={this.getClassName("text")}>
            {// basic HTML tags are used to prevent possible uu5string from execution
              nl2br(this.props.data.text)}
          </div>*/}

          {this.props.data.image && this._getImage()}
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
