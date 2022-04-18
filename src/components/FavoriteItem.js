import React from "react";
import { PlaceholderImage } from "./PlaceholderImage";
import QuantitySelector from "./QuantitySelector";
import { ShoppingBagIcon, HeartIcon, XIcon } from "@heroicons/react/outline";

export const FavoriteItem = () => {
  return (
    <div className="justify-center h-max">
      <div className="bg-white max-w-sm border-zinc-300 border-2">
          <a href="#!">
            {/* <PlaceholderImage /> */}
            <img
              className=" rounded-lg"
              src={process.env.PUBLIC_URL + "/assets/gilbeys-gin.jpg"}
              alt=""
            />
          </a>
          <div className="p-6 col-span-1 flex flex-col">
            <h5 className="text-gray-900 text-sm md:text-sm lg:text-base font-semibold mb-2 h-14 md:h-20">
              {/* {product.productName} - {optionVolume()} */}
              Gilbey's Gin - 750ml
            </h5>
            <div className="text-sm md:text-base lg:text-base flex flex-col xl:flex-row justify-between">
              <p className="text-red-700 text-base font-medium mb-4 text-center">
                {/* KES {optionPrice()} */}
                KES 1,300
              </p>
              <div className="flex justify-evenly mb-4">
                <ShoppingBagIcon className="h-5 w-5 lg:h-6 lg:w-6 pr-1 lg:pr-0  text-zinc-800 sm:hover:text-red-800"></ShoppingBagIcon>
                <HeartIcon className="h-5 w-5 lg:h-6 pl-1 lg:w-6 lg:pl-0 text-zinc-800 sm:hover:text-red-800"></HeartIcon>
              </div>
            </div>
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
};
