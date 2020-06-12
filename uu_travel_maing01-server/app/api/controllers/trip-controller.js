"use strict";

const TripAbl = require("../../abl/trip-abl.js");

class TripController {
  static create(ucEnv) {
    return TripAbl.create(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static get(ucEnv) {
    return TripAbl.get(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  static update(ucEnv) {
    return TripAbl.update(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static updateVisibility(ucEnv) {
    return TripAbl.updateVisibility(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static delete(ucEnv) {
    return TripAbl.delete(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  static list(ucEnv) {
    return TripAbl.list(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }


}

module.exports = TripController;
