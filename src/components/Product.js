import React from "react";
import { Link } from "react-router-dom";

export const Product = ({ products, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  return products.map(function (product, index) {
    const defaultOption = product.productOptions;

    const opt = defaultOption.find(
      (option) => option.productOptionId === product.defaultOption
    );

    const optionPrice = () => {
      if (opt === undefined) {
        return "1500".replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      } else {
        return opt.productOptionPrice
          .toString()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      }
    };

    const optionVolume = () => {
      if (opt === undefined) {
        return " ";
      } else {
        return opt.optionVolume;
      }
    };

    return (
      <div className=" justify-center h-max" key={index}>
        <div className="bg-white max-w-sm border-zinc-300 border-2">
          <a href="#!">
            <img
              className="rounded-t-lg"
              src={process.env.PUBLIC_URL + "/assets/" + product.productImage}
              alt=""
            />
          </a>
          <div className="p-6 col-span-1 flex flex-col">
            <h5 className="text-gray-900 text-sm md:text-base lg:text-lg font-semibold mb-2 h-14 md:h-20">
              {product.productName} - {optionVolume()}
            </h5>
            <p className="text-red-700 text-base font-medium mb-4">
              KES {optionPrice()}
            </p>
            <button
              // to={`/product/${product.productId}`}
              type="button"
              className=" inline-block px-6 py-2.5 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  });
};
