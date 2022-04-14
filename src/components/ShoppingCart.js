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

          <div className=" bg-sky-600 sm:w-2/5 m-2">
            <h1>Checkout</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
