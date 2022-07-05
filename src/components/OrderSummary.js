import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import React from "react";

export const OrderSummary = ({
  totalPrice,
}) => {
  return (
    <div className="grid grid-cols-1 rounded-xl bg-zinc-200 lg:w-2/5 m-2 h-max">
      <div className="m-4 text-xl">
        <h1 className="font-bold">Order Summary</h1>
        <div className="grid grid-cols-2 p-4 border-b-2 border-zinc-400 ">
          <h1>Subtotal</h1>
          <h1 className="text-right pr-4 font-bold">
            KES{" "}
            {(totalPrice - totalPrice * 0.16)
              .toFixed(1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h1>
        </div>

        <div className="grid grid-cols-2 p-4 border-b-2 border-zinc-400 ">
          <div className="flex">
            <h1>Tax Estimate</h1>
            <QuestionMarkCircleIcon className=" h-6 w-6" />
          </div>
          <h1 className="text-right pr-4 font-bold">
            KES{" "}
            {(totalPrice * 0.16)
              .toFixed(1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h1>
        </div>
        <div className="grid grid-cols-2 p-4 ">
          <h1 className="font-bold">TOTAL: </h1>
          <h1 className="text-right pr-4 font-bold">
            KES {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h1>
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
