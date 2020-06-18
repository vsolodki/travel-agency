//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";

import Calls from "calls";
import Config from "./config/config.js";
import ArrayUtils from "../helpers/array-utils.js";
import ParticipantReady from "../participant/ready.js";
import { reportError, reportSuccess } from "../helpers/alert-helper";

import {TravelConsumer} from "../core/travel-provider.js";
import "./participant.less";
import LSI from "./participant-lsi.js";

//@@viewOff:imports

export const Participant = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.CcrReaderMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "ParticipantManagement",
    classNames: {
      main: Config.CSS + "participantmanagement"
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
    menu && menu.setActiveRoute("participantManagement");
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _handleUpdate(data, updateParticipant, setAppData, participantList) {
    // set new data (temporally)
    updateParticipant(data.id, { ...data, inProgress: true })
      .then(dtoOut => this._handleUpdateDone(dtoOut, setAppData, participantList))
      .catch(response => this._handleUpdateFail(response));
  },

  _handleUpdateDone(dtoOut, setAppData, participantList) {
    setAppData({ participantList: ArrayUtils.updateItem(participantList, dtoOut) });
    // display alert
    reportSuccess(this.getLsiComponent("updateSuccessHeader"));
  },

  _handleUpdateFail(response) {
    // display alert
    reportError(this.getLsiComponent("updateFailHeader"), this._decideErrorDescription(response));
  },

  _handleCreate(data, createParticipant, setAppData, participantList) {
    createParticipant({ ...data, inProgress: true })
      .then(dtoOut => this._handleCreateDone(dtoOut, setAppData, participantList))
      .catch(response => this._handleCreateFail(response));
  },

  _handleCreateDone(dtoOut, setAppData, participantList) {
    setAppData({ participantList: ArrayUtils.addItem(participantList, dtoOut) });
    // display alert
    reportSuccess(this.getLsiComponent("createSuccessHeader"));
  },

  _handleCreateFail(response) {
    // display alert
    reportError(this.getLsiComponent("createFailHeader"), this._decideErrorDescription(response));
  },

  _handleDelete(data, deleteParticipant, setAppData, participantList) {
    let original = data;
    let { forceDelete } = data;
    deleteParticipant(data.id, undefined, { forceDelete })
      .then(() => this._handleDeleteDone(original, setAppData, participantList))
      .catch(response => this._handleDeleteFail(response));
  },

  _handleDeleteDone(original, setAppData, participantList) {
    setAppData({ participantList: ArrayUtils.removeItem(participantList, original) });
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
          case Config.ERROR_CODES.PARTICIPANT_CONTAIN_TRIPS:
            return this.getLsiComponent("participantInUseError");
          case Config.ERROR_CODES.PARTICIPANT_NAME_NOT_UNIQUE:
            return this.getLsiComponent("participantNameNotUnique");
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
          onLoad={Calls.participantList}
          onCreate={Calls.participantCreate}
          onDelete={Calls.participantDelete}
          onUpdate={Calls.participantUpdate}
        >
          {({ data: listData, handleCreate, handleDelete, handleUpdate }) => {
            if (listData) {
              return (
                <TravelConsumer>
                  {({ setData, participantList }) => (
                    <ParticipantReady
                      {...this.getMainPropsToPass()}
                      data={listData}
                      onCreate={data => {
                        this._handleCreate(data, handleCreate, setData, participantList);
                      }}
                      onUpdate={data => {
                        this._handleUpdate(data, handleUpdate, setData, participantList);
                      }}
                      onDelete={data => {
                        this._handleDelete(data, handleDelete, setData, participantList);
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

export default Participant;
