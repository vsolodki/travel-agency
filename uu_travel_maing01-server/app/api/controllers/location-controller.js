"use strict";

const LocationAbl = require("../../abl/location-abl.js");

class LocationController {
  static create(ucEnv) {
    return LocationAbl.create(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static get(ucEnv) {
    return LocationAbl.get(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  static update(ucEnv) {
    return LocationAbl.update(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static delete(ucEnv) {
    return LocationAbl.delete(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static list(ucEnv) {
    return LocationAbl.list(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }
}

module.exports = LocationController;
