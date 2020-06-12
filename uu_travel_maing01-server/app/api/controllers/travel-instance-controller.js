"use strict";

const TravelInstanceAbl = require("../../abl/travel-instance-abl.js");

const CACHE_VALUE = "public, max-age=86400, s-maxage=86400";

class TravelInstanceController {
  static init(ucEnv) {
    return TravelInstanceAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  static plugInBt(ucEnv) {
    return TravelInstanceAbl.plugInBt(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  static load(ucEnv) {
    return TravelInstanceAbl.load(ucEnv.uri.getAwid(), ucEnv.getAuthorizationResult());
  }

  static update(ucEnv) {
    return TravelInstanceAbl.update(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static setLogo(ucEnv) {
    return TravelInstanceAbl.setLogo(ucEnv.uri.getAwid(), ucEnv.parameters);
  }

  static setIcons(ucEnv) {
    return TravelInstanceAbl.setIcons(ucEnv.uri.getAwid(), ucEnv.parameters, ucEnv.getUri());
  }

  static getProductInfo(ucEnv) {
    ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
    return TravelInstanceAbl.getProductInfo(ucEnv.uri.getAwid());
  }

  static async getProductLogo(ucEnv) {
    let dtoOut = await TravelInstanceAbl.getProductLogo(ucEnv.getUri().getAwid(), ucEnv.parameters);
    ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
    return ucEnv.setBinaryDtoOut(dtoOut);
  }

  static async getUveMetaData(ucEnv) {
    let dtoOut = await TravelInstanceAbl.getUveMetaData(ucEnv.getUri().getAwid(), ucEnv.parameters);
    ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
    return ucEnv.setBinaryDtoOut(dtoOut);
  }

  static async getIndex(ucEnv) {
    ucEnv.getResponse().setHeaders({ "Cache-Control": CACHE_VALUE });
    return TravelInstanceAbl.getIndex(ucEnv.uri.getAwid(), ucEnv.getUri());
  }
}

module.exports = TravelInstanceController;
