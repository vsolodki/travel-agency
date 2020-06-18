//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";

import Calls from "calls";
import Config from "./config/config.js";
import ArrayUtils from "../helpers/array-utils.js";
import LocationReady from "../location/ready.js";
import { reportError, reportSuccess } from "../helpers/alert-helper";

import {TravelConsumer} from "../core/travel-provider.js";
import "./location.less";
import LSI from "./location-lsi.js";

//@@viewOff:imports

export const LocationManagement = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.CcrReaderMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "LocationManagement",
    classNames: {
      main: Config.CSS + "locationmanagement"
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

  onRouteChanged_() {
    let menu = this.getCcrComponentByKey(Config.LEFT_MENU_CCR_KEY);
    menu && menu.setActiveRoute("locationManagement");
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _handleUpdate(data, updateLocation, setAppData, locationList) {
    // set new data (temporally)
    updateLocation(data.id, { ...data, inProgress: true })
      .then(dtoOut => this._handleUpdateDone(dtoOut, setAppData, locationList))
      .catch(response => this._handleUpdateFail(response));
  },

  _handleUpdateDone(dtoOut, setAppData, locationList) {
    setAppData({ locationList: ArrayUtils.updateItem(locationList, dtoOut) });
    // display alert
    reportSuccess(this.getLsiComponent("updateSuccessHeader"));
  },

  /*_handleUpdateFail(response) {
    // display alert
    reportError(this.getLsiComponent("updateFailHeader"), this._decideErrorDescription(response));
  },*/

  _handleCreate(data, createLocation, setAppData, locationList) {
    createLocation({ ...data, inProgress: true })
      .then(dtoOut => this._handleCreateDone(dtoOut, setAppData, locationList))
      .catch(response => this._handleCreateFail(response));
  },

  _handleCreateDone(dtoOut, setAppData, locationList) {
    setAppData({ locationList: ArrayUtils.addItem(locationList, dtoOut) });
    // display alert
    reportSuccess(this.getLsiComponent("createSuccessHeader"));
  },

/*  _handleCreateFail(response) {
    // display alert
    reportError(this.getLsiComponent("createFailHeader"), this._decideErrorDescription(response));
  },*/

  _handleDelete(data, deleteLocation, setAppData, locationList) {
    let original = data;
    let { forceDelete } = data;
    deleteLocation(data.id, undefined, { forceDelete })
      .then(() => this._handleDeleteDone(original, setAppData, locationList))
      .catch(response => this._handleDeleteFail(response));
  },

  _handleDeleteDone(original, setAppData, locationList) {
    setAppData({ locationList: ArrayUtils.removeItem(locationList, original) });
    // display alert
    reportSuccess(this.getLsiComponent("deleteSuccessHeader"));
  },

 /* _handleDeleteFail(response) {
    // display alert
    reportError(this.getLsiComponent("deleteFailHeader"), this._decideErrorDescription(response));
  },*/

  _decideErrorDescription(response) {
    switch (response.status) {
      case 400: // app error
        switch (response.code) {
          case Config.ERROR_CODES.LOCATION_CONTAIN_TRIPS:
            return this.getLsiComponent("locationInUseError");
          case Config.ERROR_CODES.LOCATION_NAME_NOT_UNIQUE:
            return this.getLsiComponent("locationNameNotUnique");
        }
        break;
      case 403:
        return this.getLsiComponent("rightsError");
    }
    return this.getLsiComponent("unexpectedServerError");
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.ListDataManager
          onLoad={Calls.locationList}
          onCreate={Calls.locationCreate}
          onDelete={Calls.locationDelete}
          onUpdate={Calls.locationUpdate}
        >
          {({ data: listData, handleCreate, handleDelete, handleUpdate }) => {
            if (listData) {
              return (
                <TravelConsumer>
                  {({ setData, locationList }) => (
                    <LocationReady
                      {...this.getMainPropsToPass()}
                      data={listData}
                      onCreate={data => {
                        this._handleCreate(data, handleCreate, setData, locationList);
                      }}
                      onUpdate={data => {
                        this._handleUpdate(data, handleUpdate, setData, locationList);
                      }}
                      onDelete={data => {
                        this._handleDelete(data, handleDelete, setData, locationList);
                      }}
                    />
                  )}
                </TravelConsumer>
              );
            } else {
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.ListDataManager>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default LocationManagement;
