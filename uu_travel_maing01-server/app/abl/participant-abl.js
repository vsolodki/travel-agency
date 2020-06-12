"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError, DuplicateKey } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const TravelInstanceAbl = require("./travel-instance-abl");
const Errors = require("../api/errors/participant-error");
const Path = require("path");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }
};
const DEFAULT_ICON = "mdi-label";
const DEFAULTS = {
  order: "asc",
  pageIndex: 0,
  pageSize: 100
};

class ParticipantAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "participant-types.js"));
    this.dao = DaoFactory.getDao("participant");
    this.tripDao = DaoFactory.getDao("trip");
  }

  async create(awid, dtoIn) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Create.TravelInstanceDoesNotExist,
      Errors.Create.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("participantCreateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // hds 2.4
    if (!dtoIn.icon) dtoIn.icon = DEFAULT_ICON;
    dtoIn.awid = awid;

    // hds 3
    let participant;
    try {
      participant = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof DuplicateKey) {
        // A5
        throw new Errors.Create.ParticipantNameNotUnique({ uuAppErrorMap }, { participantName: dtoIn.name });
      }
      if (e instanceof ObjectStoreError) {
        // A6
        throw new Errors.Create.ParticipantDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 4
    participant.uuAppErrorMap = uuAppErrorMap;
    return participant;
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
    let validationResult = this.validator.validate("participantGetDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // hds 3
    let participant;
    if (dtoIn.id) {
      participant = await this.dao.get(awid, dtoIn.id);
    } else {
      participant = await this.dao.getByName(awid, dtoIn.name);
    }
    // A6
    if (!participant) {
      let paramMap = {};
      if (dtoIn.id) paramMap.participantId = dtoIn.id;
      if (dtoIn.name) paramMap.participantName = dtoIn.name;
      throw new Errors.Get.ParticipantDoesNotExist({ uuAppErrorMap }, paramMap);
    }

    // hds 4
    participant.uuAppErrorMap = uuAppErrorMap;
    return participant;
  }

  async update(awid, dtoIn) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Update.TravelInstanceDoesNotExist,
      Errors.Update.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("participantUpdateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // hds 3
    let participant;
    dtoIn.awid = awid;
    try {
      participant = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof DuplicateKey) {
        // A5
        throw new Errors.Update.ParticipantNameNotUnique({ uuAppErrorMap }, { participantName: dtoIn.name });
      }
      if (e instanceof ObjectStoreError) {
        // A6
        throw new Errors.Update.ParticipantDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 4
    participant.uuAppErrorMap = uuAppErrorMap;
    return participant;
  }

  async delete(awid, dtoIn) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Delete.TravelInstanceDoesNotExist,
      Errors.Delete.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("participantDeleteDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // hds 3
    if (!dtoIn.forceDelete) {
      // hds 3.1
      let count;
      try {
        count = await this.tripDao.getCountByParticipantId(awid, dtoIn.id);
      } catch (e) {
        //  A5
        if (e instanceof ObjectStoreError) {
          throw new Errors.Delete.TripDaoGetCountByParticipantFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
      if (count !== 0) {
        // A6
        throw new Errors.Delete.RelatedTripsExist({ uuAppErrorMap }, { relatedTrips: count });
      }
    } else {
      // hds 3.2
      try {
        await this.tripDao.removeParticipant(awid, dtoIn.id);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          // A7
          throw new Errors.Delete.TripDaoRemoveParticipantFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }

    // hds 4
    await this.dao.delete(awid, dtoIn.id);

    // hds 5
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
    let validationResult = this.validator.validate("participantListDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // hds 2.4
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;

    // hds 3
    let list = await this.dao.list(awid, dtoIn.order, dtoIn.pageInfo);

    // hds 4
    list.uuAppErrorMap = uuAppErrorMap;
    return list;
  }
}

module.exports = new ParticipantAbl();
