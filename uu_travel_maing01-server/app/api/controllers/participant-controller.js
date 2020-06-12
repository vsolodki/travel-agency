"use strict";

const ParticipantAbl = require("../../abl/participant-abl.js");

class ParticipantController {
  static create(ucEnv) {
    return ParticipantAbl.create(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static get(ucEnv) {
    return ParticipantAbl.get(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  static update(ucEnv) {
    return ParticipantAbl.update(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static delete(ucEnv) {
    return ParticipantAbl.delete(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static list(ucEnv) {
    return ParticipantAbl.list(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }
}

module.exports = ParticipantController;
