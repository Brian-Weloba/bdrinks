import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import React from "react";

export const OrderSummary = () => {
  return (
    <div className="grid grid-cols-1 rounded-xl bg-zinc-200 md:w-2/5 m-2 h-max">
      <div className="m-4 ">
        <h1 className="font-bold text-lg">Order Summary</h1>
        <div className="grid grid-cols-2 p-4 border-b-2 border-zinc-400 ">
          <h1>Subtotal</h1>
          <h1 className="text-right pr-4 font-bold">KES 5,000</h1>
        </div>
        <div className="grid grid-cols-2 p-4 border-b-2 border-zinc-400 ">
          <div className="flex">
            <h1>Shipping Estimate</h1>
            <div className=" h-6 w-6">
              <QuestionMarkCircleIcon />
            </div>
          </div>
          <h1 className="text-right pr-4 font-bold">KES 500</h1>
        </div>
        <div className="grid grid-cols-2 p-4 border-b-2 border-zinc-400 ">
          <div className="flex">
            <h1>Tax Estimate</h1>
            <QuestionMarkCircleIcon className=" h-6 w-6" />
          </div>
          <h1 className="text-right pr-4 font-bold">KES 500</h1>
        </div>
        <div className="grid grid-cols-2 p-4 ">
          <h1 className="font-bold">Subtotal</h1>
          <h1 className="text-right pr-4 font-bold">KES 5,000</h1>
        </div>
        <div className="grid grid-cols-1 m-4 ">
          <button className="bg-red-800 text-white font-bold py-2 px-4 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
