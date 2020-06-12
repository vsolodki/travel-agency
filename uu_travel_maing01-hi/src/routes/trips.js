//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Calls from "calls";

import Config from "./config/config.js";
import TripsReady from "../trips/ready.js";
import {dig} from "../helpers/object-utils.js";
import {reportSuccess, reportError} from "../helpers/alert-helper";

import "./trips.less";
import LSI from "./trips-lsi.js";
//@@viewOff:imports

export const Trips = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.CcrReaderMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Trips",
    classNames: {
      main: Config.CSS + "trips"
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
    menu && menu.setActiveRoute("trips");
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _handleUpdate(data, updateTrip) {
    // set new data (temporally)
    updateTrip(data.id, {...data, inProgress: true}, undefined, null, "updateTrip")
      .then(() => this._handleUpdateDone())
      .catch(response => this._handleUpdateFail(response));
  },

  _handleUpdateDone() {
    // display alert
    reportSuccess(this.getLsiComponent("updateSuccessHeader"));
  },

  _handleUpdateFail(response) {
    // display alert
    reportError(this.getLsiComponent("updateFailHeader"), this._decideErrorDescription(response));
  },


  _handleUpdateVisibility(data, updateVisibility) {
    let original = data.visibility;
    // set new data (temporally)
    updateVisibility(data.id, {...data, inProgress: true}, undefined, null, "updateTripVisibility")
      .then(dtoOut => this._handleUpdateVisibilityDone(dtoOut))
      .catch(response => this._handleUpdateVisibilityFail(response, original));
  },

  _handleUpdateVisibilityDone(dtoOut) {
    // display alert
    let lsiKey = dtoOut.visibility ? "publish" : "unpublish";
    reportSuccess(this.getLsiComponent(`${lsiKey}SuccessHeader`));
  },

  _handleUpdateVisibilityFail(response, original) {
    // display alert
    let lsiKey = original ? "unpublish" : "publish";
    reportError(this.getLsiComponent(`${lsiKey}FailHeader`), this._decideErrorDescription(response));
  },

  _handleCreate(data, createTrip) {
    // add new one
    createTrip({...data, inProgress: true})
      .then(() => this._handleCreateDone())
      .catch(response => this._handleCreateFail(response));
  },

  _handleCreateDone() {
    // display alert
    reportSuccess(this.getLsiComponent("createSuccessHeader"));
  },

  _handleCreateFail(response) {
    // display alert
    reportError(this.getLsiComponent("createFailHeader"), this._decideErrorDescription(response));
  },

  _handleDelete(data, deleteTrip) {
    deleteTrip(data.id)
      .then(() => this._handleDeleteDone())
      .catch(response => this._handleDeleteFail(response));
  },

  _handleDeleteDone() {
    // display alert
    reportSuccess(this.getLsiComponent("deleteSuccessHeader"));
  },

  _handleDeleteFail(response) {
    // display alert
    reportError(this.getLsiComponent("deleteFailHeader"), this._decideErrorDescription(response));
  },

  _decideErrorDescription(response) {
    switch (response.status) {
      case 400: // app error
        switch (response.code) {
          case Config.ERROR_CODES.TRIP_DELETE_NOT_AUTHORIZED:
          case Config.ERROR_CODES.TRIP_UPDATE_NOT_AUTHORIZED:
            return this.getLsiComponent("rightsError");
        }
        break;
      case 403:
        return this.getLsiComponent("rightsError");
    }
    return this.getLsiComponent("unexpectedServerError");
  },

  _filterOutVisibility(trips, identity) {
    let canSeeAllUnpublished = UU5.Environment.App.authorization.canSeeAllUnpublished();
    let canSeeUnpublished = UU5.Environment.App.authorization.canSeeUnpublished();

    return trips.filter(trip => {
      let result;

      if (canSeeAllUnpublished) {
        result = true;
      } else if (canSeeUnpublished && trip.uuIdentity === identity) {
        result = true;
      } else {
        result = trip.visibility;
      }
      return result;
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.ListDataManager
          onLoad={Calls.tripList}
          onCreate={Calls.tripCreate}
          onDelete={Calls.tripDelete}
          onUpdate={{
            updateTripVisibility: Calls.updateTripVisibility,
            updateTrip: Calls.updateTrip
          }}
        >
          {({data, handleCreate, handleUpdate, handleDelete}) => {
            if (data) {
              return (
                <UU5.Common.Identity>
                  {({identity}) =>
                    <TripsReady
                      data={this._filterOutVisibility(data, identity)}
                      detailId={dig(this.props, "params", "id")}
                      onCreate={data => {
                        return this._handleCreate(data, handleCreate);
                      }}
                      onUpdate={data => {
                        return this._handleUpdate(data, handleUpdate);
                      }}
                      onRate={data => {
                        return this._handleRate(data, handleUpdate);
                      }}
                      onDelete={data => {
                        return this._handleDelete(data, handleDelete);
                      }}
                      onUpdateVisibility={data => {
                        return this._handleUpdateVisibility(data, handleUpdate);
                      }}
                    />
                  }
                </UU5.Common.Identity>
              );
            } else {
              return <UU5.Bricks.Loading/>;
            }
          }}
        </UU5.Common.ListDataManager>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Trips;
