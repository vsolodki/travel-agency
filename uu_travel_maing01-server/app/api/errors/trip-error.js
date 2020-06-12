"use strict";

const UuTravelError = require("./uu-travel-error");
const TRIP_ERROR_PREFIX = `${UuTravelError.ERROR_PREFIX}trip/`;

const Create = {
  UC_CODE: `${TRIP_ERROR_PREFIX}create/`,
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
  UuBinaryCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  TripDaoCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}tripDaoCreateFailed`;
      this.message = "Create trip by trip DAO create failed.";
    }
  },
  InvalidPhotoContentType: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidPhotoContentType`;
      this.message = "ContentType of new photo is invalid.";
    }
  }
};

const Get = {
  UC_CODE: `${TRIP_ERROR_PREFIX}get/`,
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
      this.message = "TravelInstance is in underConstruction state.";
    }
  },
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TripDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  }
};

const Update = {
  UC_CODE: `${TRIP_ERROR_PREFIX}update/`,
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
  UserNotAuthorized: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  TripDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  UuBinaryCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  UuBinaryUpdateBinaryDataFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
      this.message = "Updating uuBinary data failed.";
    }
  },
  TripDaoUpdateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}tripDaoUpdateFailed`;
      this.message = "Update trip by trip Dao update failed.";
    }
  }
};

const UpdateVisibility = {
  UC_CODE: `${TRIP_ERROR_PREFIX}updateVisibility/`,
  TripDaoUpdateVisibilityFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateVisibility.UC_CODE}tripDaoUpdateVisibilityFailed`;
      this.message = "Update trip by trip Dao updateVisibility failed";
    }
  },
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateVisibility.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateVisibility.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateVisibility.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Delete = {
  UC_CODE: `${TRIP_ERROR_PREFIX}delete/`,
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
  TripDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  UserNotAuthorized: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  UuBinaryDeleteFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}uuBinaryDeleteFailed`;
      this.message = "Deleting uuBinary failed.";
    }
  }
};

const List = {
  UC_CODE: `${TRIP_ERROR_PREFIX}list/`,
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
  UpdateVisibility,
  Delete,
  List
}
