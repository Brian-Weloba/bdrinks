import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import React from "react";

export const OrderSummary = ({ totalPrice, cartItems }) => {
  function whatsappCheckout() {
    let whatsappNumber = "254712000928";
    let message =
      "Hello *Berny's*,%0a%0a I would like to order the following items:%0a%0a";
    cartItems.forEach((item) => {
      let Subtotal = item.productPrice * item.quantity;
      message += `*${item.productName} ${item.productVolume}* x *${
        item.quantity
      }* = *KES ${Subtotal.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )}*%0a`;
    });
    message += `%0a*Total: KES ${totalPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*`;
    message += "%0a%0a Please deliver to: address.%0a%0a Thank you!";

    window.open(
      `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`,
      "_blank"
    );
  }

  return (
    <div className="grid grid-cols-1 rounded-xl bg-zinc-200 lg:w-2/5 m-2 h-max shadow-xl ">
      <div className="m-4 text-base">
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
          <button
            onClick={() => {
              whatsappCheckout();
            }}
            className="select-none inline-block px-6 py-3 sm:py-2 border-2 border-red-800 text-red-800 hover:text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-red-800  hover:shadow-lg   transition duration-150 ease-in-out text-base"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
