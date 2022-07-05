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

  return (
    <div className="pt-16 grow bg-zinc-100">
      <div className="sm:mx-4 md:mx-8 w-100 mx-0">
        <h1 className="  text-red-800 font-bold text-center sm:text-left ml-6 text-2xl py-10  bg-transparent">
          Shopping Cart
        </h1>
        <div className="flex flex-col lg:flex-row">
          <div className=" border-t-2 border-zinc-800 bg-transparent lg:w-3/5 m-2">
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
    </div>
  );
};
