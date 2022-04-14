import React from "react";

import { CartItem } from "./CartItem";

export const ShoppingCart = () => {
  return (
    <div className="pt-16 grow bg-zinc-300">
      <div className="sm:mx-4 md:mx-8 w-100 mx-0">
        <h1 className="  text-red-800 font-bold text-4xl py-10  bg-transparent">
          Shopping Cart
        </h1>
        <div className="flex flex-col sm:flex-row">
          <div className=" border-t-2 border-zinc-800 bg-transparent sm:w-3/5 m-2">
            <div className="grid grid-cols-1">
              <div className=" justify-center h-max">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
              </div>
            </div>
          </div>

          {/* <div className=" bg-sky-600 sm:w-2/5 m-2"> */}
          <div className="grid grid-cols-1 rounded-xl bg-zinc-200 sm:w-2/5 m-2 h-max">
            <div className="m-4">
              <h1>Order Summary</h1>
              <div className="grid grid-cols-2 p-4 border-b-2 border-zinc-400 ">
                <h1>Subtotal</h1>
                <h1 className="text-right pr-4">KES 5,000</h1>
              </div>
              <div className="grid grid-cols-2 p-4 border-b-2 border-zinc-400 ">
                <h1>Shipping Estimate</h1>
                <h1 className="text-right pr-4">KES 500</h1>
              </div>
              <div className="grid grid-cols-2 p-4 border-b-2 border-zinc-400 ">
                <h1>Tax Estimate</h1>
                <h1 className="text-right pr-4">KES 500</h1>
              </div>
              <div className="grid grid-cols-2 p-4 ">
                <h1>Subtotal</h1>
                <h1 className="text-right pr-4">KES 5,000</h1>
              </div>
              <div className="grid grid-cols-1 m-4 ">
                <button className="bg-red-800 text-white font-bold py-2 px-4 rounded-lg">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
