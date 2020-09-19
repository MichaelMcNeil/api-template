const mongo = require("./mongo");

class Users {
  get _collection() {
    return mongo.db.collection("user");
  }

  async add(user) {
    const result = await this._collection.insertOne(user);
    return this.getByEmail(user.email);
  }

  update(_id, updates) {
    return this._collection.updateOne(
      { _id },
      {
        $set: updates,
      },
      { upsert: true }
    );
  }

  getByEmail(email) {
    return this._collection.findOne({ email });
  }

  registerForPushNotifications(_id, expoPushToken) {
    return this._collection.updateOne(
      { _id },
      { $set: { expoPushToken } },
      { upsert: true }
    );
  }

  updateLocation(_id, { lat, lon, timestamp }) {
    return this._collection.updateOne(
      { _id },
      {
        $set: {
          "location.lat": lat,
          "location.lon": lon,
          "location.timestamp": timestamp,
        },
      },
      { upsert: true }
    );
  }

  updateLocationSharing(_id, { isSharing }) {
    return this._collection.updateOne(
      { _id: _id },
      { $set: { "location.isSharing": isSharing } },
      { upsert: true }
    );
  }

  confirmEmail(token) {
    return this._collection.updateOne(
      { emailVerificationToken: token },
      [
        { $set: { has_verified_email: true } },
        { $unset: ["emailVerificationToken"] },
      ],
      { upsert: true }
    );
  }

  confirmGoogleSync(_id) {
    return this._collection.updateOne(
      { _id: _id },
      { $set: { has_synced_google: true } },
      { upsert: true }
    );
  }
}

module.exports = new Users();
