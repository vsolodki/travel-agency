//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";

import { TravelConsumer } from "../../core/travel-provider.js";
import "./location.less";
import LSI from "./location-lsi.js";
//@@viewOff:imports

export const Location = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Location",
    classNames: {
      main: Config.CSS + "location"
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
  _handleSubmit(locationList) {
    let values = this.props.getValues();
    let usedFilter = this.props.filters.find(filter => filter.key === values.type);
    this.props.addFilter(
      values.type,
      this.getLsiComponent(
        "location",
        null,
        locationList.find(location => location.id === values[values.type]).city
      ),
      values[values.type],
      usedFilter.filterFn
    );
  },

  _getOptions(locationList) {
    return locationList.map(location => (
      <UU5.Forms.Select.Option value={location.id} key={location.city} style="whiteSpace: nowrap">
        {location.city}
      </UU5.Forms.Select.Option>
    ));
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <TravelConsumer>
        {({ locationList }) => (
          <UU5.Bricks.Div {...this.getMainPropsToPass()}>
            <UU5.Forms.Select value={this.props.values} name="location" inputWidth="auto" controlled={false}>
              {this._getOptions(locationList)}
            </UU5.Forms.Select>
            <UU5.Bricks.Button
              onClick={() => this._handleSubmit(locationList)}
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

export default Location;
