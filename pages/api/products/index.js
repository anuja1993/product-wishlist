import database from "../../../middleware/database";

export async function handler(req, res) {

  // load db from mongo clinet
  const db = database.getConnection();

  // load existing data from db collection(db table)
  const productsCollections = db.collection("product");

  // load products list from collection
  const products = await productsCollections.find().toArray();

  // close mongo client connection
  client.close();

  // return response with sucess status and json body
  res.status(200).json({
    message: "Products loaded succesfully",
    data: products,
  });
}

export default handler;
