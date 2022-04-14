import React from "react";
import { PlaceholderImage } from "./PlaceholderImage";
import QuantitySelector from "./QuantitySelector";
import { ShoppingBagIcon, HeartIcon, XIcon } from "@heroicons/react/outline";

export const CartItem = () => {
  return (
    <div className=" h-max flex justify-between m-6 rounded-lg">
      <div className="flex">
        <div className=" w-24 sm:w-48 rounded-lg border-zinc-300 border-2">
          <a href="#!">
            <PlaceholderImage />
          </a>
        </div>
        <div className="flex flex-col">
          <div className=" pl-6 pt-6 col-span-1 flex flex-col">
            <h5 className="text-gray-900 text-sm md:text-sm lg:text-base font-semibold mb-2 ">
              productName
            </h5>
            <h5 className="text-gray-900 text-sm md:text-sm lg:text-base font-semibold mb-2 ">
              Volume
            </h5>
            <div className="text-sm md:text-base lg:text-base flex flex-col xl:flex-row justify-between">
              <p className="text-red-700 text-base font-medium mb-4 text-center">
                KES 5,000
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <QuantitySelector  />
      </div>
      <div className="pt-6">
        <XIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
