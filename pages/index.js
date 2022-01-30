import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ProductsList from "../components/product/products-list";
import React from "react";
import { MongoClient } from "mongodb";

/**
 * Products list page
 * @param props 
 * @returns 
 */
function ProductsListPage(props) {
  const { products } = props;

  return (
    <React.Fragment>
      <Head>
        <title>Products</title>
        <meta
          name="description"
          description="best products based on user ratings"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductsList products={products}></ProductsList>
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

  // load existing products from product db collection
  const productsCollections = db.collection("product");

  // load products new data to collection
  const products = await productsCollections.find().toArray();

  // close mongo client connection
  client.close();

  return {
    props: {
      products: products.map((product) => ({
        id: product._id.toString(),
        seller: product.seller,
        item: product.item,
        info: product.info,
      })),
    },
  };
}

export default ProductsListPage;
