"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");
const { DbConnection } = require("uu_appg01_datastore");

class TripMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, participantList: 1 });
    await super.createIndex({ awid: 1, locationList: 1 });
  }

  async create(uuObject) {
    if (uuObject.participantList) {
      uuObject.participantList = uuObject.participantList.map(participantId => new ObjectId(participantId));
    } else if (uuObject.locationList) {
      uuObject.locationList = uuObject.locationList.map(locationId => new ObjectId(locationId));
    }
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async getCountByParticipantId(awid, participantId) {
    return await super.count({
      awid,
      participantList: ObjectId.isValid(participantId) ? new ObjectId(participantId) : participantId
    });
  }
  async getCountByLocationId(awid, locationId) {
    return await super.count({
      awid,
      locationList: ObjectId.isValid(locationId) ? new ObjectId(locationId) : locationId
    });
  }

  async update(uuObject) {
    if (uuObject.participantList) {
      uuObject.participantList = uuObject.participantList.map(participantId => new ObjectId(participantId));
    } else if (uuObject.locationList) {
      uuObject.locationList = uuObject.locationList.map(locationId => new ObjectId(locationId));
    }
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async updateVisibility(awid, id, visibility) {
    return await this.update({ awid, id, visibility });
  }

  async removeParticipant(awid, participantId) {
    let db = await DbConnection.get(this.customUri);
    await db
      .collection(this.collectionName)
      .updateMany(
        { awid },
        { $pull: { participantList: ObjectId.isValid(participantId) ? new ObjectId(participantId) : participantId } }
      );
  }
  async removeLocation(awid, locationId) {
    let db = await DbConnection.get(this.customUri);
    await db
      .collection(this.collectionName)
      .updateMany(
        { awid },
        { $pull: { locationList: ObjectId.isValid(locationId) ? new ObjectId(locationId) : locationId } }
      );
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }

  async list(awid, sortBy, order, pageInfo) {
    let sort = {
      [sortBy]: order === "asc" ? 1 : -1
    };
    return await super.find({ awid }, pageInfo, sort);
  }

  async listByParticipantIdList(awid, participantIdList, sortBy, order, pageInfo) {
    let sort = {
      [sortBy]: order === "asc" ? 1 : -1
    };
    return await super.find(
      {
        awid,
        participantList: {
          $in: participantIdList.map(id => {
            if (!ObjectId.isValid(id)) return id;
            return new ObjectId(id);
          })
        }
      },
      pageInfo,
      sort
    );
  }
  async listByLocationIdList(awid, locationIdList, sortBy, order, pageInfo) {
    let sort = {
      [sortBy]: order === "asc" ? 1 : -1
    };
    return await super.find(
      {
        awid,
        locationList: {
          $in: locationIdList.map(id => {
            if (!ObjectId.isValid(id)) return id;
            return new ObjectId(id);
          })
        }
      },
      pageInfo,
      sort
    );
  }
}

module.exports = TripMongo;
