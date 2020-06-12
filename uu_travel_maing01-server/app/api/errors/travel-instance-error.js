"use strict";

const UuTravelError = require("./uu-travel-error");
const TRAVEL_INSTANCE_ERROR_PREFIX = `${UuTravelError.ERROR_PREFIX}travelInstance/`;

const Init = {
  UC_CODE: `${TRAVEL_INSTANCE_ERROR_PREFIX}init/`,
  TravelInstanceAlreadyInitialized: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}travelInstanceAlreadyInitialized`;
      this.message = "TravelInstance is already initialized.";
    }
  },
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  CreateAwscFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
  SysSetProfileFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Create uuAppProfile failed.";
    }
  },
  UuBinaryCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  TravelInstanceDaoCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}travelInstanceDaoCreateFailed`;
      this.message = "Create travelInstance by travelInstance DAO create failed.";
    }
  }
};

const Load = {
  UC_CODE: `${TRAVEL_INSTANCE_ERROR_PREFIX}load/`,
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  TravelInstanceIsUnderConstruction: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}travelInstanceIsUnderConstruction`;
      this.message = "TravelInstance is in state underConstruction.";
    }
  }
};

const Update = {
  UC_CODE: `${TRAVEL_INSTANCE_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TravelInstanceDaoUpdateByAwidFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}travelInstanceDaoUpdateByAwidFailed`;
      this.message = "Update travelInstance by travelInstance Dao updateByAwid failed.";
    }
  }
};

const SetLogo = {
  UC_CODE: `${TRAVEL_INSTANCE_ERROR_PREFIX}setLogo/`,
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetLogo.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetLogo.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetLogo.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  UuBinaryCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetLogo.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  UuBinaryUpdateBinaryDataFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetLogo.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
      this.message = "Updating uuBinary data failed.";
    }
  },
  TravelInstanceDaoUpdateByAwidFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetLogo.UC_CODE}travelInstanceDaoUpdateByAwidFailed`;
      this.message = "Update travelInstance by travelInstance Dao updateByAwid failed.";
    }
  }
};

const GetProductLogo = {
  UC_CODE: `${TRAVEL_INSTANCE_ERROR_PREFIX}getProductLogo/`,
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${GetProductLogo.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const GetIndex = {
  UC_CODE: `${TRAVEL_INSTANCE_ERROR_PREFIX}getIndex/`,
  UnableToReadHtmlFile: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${GetIndex.UC_CODE}unableToReadHtmlFile`;
      this.message = "Unable to read html file.";
    }
  }
};

const GetUveMetaData = {
  UC_CODE: `${TRAVEL_INSTANCE_ERROR_PREFIX}getUveMetaData/`,
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${GetUveMetaData.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const SetIcons = {
  UC_CODE: `${TRAVEL_INSTANCE_ERROR_PREFIX}setIcons/`,
  InvalidDtoIn: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetIcons.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  UuBinaryUpdateBinaryDataFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetIcons.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
      this.message = "Updating uuBinary data failed.";
    }
  },
  UuBinaryCreateFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetIcons.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  TravelInstanceDoesNotExist: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetIcons.UC_CODE}travelInstanceDoesNotExist`;
      this.message = "TravelInstance does not exist.";
    }
  },
  TravelInstanceNotInProperState: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetIcons.UC_CODE}travelInstanceNotInProperState`;
      this.message = "TravelInstance is not in proper state [active|underConstruction].";
    }
  },
  TravelInstanceDaoUpdateByAwidFailed: class extends UuTravelError {
    constructor() {
      super(...arguments);
      this.code = `${SetIcons.UC_CODE}travelInstanceDaoUpdateByAwidFailed`;
      this.message = "Update travelInstance by travelInstance Dao updateByAwid failed.";
    }
  }
};

module.exports = {
  Init,
  Load,
  Update,
  SetLogo,
  GetProductLogo,
  GetIndex,
  GetUveMetaData,
  SetIcons
};
