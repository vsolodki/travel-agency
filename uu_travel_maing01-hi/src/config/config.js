// This file was auto-generated according to the "namespace" setting in package.json.
// Manual changes to this file are discouraged, if values are inconsistent with package.json setting.

export default {
  TAG: "UuTravel.",
  CSS: "uutravel-",

  LEFT_MENU_CCR_KEY: "UuTravel.LeftMenu",

  AUTH_HOME_ROUTE: "travel",
  NOT_AUTH_HOME_ROUTE: "login",

  FEEDBACK: {
    LOADING: "loading",
    READY: "ready",
    ERROR: "error",
    INITIAL: "initial",
    SUCCESS: "success"
  },

  SCREEN_SIZE: {
    XS: "xs",
    S: "s",
    M: "m",
    L: "L",
    XL: "xl"
  },

  PROFILES: {
    AUTHORITIES: "Authorities",
    EXECUTIVES: "Executives"
  },

  STATES: {
    ACTIVE: "active",
    CLOSED: "closed",
    UNDER_CONSTRUCTION: "underConstruction"
  },

  ERROR_CODES: {
    LOAD_INSTANCE_CLOSED: "uu-travel-main/travelInstance/load/travelInstanceNotInProperState",
    LOAD_INSTANCE_UNDER_CONSTRUCTION: "uu-travel-main/travelInstance/load/travelInstanceIsUnderConstruction",
    APP_NOT_AUTHORIZED: "uu-appg01/authorization/accessDenied",
    TRIP_DELETE_NOT_AUTHORIZED: "uu-travel-main/trip/delete/userNotAuthorized",
    TRIP_UPDATE_NOT_AUTHORIZED: "uu-travel-main/trip/update/userNotAuthorized",
    PARTICIPANT_CONTAIN_TRIPS: "uu-travel-main/participant/delete/relatedTripsExist",
    PARTICIPANT_NAME_NOT_UNIQUE: "uu-travel-main/participant/create/participantNameNotUnique",
    LOCATION_CONTAIN_TRIPS: "uu-travel-main/location/delete/relatedTripsExist",
    LOCATION_NAME_NOT_UNIQUE: "uu-travel-main/location/create/locationNameNotUnique"
  }
};
