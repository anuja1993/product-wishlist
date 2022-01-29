import { MongoClient, ObjectId } from "mongodb";
import database from "../../../middleware/database";

export async function handler(req, res) {
  const productPayload = req.body;

  // generate mongo db connection url
  const connectionUrl = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.1waph.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  // connect to mongo db data base
  const client = await MongoClient.connect(connectionUrl);

  // load db from mongo clinet
  const db = client.db();
  // const db = database.getConnection();

  // load existing data from db collection(db table)
  const productsCollections = db.collection("product");

  // update product data to collection
  const result = await productsCollections.findOneAndUpdate(
    { _id: ObjectId(productPayload.id) },
    { $set: productPayload.data },
    { upsert: true }
  );

  // close mongo client connection
  client.close();

  // return response with sucess status and json body
  res.status(200).json({
    message: "Product updated succesfully",
    data: result.value,
  });
}

export default handler;
