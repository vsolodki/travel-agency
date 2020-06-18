//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";

import Config from "./config/config.js";
import Uri from "../helpers/uri-helpers.js";
import LeftLink from "../bricks/left-link.js";
import { ensureClosedMenu } from "../helpers/menu-helper";

import "./left.less";
import LSI from "./left-lsi.js";
import {TravelConsumer} from "./travel-provider.js";
//@@viewOff:imports

export const Left = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.CcrWriterMixin, UU5.Common.PureRenderMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Left",
    classNames: {
      main: Config.CSS + "left",
      logo: Config.CSS + "left-logo",
      menu: Config.CSS + "left-menu"
    },
    lsi: LSI,
    opt: {
      ccrKey: Config.LEFT_MENU_CCR_KEY,
      pureRender: true
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    authenticated: UU5.PropTypes.bool
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      authenticated: false
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      activeRoute: null
    };
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  setActiveRoute(route, setStateCallback) {
    this.setState({ activeRoute: route }, setStateCallback);
    return this;
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _handleGoHome() {
    let code = this.props.authenticated ? Config.AUTH_HOME_ROUTE : Config.NOT_AUTH_HOME_ROUTE;
    UU5.Environment.setRoute(code, ensureClosedMenu);
  },

  _handleTabHome() {
    let code = this.props.authenticated ? Config.AUTH_HOME_ROUTE : Config.NOT_AUTH_HOME_ROUTE;
    Uri.openNewTab({ code });
  },

  _getAuthenticatedMenu() {
    return (
      <UU5.Common.Fragment>
        <LeftLink route="trip" active={this.state.activeRoute === "trip"}>
          {this.getLsiComponent("trips")}
        </LeftLink>
        <LeftLink route="location" active={this.state.activeRoute === "location"}>
          {this.getLsiComponent("locations")}
        </LeftLink>

          <LeftLink route="participant" active={this.state.activeRoute === "participant"}>
            {this.getLsiComponent("participants")}
          </LeftLink>

      </UU5.Common.Fragment>
    );
  },

  _getNonAuthenticatedMenu() {
    return (
      <LeftLink route="login" active={this.state.activeRoute === "login"}>
        {this.getLsiComponent("login")}
      </LeftLink>
    );
  },

  _getImage() {
    let imageUrl = Uri.getBinaryUrl("16x9");
    return <UU5.Bricks.Image src={imageUrl} authenticate />;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Div className={this.getClassName("logo")}>
          <TravelConsumer>
            {({ logos }) => (
              <UU5.Bricks.Link
                onClick={this._handleGoHome}
                onWheelClick={this._handleTabHome}
                onCtrlClick={this._handleTabHome}
              >
                {/* // Logo */}
                {logos && logos.includes("16x9") ? (
                  this._getImage()
                ) : (
                  <UU5.Bricks.Image name="Logo" responsive src="assets/logos/16x9.jpeg" />
                )}
              </UU5.Bricks.Link>
            )}
          </TravelConsumer>
        </UU5.Bricks.Div>
        {this.props.authenticated ? this._getAuthenticatedMenu() : this._getNonAuthenticatedMenu()}
        <LeftLink route="about" size="xl" active={this.state.activeRoute === "about"}>
          {this.getLsiComponent("about")}
        </LeftLink>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Left;
