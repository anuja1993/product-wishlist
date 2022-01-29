import React from "react";
import ProductCard from "./product-card";
import { useState } from "react";

/**
 * Product list component
 */
function ProductsList(props) {
  const [state, setState] = useState([]);
  const { products } = props;

  async function productUpdateHandler(updatedProduct) {
    // update liked flag of updated product
    products.map((product) => {
      if (product.id === updatedProduct.id) {
        product.info.liked = !product.info.liked;
      }
    });

    // set updated product state
    setState({ products });

    // create PUT payload for API call
    const cloenedUpdatedProduct = { ...updatedProduct };
    delete cloenedUpdatedProduct["id"];
    const payload = { id: updatedProduct.id, data: cloenedUpdatedProduct };

    // trigger PUT API call for update exsisting product
    const response = await fetch("/api/products/" + updatedProduct.id, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <React.Fragment>
      <div className="py-4">
        <div className="px-4">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onLikedProduct={() => productUpdateHandler(product)}
                ></ProductCard>
              ))}
            </div>
          ) : (
            <h1 className="block">Nothing here... yet.</h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductsList;
