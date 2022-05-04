import React from "react";
import QuantitySelector from "./QuantitySelector";
import { XIcon } from "@heroicons/react/outline";

export const CartItem = () => {
  return (
    <div className=" h-max flex justify-between p-2 sm:p-6 border-b-2 border-zinc-400">
      <div className="flex h-max">
        <div className=" w-28 sm:w-48 rounded-lg my-auto">
          <a href="#!">
            {/* <PlaceholderImage /> */}
            <img
              className=" rounded-lg"
              src={process.env.PUBLIC_URL + "/assets/gilbeys-gin.jpg"}
              alt=""
            />
          </a>
        </div>
        <div className="flex flex-col">
          <div className=" pl-6 sm:pt-6 col-span-1 flex flex-col">
            <h5 className="text-gray-900 text-base md:text-xl font-semibold mb-2 ">
              Gilbey's gin
            </h5>
            <h5 className="text-gray-900 text-base md:text-xl  mb-2 ">
              500ml
            </h5>
            <div className="flex flex-col xl:flex-row justify-between">
              <p className="text-base md:text-xl text-red-700 mb-2 sm:mb-4 font-bold">
                KES 1,300
              </p>
            </div>
          </div>
          <div className="sm:hidden pl-6">
            <QuantitySelector />
          </div>
        </div>
      </div>
      <div className="hidden sm:block pt-6">
        <QuantitySelector />
      </div>
      <div className="sm:pt-6">
        <XIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
