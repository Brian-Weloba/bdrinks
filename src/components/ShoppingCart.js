import React from "react";
import { PlaceholderImage } from "./PlaceholderImage";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/outline";

export const ShoppingCart = () => {
  return (
    <div className="pt-16 grow h-2/3 bg-zinc-300">
      <div className="sm:mx-4 md:mx-8 w-100 mx-0">
        <h1 className="  text-red-800 font-bold text-4xl py-10  bg-zinc-300">
          Shopping Cart
        </h1>
        <div className="flex flex-col sm:flex-row">
          <div className=" border-t-2 border-zinc-800 bg-amber-300 sm:w-3/5 m-2">
            <h1>Cart Items</h1>
            <div className=" justify-center h-max">
              <div className="bg-white max-w-sm border-zinc-300 border-2">
                <a href="#!">
                  <PlaceholderImage />
                </a>

                <div className="p-6 col-span-1 flex flex-col">
                  <h5 className="text-gray-900 text-sm md:text-sm lg:text-base font-semibold mb-2 h-14 md:h-20">
                    productName - Volume
                  </h5>
                  <div className="text-sm md:text-base lg:text-base flex flex-col xl:flex-row justify-between">
                    <p className="text-red-700 text-base font-medium mb-4 text-center">
                      KES 5,000
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
          </div>
          <div className=" bg-sky-600 sm:w-2/5 m-2">
            <h1>Checkout</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
