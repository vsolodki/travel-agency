/*eslint-disable no-constant-condition*/

"use strict";
const { Base64 } = require("uu_appg01_server").Utils;
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const UuBinaryAbl = require("uu_appg01_binarystore-cmd").UuBinaryModel;
const TravelInstanceAbl = require("./travel-instance-abl");
const Errors = require("../api/errors/trip-error");
const Path = require("path");
const FileHelper = require("../helpers/file-helper");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  createParticipantDoesNotExist: {
    code: `${Errors.Create.UC_CODE}participantDoesNotExist`,
    message: "One or more participants with given participantId do not exist."
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
  updateParticipantDoesNotExist: {
    code: `${Errors.Update.UC_CODE}participantDoesNotExist`,
    message: "One or more participants with given participantId do not exist."
  },
  updateVisibilityUnsupportedKeys: {
    code: `${Errors.UpdateVisibility.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }
};
const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100
};

class TripAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "trip-types.js"));
    this.dao = DaoFactory.getDao("trip");
    this.participantDao = DaoFactory.getDao("participant");
    this.locationDao = DaoFactory.getDao("location");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Create.TravelInstanceDoesNotExist,
      Errors.Create.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("tripCreateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // hds 2.4

    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(TravelInstanceAbl.AUTHORITIES);
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    dtoIn.awid = awid;

    // hds 3.1, A5
    if (dtoIn.image) {
      //check if stream or base64
      if (dtoIn.image.readable) {
        //check if the stream is valid
        let { valid: isValidStream, stream } = await FileHelper.validateImageStream(dtoIn.image);
        if (!isValidStream) {
          throw new Errors.Create.InvalidPhotoContentType({ uuAppErrorMap });
        }
        dtoIn.image = stream;
      } else {
        //check if the base64 is valid
        let binaryBuffer = Base64.urlSafeDecode(dtoIn.image, "binary");
        if (!FileHelper.validateImageBuffer(binaryBuffer).valid) {
          throw new Errors.Create.InvalidPhotoContentType({ uuAppErrorMap });
        }

        dtoIn.image = FileHelper.toStream(binaryBuffer);
      }

      //Hhds 3.2
      try {
        let binary = await UuBinaryAbl.createBinary(awid, { data: dtoIn.image });
        dtoIn.image = binary.code;
      } catch (e) {
        // A6
        throw new Errors.Create.UuBinaryCreateFailed({ uuAppErrorMap }, e);
      }
    }

    // hds 4
    if (dtoIn.participantList) {
      let presentParticipants = await this._checkParticipantsExistence(awid, dtoIn.participantList);
      // A7
      if (dtoIn.participantList.length > 0) {
        ValidationHelper.addWarning(
          uuAppErrorMap,
          WARNINGS.createParticipantDoesNotExist.code,
          WARNINGS.createParticipantDoesNotExist.message,
          { participantList: [...new Set(dtoIn.participantList)] }
        );
      }
      dtoIn.participantList = [...new Set(presentParticipants)];
    } else {
      dtoIn.participantList = [];
    }


    // hds 5
    let trip;
    try {
      trip = await this.dao.create(dtoIn);
    } catch (e) {
      // A8
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TripDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 6
    trip.uuAppErrorMap = uuAppErrorMap;
    return trip;
  }

  async get(awid, dtoIn, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    let travelInstance = await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Get.TravelInstanceDoesNotExist,
      Errors.Get.TravelInstanceNotInProperState
    );
    // A3
    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    if (
      travelInstance.state === TravelInstanceAbl.STATE_UNDER_CONSTRUCTION &&
      !authorizedProfiles.includes(TravelInstanceAbl.AUTHORITIES) &&
      !authorizedProfiles.includes(TravelInstanceAbl.EXECUTIVES)
    ) {
      throw new Errors.Get.TravelInstanceIsUnderConstruction({}, { state: travelInstance.state });
    }

    // hds 2, 2.1
    let validationResult = this.validator.validate("tripGetDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // hds 3
    let trip = await this.dao.get(awid, dtoIn.id);
    if (!trip) {
      // A6
      throw new Errors.Get.TripDoesNotExist(uuAppErrorMap, { tripId: dtoIn.id });
    }

    // hds 4
    trip.uuAppErrorMap = uuAppErrorMap;
    return trip;
  }

  async update(awid, dtoIn, session, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Update.TravelInstanceDoesNotExist,
      Errors.Update.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("tripUpdateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // hds 3
    let trip = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!trip) {
      throw new Errors.Update.TripDoesNotExist({ uuAppErrorMap }, { tripId: dtoIn.id });
    }

    // hds 4
    let uuId = session.getIdentity().getUuIdentity();
    // A6
    if (
      uuId !== trip.uuIdentity &&
      !authorizationResult.getAuthorizedProfiles().includes(TravelInstanceAbl.AUTHORITIES)
    ) {
      throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
    }

    // hds 5
    if (dtoIn.participantList) {
      let presentParticipants = await this._checkParticipantsExistence(awid, dtoIn.participantList);
      // A7
      if (dtoIn.participantList.length > 0) {
        ValidationHelper.addWarning(
          uuAppErrorMap,
          WARNINGS.updateParticipantDoesNotExist.code,
          WARNINGS.updateParticipantDoesNotExist.message,
          { participantList: [...new Set(dtoIn.participantList)] }
        );
      }
      dtoIn.participantList = [...new Set(presentParticipants)];
    }


    // hds 6
    if (dtoIn.image) {
      let binary;
      if (!trip.image) {
        // hds 6.1
        try {
          binary = await UuBinaryAbl.createBinary(awid, { data: dtoIn.image });
        } catch (e) {
          // A8
          throw new Errors.Update.UuBinaryCreateFailed({ uuAppErrorMap }, e);
        }
      } else {
        // hds 6.2
        try {
          binary = await UuBinaryAbl.updateBinaryData(awid, {
            data: dtoIn.image,
            code: trip.image,
            revisionStrategy: "NONE"
          });
        } catch (e) {
          // A9
          throw new Errors.Update.UuBinaryUpdateBinaryDataFailed({ uuAppErrorMap }, e);
        }
      }
      dtoIn.image = binary.code;
    }

    // hds 7
    try {
      dtoIn.awid = awid;
      trip = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.Update.TripDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 8
    trip.uuAppErrorMap = uuAppErrorMap;
    return trip;
  }

  async updateVisibility(awid, dtoIn) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.UpdateVisibility.TravelInstanceDoesNotExist,
      Errors.UpdateVisibility.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("tripUpdateVisibilityDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateVisibilityUnsupportedKeys.code,
      Errors.UpdateVisibility.InvalidDtoIn
    );

    // hds 3
    let trip;
    try {
      trip = await this.dao.updateVisibility(awid, dtoIn.id, dtoIn.visibility);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A5
        throw new Errors.UpdateVisibility.TripDaoUpdateVisibilityFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 4
    trip.uuAppErrorMap = uuAppErrorMap;
    return trip;
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Delete.TravelInstanceDoesNotExist,
      Errors.Delete.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("tripDeleteDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // hds 3
    let trip = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!trip) {
      throw new Errors.Delete.TripDoesNotExist({ uuAppErrorMap }, { tripId: dtoIn.id });
    }

    // hds 4, A6
    if (
      session.getIdentity().getUuIdentity() !== trip.uuIdentity &&
      !authorizationResult.getAuthorizedProfiles().includes(TravelInstanceAbl.AUTHORITIES)
    ) {
      throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap });
    }

    // hds 5

    // hds 6
    if (trip.image) {
      try {
        await UuBinaryAbl.deleteBinary(awid, { code: trip.image });
      } catch (e) {
        // A7
        throw new Errors.Delete.UuBinaryDeleteFailed({ uuAppErrorMap }, e);
      }
    }

    // hds 7
    await this.dao.delete(awid, dtoIn.id);

    // hds 8
    return { uuAppErrorMap };
  }

  async list(awid, dtoIn, authorizationResult) {
    // hds 1, A1, hds 1.1, A2
    let travelInstance = await TravelInstanceAbl.checkInstance(
      awid,
      Errors.List.TravelInstanceDoesNotExist,
      Errors.List.TravelInstanceNotInProperState
    );
    // A3
    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    if (
      travelInstance.state === TravelInstanceAbl.STATE_UNDER_CONSTRUCTION &&
      !authorizedProfiles.includes(TravelInstanceAbl.AUTHORITIES) &&
      !authorizedProfiles.includes(TravelInstanceAbl.EXECUTIVES)
    ) {
      throw new Errors.List.TravelInstanceIsUnderConstruction({}, { state: travelInstance.state });
    }

    // hds 2, 2.1
    let validationResult = this.validator.validate("tripListDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // hds 2.4
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    // hds 3
    let list;
    if (dtoIn.participantList) {
      list = await this.dao.listByParticipantIdList(awid, dtoIn.participantList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } else {
      list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    // hds 4
    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }



  /**
   * Checks whether participants exist for specified awid and removes them from participantList (so it, in the end, contains
   * only ids of participants, that do not exist).
   * @param {String} awid Used awid
   * @param {Array} participantList An array with ids of participants
   * @returns {Promise<[]>} Ids of existing participants
   */
  async _checkParticipantsExistence(awid, participantList) {
    let participants;
    let pageInfo = { pageIndex: 0 };
    let presentParticipants = [];
    let participantIndex;
    while (true) {
      participants = await this.participantDao.listByParticipantIdList(awid, participantList, pageInfo);
      participants.itemList.forEach(participant => {
        participantIndex = participantList.indexOf(participant.id.toString());
        if (participantIndex !== -1) {
          presentParticipants.push(participant.id.toString());
          participantList.splice(participantIndex, 1);
        }
      });
      if (participants.itemList < participants.pageInfo.pageSize || participantList.length === 0) {
        break;
      }
      pageInfo.pageIndex += 1;
    }
    return presentParticipants;
  }
  async _checkLocationsExistence(awid, locationList) {
    let locations;
    let pageInfo = { pageIndex: 0 };
    let presentLocations = [];
    let locationIndex;
    while (true) {
      locations = await this.locationDao.listByLocationIdList(awid, locationList, pageInfo);
      locations.itemList.forEach(location => {
        locationIndex = locationList.indexOf(location.id.toString());
        if (locationIndex !== -1) {
          presentLocations.push(location.id.toString());
          locationList.splice(locationIndex, 1);
        }
      });
      if (locations.itemList < locations.pageInfo.pageSize || locationList.length === 0) {
        break;
      }
      pageInfo.pageIndex += 1;
    }
    return presentLocations;
  }
}

module.exports = new TripAbl();
