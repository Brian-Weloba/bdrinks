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
      <div className=" h-max flex justify-between p-2  bg-zinc-100 mb-2 shadow-lg rounded-lg">
        <div className="flex flex-col sm:flex-row h-max">
          <div className=" w-full sm:w-36 relative rounded-lg my-auto ">
            <a href="#!">
              {/* <PlaceholderImage /> */}
              <img
                className=" rounded-lg"
                src={process.env.PUBLIC_URL + "/assets/" + product.productImage}
                alt=""
              />
            </a>
            <span className="absolute top-4 right-4 block sm:hidden">
            <XIcon
            onClick={() => {
              handleRemoveItem(product);
            }}
            className="h-5 w-5 cursor-pointer"
          />
            </span>
          </div>
          <div className="flex flex-col relative">
            <div className=" pl-6 col-span-1 flex flex-col">
              <h5 className="text-gray-900 text-base  font-semibold  ">
                {product.productName}
              </h5>
              <h5 className="text-gray-900 text-base    ">
                {product.productVolume}
              </h5>
              <div className="flex flex-col xl:flex-row justify-between">
                <p className="text-base  text-red-700 font-bold">
                  KES{" "}
                  {subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
            </div>

            <div className="flex flex-col pl-6">
              <div className=" mb-2 text-base select-none">Quantity: </div>
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
                  className="cursor-pointer my-auto px-2 h-5 text-red-800"
                />
                <div className="flex flex-col text-xl font-semibold my-auto rounded-md bg-white w-11 text-center select-none">
                  <p className="my-auto">{quantity}</p>
                </div>
                <PlusIcon
                  onClick={() => {
                    let newQuantity = quantity + 1;
                    setQuantity(newQuantity);
                    setSubTotal(price * newQuantity);
                    handleQuantityChange(product, newQuantity);
                  }}
                  className="cursor-pointer my-auto px-2 h-5 text-red-800"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <XIcon
            onClick={() => {
              handleRemoveItem(product);
            }}
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
