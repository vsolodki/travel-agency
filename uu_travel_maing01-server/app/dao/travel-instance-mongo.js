"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TravelInstanceMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async create(travelInstance) {
    return await super.insertOne(travelInstance);
  }

  async getByAwid(awid) {
    return await super.findOne({ awid });
  }

  async updateByAwid(travelInstance) {
    return await super.findOneAndUpdate({ awid: travelInstance.awid }, travelInstance, "NONE");
  }
}

module.exports = TravelInstanceMongo;
