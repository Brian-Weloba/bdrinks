import React from "react";
import CartItem from "./CartItem";
import { OrderSummary } from "./OrderSummary";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

export const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cookies] = useCookies(["cartItems"]);
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice());
  const [tax, setTax] = useState(totalPrice * 0.16);

  useEffect(() => {
    if (cookies.cartItems) {
      setCartItems(cookies.cartItems);
      let cartTotal = cartItems.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0
      );
      setTotalPrice(cartTotal);
    }
  }, [cartItems]);

  function calculateTotalPrice() {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.productPrice * item.quantity;
    });
    return total;
  }

  //if cart is empty, display message
  if (cartItems.length === 0) {
    return (
      <div className=" pt-28 h-2/3 flex justify-center col-span-full ">
        <h1>
          Your cart is empty. <br />
          <span className="text-red-700">
            <a href="/">
              <span className="text-red-700">
                <u>Click here</u>
              </span>
            </a>
          </span>{" "}
          to continue shopping.
        </h1>
      </div>
    );
  } else {
    return (
      <div className="sm:px-4 md:px-8 pt-24 grow bg-zinc-200">
        <h1 className="  text-white font-bold text-center sm:text-left px-6 py-2 text-2xl  bg-red-800 rounded-lg shadow-lg ">
            Shopping Cart
          </h1>
          <div className="flex p-4 flex-col lg:flex-row">
            <div className="  bg-zinc-100 p-2 rounded-lg lg:w-3/5 m-2">
              <div className="grid grid-cols-1">
                <div className=" justify-center h-max">
                  <CartItem
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    calculateTotalPrice={calculateTotalPrice}
                  />
                </div>
              </div>
            </div>

            {/* <div className=" bg-sky-600 sm:w-2/5 m-2"> */}
            <OrderSummary
              tax={tax}
              setTax={setTax}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              cartItems={cartItems}
            />
          </div>
      </div>
    );
  }
};
