"use strict";

const UuTravelError = require("./uu-travel-error");
const LOCATION_ERROR_PREFIX = `${UuTravelError.ERROR_PREFIX}location/`;

const Create = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}create/`,
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  LocationNameNotUnique: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationNameNotUnique`;
      this.message = "Location name is not unique in awid.";
    }
  },
  LocationDaoCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationDaoCreateFailed`;
      this.message = "Create location by location DAO create failed.";
    }
  }
};

const Get = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}get/`,
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  TravelInstanceIsUnderConstruction: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}travelInstanceIsUnderConstruction`;
      this.message = "TravelInstance is in state underConstruction.";
    }
  },
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  LocationDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  }
};

const Update = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}update/`,
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  LocationNameNotUnique: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationNameNotUnique`;
      this.message = "Location name is not unique in awid.";
    }
  },
  LocationDaoUpdateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationDaoUpdateFailed`;
      this.message = "Update location by location Dao update failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}delete/`,
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripDaoGetCountByLocationFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDaoGetCountByLocationFailed`;
      this.message = "Get count by trip Dao getCountByLocation failed.";
    }
  },
  RelatedTripsExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}relatedTripsExist`;
      this.message = "Location contains trips.";
    }
  },
  TripDaoRemoveLocationFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDaoRemoveLocationFailed`;
      this.message = "Removing location by trip Dao removeLocation failed.";
    }
  }
};

const List = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}list/`,
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  TravelInstanceIsUnderConstruction: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}travelInstanceIsUnderConstruction`;
      this.message = "TravelInstance is in state underConstruction.";
    }
  },
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  Create,
  Get,
  Update,
  Delete,
  List
};
