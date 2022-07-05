import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function CartItem({
  totalPrice,
  setTotalPrice,
  cartItems,
  setCartItems,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["cartItems"]);

  function handleRemoveItem(item) {
    let newCartItems = cartItems.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    setCartItems(newCartItems);
    removeCookie("cartItems");
    setCookie("cartItems", newCartItems, { path: "/" });
  }

  function handleQuantityChange(item, newQuantity) {
    //update the cookie with the new quantity if the volume of the product matched the volume of the cookie and its ID
    let cartItems = cookies.cartItems;
    //get the cart item with the same volume and productId
    let cartItem = cartItems.find(
      (cartItem) =>
        cartItem.productId === item.productId && cartItem.volume === item.volume
    );
    //update the quantity
    cartItem.quantity = newQuantity;
    //update the cookie
    setCookie("cartItems", cartItems, { path: "/" });
    //update the cartItems state
    setCartItems(cartItems);
  }

  return cartItems.map(function (product, index) {
    return (
      <CartProduct
        handleQuantityChange={handleQuantityChange}
        handleRemoveItem={handleRemoveItem}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        product={product}
        key={index}
      />
    );
  });
}

const CartProduct = ({
  handleQuantityChange,
  product,
  handleRemoveItem,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [price] = useState(product.productPrice);
  const [subTotal, setSubTotal] = useState(
    product.productPrice * product.quantity
  );

  const [cookies, setCookie, removeCookie] = useCookies(["cartItems"]);

  return (
    <div className="cart-item">
      <div className=" h-max flex justify-between p-2 sm:p-6 border-b-2 border-zinc-400">
        <div className="flex h-max">
          <div className=" w-28 sm:w-48 rounded-lg my-auto">
            <a href="#!">
              {/* <PlaceholderImage /> */}
              <img
                className=" rounded-lg"
                src={process.env.PUBLIC_URL + "/assets/" + product.productImage}
                alt=""
              />
            </a>
          </div>
          <div className="flex flex-col">
            <div className=" pl-6 sm:pt-6 col-span-1 flex flex-col">
              <h5 className="text-gray-900 text-base md:text-xl font-semibold mb-2 ">
                {product.productName}
              </h5>
              <h5 className="text-gray-900 text-base md:text-xl  mb-2 ">
                {product.productVolume}
              </h5>
              <div className="flex flex-col xl:flex-row justify-between">
                <p className="text-base md:text-xl text-red-700 mb-2 sm:mb-4 font-bold">
                  KES{" "}
                  {subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-4 mx-1 sm:mx-4">
              <div className=" mb-2 text-lg select-none">Quantity: </div>
              <div className="flex">
                <MinusIcon
                  onClick={() => {
                    if (quantity > 1) {
                      let newQuantity = quantity - 1;
                      setQuantity(newQuantity);
                      setSubTotal(price * newQuantity);
                      handleQuantityChange(product, newQuantity);
                    }
                  }}
                  className="cursor-pointer px-2 h-7 text-red-800"
                />
                <div className="flex flex-col text-xl font-semibold rounded-md bg-white w-11 text-center select-none">
                  <p className="my-auto">{quantity}</p>
                </div>
                <PlusIcon
                  onClick={() => {
                    let newQuantity = quantity + 1;
                    setQuantity(newQuantity);
                    setSubTotal(price * newQuantity);
                    handleQuantityChange(product, newQuantity);
                  }}
                  className="cursor-pointer px-2 h-7 text-red-800"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sm:pt-6">
          <XIcon
            onClick={() => {
              handleRemoveItem(product);
            }}
            className="h-5 w-5"
          />
        </div>
      </div>
    </div>
  );
};
