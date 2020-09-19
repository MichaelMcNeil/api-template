const { MongoClient } = require("mongodb");

class Mongo {
  #client;
  #db;
  #uri;

  init = async (uri) => {
    this.#uri = uri;
    this.#client = new MongoClient(this.#uri, {
      useUnifiedTopology: true,
    });

    await this.#client.connect();
    console.log("Connected to Mongo Cluster...");
    this.#db = this.#client.db();
    return new Promise((res) => res());
  };

  get db() {
    if (!this.#db) throw "Mongo must complete INIT before db is accessible";
    return this.#db;
  }
}

module.exports = new Mongo();
