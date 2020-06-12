"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError, DuplicateKey } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const TravelInstanceAbl = require("./travel-instance-abl");
const Errors = require("../api/errors/location-error");
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

class LocationAbl {
  constructor() {
    this.validator = new Validator(Path.join(__dirname, "..", "api", "validation_types", "location-types.js"));
    this.dao = DaoFactory.getDao("location");
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
    let validationResult = this.validator.validate("locationCreateDtoInType", dtoIn);
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
    let location;
    try {
      location = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof DuplicateKey) {
        // A5
        throw new Errors.Create.LocationNameNotUnique({ uuAppErrorMap }, { locationName: dtoIn.name });
      }
      if (e instanceof ObjectStoreError) {
        // A6
        throw new Errors.Create.LocationDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 4
    location.uuAppErrorMap = uuAppErrorMap;
    return location;
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
    let validationResult = this.validator.validate("locationGetDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // hds 3
    let location;
    if (dtoIn.id) {
      location = await this.dao.get(awid, dtoIn.id);
    } else {
      location = await this.dao.getByName(awid, dtoIn.name);
    }
    // A6
    if (!location) {
      let paramMap = {};
      if (dtoIn.id) paramMap.locationId = dtoIn.id;
      if (dtoIn.name) paramMap.locationName = dtoIn.name;
      throw new Errors.Get.LocationDoesNotExist({ uuAppErrorMap }, paramMap);
    }

    // hds 4
    location.uuAppErrorMap = uuAppErrorMap;
    return location;
  }

  async update(awid, dtoIn) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Update.TravelInstanceDoesNotExist,
      Errors.Update.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("locationUpdateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // hds 3
    let location;
    dtoIn.awid = awid;
    try {
      location = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof DuplicateKey) {
        // A5
        throw new Errors.Update.LocationNameNotUnique({ uuAppErrorMap }, { locationName: dtoIn.name });
      }
      if (e instanceof ObjectStoreError) {
        // A6
        throw new Errors.Update.LocationDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 4
    location.uuAppErrorMap = uuAppErrorMap;
    return location;
  }

  async delete(awid, dtoIn) {
    // hds 1, A1, hds 1.1, A2
    await TravelInstanceAbl.checkInstance(
      awid,
      Errors.Delete.TravelInstanceDoesNotExist,
      Errors.Delete.TravelInstanceNotInProperState
    );

    // hds 2, 2.1
    let validationResult = this.validator.validate("locationDeleteDtoInType", dtoIn);
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
        count = await this.tripDao.getCountByLocationId(awid, dtoIn.id);
      } catch (e) {
        //  A5
        if (e instanceof ObjectStoreError) {
          throw new Errors.Delete.TripDaoGetCountByLocationFailed({ uuAppErrorMap }, e);
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
        await this.tripDao.removeLocation(awid, dtoIn.id);
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          // A7
          throw new Errors.Delete.TripDaoRemoveLocationFailed({ uuAppErrorMap }, e);
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
    let validationResult = this.validator.validate("locationListDtoInType", dtoIn);
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

module.exports = new LocationAbl();
