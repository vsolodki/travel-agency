//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";

import {TravelConsumer} from "../../core/travel-provider.js";
import "./trip.less";
import LSI from "./trip-lsi.js";
//@@viewOff:imports

export const Trip = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Trip",
    classNames: {
      main: Config.CSS + "trip"
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
  _handleSubmit(tripList) {
    let values = this.props.getValues();
    let usedFilter = this.props.filters.find(filter => filter.key === values.type);
    this.props.addFilter(
      values.type,
      this.getLsiComponent("trip", null, tripList.find(trip => trip.id === values[values.type]).name),
      values[values.type],
      usedFilter.filterFn
    );
  },

  _getOptions(tripList) {
    return tripList.map(trip => (
      <UU5.Forms.Select.Option value={trip.id} key={trip.id} style="whiteSpace: nowrap">
        {trip.name}
      </UU5.Forms.Select.Option>
    ));
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <TravelConsumer>
        {({ tripList }) => (
          <UU5.Bricks.Div {...this.getMainPropsToPass()}>
            <UU5.Forms.Select value={this.props.values} name="trip" inputWidth="auto" controlled={false}>
              {this._getOptions(tripList)}
            </UU5.Forms.Select>
            <UU5.Bricks.Button
              onClick={() => this._handleSubmit(tripList)}
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

export default Trip;
