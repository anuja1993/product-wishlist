import { MongoClient } from "mongodb";

/**
 * databes handler
 */
function database() {

  /**
   * 
   * @returns mongo db client db
   */
  async function getConnection() {
    // generate mongo db connection url
    const connectionUrl = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.1waph.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    // connect to mongo db data base
    const client = await MongoClient.connect(connectionUrl);

    // load db from mongo clinet
    const db = client.db();

    return db;
  }
}

export default database;
