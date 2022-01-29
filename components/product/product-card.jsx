import React, { Component } from "react";
import { HeartIcon } from "@heroicons/react/outline";

/**
 * Product card component
 */
class ProductCard extends Component {
  state = {};
  render() {
    const { product, onLikedProduct } = this.props;
    return (
      <React.Fragment>
        <div className="bg-white rounded-lg overflow-hidden shadow relative">
          <div className="w-full flex justify-between p-3">
            <div className="flex">
              <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
                <img src={product.seller.image} alt="profilepic" />
              </div>
              <span className="pt-1 ml-2 font-bold text-sm">
                {product.seller.name}
              </span>
            </div>
            <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
              <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
            </span>
          </div>

          <div className="container">
            <img
              className="h-56 w-full object-cover object-center"
              src={product.item.image}
              alt=""
            />
            <button
              onClick={() => onLikedProduct(product)}
              className="absolute bottom-3/4 left-3/4 rounded-lg p-3 bg-white focus:outline-none"
            >
              <HeartIcon
                className={
                  product.info.liked
                    ? "fill-current h-6 w-6 text-red-600 hover:text-red-800"
                    : "h-6 w-6 text-red-600 hover:text-red-800"
                }
                aria-hidden="true"
              ></HeartIcon>
            </button>
          </div>

          <div className="relative px-4">
            <div className="flex justify-between">
              <span className="block font-normal text-l">
                {product.item.name}
              </span>
              <span className="block bg-white rounded-full text-xs font-bold px-3 py-2 leading-none flex items-center">
                <span className="px-1 text-blue-800">
                  {product.item.currency}
                </span>
                <span className="text-orange-500 ">{product.item.price}</span>
              </span>
            </div>
            <span className="block flex text-xs text-blue-500 hover:text-blue-600 font-semibold opacity-75 -mb-1">
              <HeartIcon
                className="fill-current h-5 w-5"
                aria-hidden="true"
              ></HeartIcon>
              <span className="pl-2 text-center">
                {product.info.likesCount} likes
              </span>
            </span>
          </div>
          <div className="p-4 h-auto md:h-35 lg:h-38">
            <div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm truncate">
              {product.item.description}
            </div>
            <div className="relative mt-2 mb-4 lg:block">
              {product.info.tags.map((tag, tagId) => (
                <a
                  key={tagId}
                  className="inline bg-gray-300 py-1 px-2 pb-1 rounded-full text-xs lowercase text-gray-700"
                  href="#"
                >
                  {tag}
                </a>
              ))}
            </div>
            <div className="block bottom-0 opacity-50 text-sm -mb-1">
              View {product.info.comments.length} comments
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductCard;
