import Head from "next/head";
import ProductsList from "../../components/product/products-list";
import React from "react";
import { MongoClient } from "mongodb";

function FavouriteListPage(props) {
  const { wishedProducts } = props;

  return (
    <React.Fragment>
      <Head>
        <title>Favourite</title>
        <meta
          name="description"
          description="best wishedProducts based on user ratings"
        ></meta>
      </Head>
      <ProductsList products={wishedProducts}></ProductsList>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  // generate mongo db connection url
  const connectionUrl = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.1waph.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  // connect to mongo db data base
  const client = await MongoClient.connect(connectionUrl);

  // load db from mongo clinet
  const db = client.db();

  // load existing data from db collection(db table)
  const wishedProductCollection = db.collection("product");

  // insert new data to collection
  const wishedProducts = await wishedProductCollection
    .find({
      "info.liked": true,
    })
    .toArray();

  // close mongo client connection
  client.close();

  return {
    props: {
      wishedProducts: wishedProducts.map((product) => ({
        id: product._id.toString(),
        seller: product.seller,
        item: product.item,
        info: product.info,
      })),
    },
  };
}

export default FavouriteListPage;
