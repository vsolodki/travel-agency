"use strict";

const UuTravelError = require("./uu-travel-error");
const PARTICIPANT_ERROR_PREFIX = `${UuTravelError.ERROR_PREFIX}participant/`;

const Create = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}create/`,
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
  ParticipantNameNotUnique: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}participantNameNotUnique`;
      this.message = "Participant name is not unique in awid.";
    }
  },
  ParticipantDaoCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}participantDaoCreateFailed`;
      this.message = "Create participant by participant DAO create failed.";
    }
  }
};

const Get = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}get/`,
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
  ParticipantDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}participantDoesNotExist`;
      this.message = "Participant does not exist.";
    }
  }
};

const Update = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}update/`,
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
  ParticipantNameNotUnique: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}participantNameNotUnique`;
      this.message = "Participant name is not unique in awid.";
    }
  },
  ParticipantDaoUpdateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}participantDaoUpdateFailed`;
      this.message = "Update participant by participant Dao update failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}delete/`,
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
  TripDaoGetCountByParticipantFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDaoGetCountByParticipantFailed`;
      this.message = "Get count by trip Dao getCountByParticipant failed.";
    }
  },
  RelatedTripsExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}relatedTripsExist`;
      this.message = "Participant contains trips.";
    }
  },
  TripDaoRemoveParticipantFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDaoRemoveParticipantFailed`;
      this.message = "Removing participant by trip Dao removeParticipant failed.";
    }
  }
};

const List = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}list/`,
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
