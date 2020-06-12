/**
 * Server calls of application client.
 */
import { Uri } from "uu_appg01_core";
import { Client } from "uu_appg01";
import Plus4U5 from "uu_plus4u5g01";
import * as UU5 from "uu5g04";

let Calls = {
  /** URL containing app base, e.g. "https://uuos9.plus4u.net/vnd-app/tid-awid/". */
  APP_BASE_URI: location.protocol + "//" + location.host + UU5.Environment.getAppBasePath(),

  call(method, url, dtoIn, clientOptions) {
    return Plus4U5.Common.Calls.call(method, url, dtoIn, clientOptions);
  },

  loadApp(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("travelInstance/load");
      Calls.call("get", commandUri, { data: dtoInData, done: resolve, fail: reject });
    });
  },
  loadLicenseOwner() {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("sys/getLicenseOwner");
      Calls.call("get", commandUri, { data: {}, done: resolve, fail: reject });
    });
  },

  participantList(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("participant/list");
      Calls.call("get", commandUri, { data: dtoInData, done: resolve, fail: reject });
    });
  },

  participantCreate(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("participant/create");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },

  participantUpdate(id, dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("participant/update");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },

  participantDelete(id, { forceDelete }) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("participant/delete");
      Calls.call("post", commandUri, {
        data: { id, forceDelete },
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },
  locationList(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("location/list");
      Calls.call("get", commandUri, { data: dtoInData, done: resolve, fail: reject });
    });
  },

  locationCreate(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("location/create");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },

  locationUpdate(id, dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("location/update");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },

  locationDelete(id, { forceDelete }) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("location/delete");
      Calls.call("post", commandUri, {
        data: { id, forceDelete },
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },
  tripList(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("trip/list");
      Calls.call("get", commandUri, { data: dtoInData, done: resolve, fail: reject });
    });
  },

  tripCreate(dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("trip/create");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },

  tripDelete(id) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("trip/delete");
      Calls.call("post", commandUri, { data: { id }, done: resolve, fail: reject });
    });
  },

  updateTrip(id, dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("trip/update");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },


  updateTripVisibility(id, dtoInData) {
    return new Promise((resolve, reject) => {
      let commandUri = Calls.getCommandUri("trip/updateVisibility");
      Calls.call("post", commandUri, {
        data: dtoInData,
        done: data => resolve({ ...data, inProgress: false }),
        fail: reject
      });
    });
  },

  uploadFile(dtoIn) {
    let commandUri = Calls.getCommandUri("uu-app-binarystore/createBinary");
    Calls.call("post", commandUri, dtoIn);
  },

  deleteFile(dtoIn) {
    let commandUri = Calls.getCommandUri("uu-app-binarystore/deleteBinary");
    Calls.call("post", commandUri, dtoIn);
  },

  /*
  For calling command on specific server, in case of developing client site with already deployed
  server in uuCloud etc. You can specify url of this application (or part of url) in development
  configuration in *-client/env/development.json
  for example:
   {
     "gatewayUri": "https://uuos9.plus4u.net",
     "tid": "84723877990072695",
     "awid": "b9164294f78e4cd51590010882445ae5",
     "vendor": "uu",
     "app": "demoappg01",
     "subApp": "main"
   }
   */
  getCommandUri(aUseCase) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    // NOTE Using string concatenation instead of UriBuilder to support also URLs
    // that don't conform to uuUri specification.
    let targetUriStr = Calls.APP_BASE_URI + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    let env = UU5.Environment;
    if (env.tid || env.awid || env.vendor || env.app) {
      let uriBuilder = Uri.UriBuilder.parse(targetUriStr);
      if (env.tid || env.awid) {
        if (env.gatewayUri) uriBuilder.setGateway(env.gatewayUri);
        if (env.tid) uriBuilder.setTid(env.tid);
        if (env.awid) uriBuilder.setAwid(env.awid);
      }
      if (env.vendor || env.app) {
        if (env.vendor) uriBuilder.setVendor(env.vendor);
        if (env.app) uriBuilder.setApp(env.app);
        if (env.subApp) uriBuilder.setSubApp(env.subApp);
      }
      targetUriStr = uriBuilder.toUri().toString();
    }

    return targetUriStr;
  }
};

function isIE() {
  return !!window.MSInputMethodContext && !!document.documentMode;
}

export default Calls;
