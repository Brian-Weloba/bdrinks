import React from "react";
import { RadioGroup } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export default function CartModal({ setIsOpen, selectedProduct }) {
  const [quantity, setQuantity] = useState(1);
  const product = selectedProduct;
  const productOptions = product.productOptions;
  const defaultPrice = productOptions.find(
    (option) => option.productOptionId === product.defaultOption
  ).productOptionPrice;
  const defaultVolume = productOptions.find(
    (option) => option.productOptionId === product.defaultOption
  ).optionVolume;
  const [price, setPrice] = useState(defaultPrice);
  const [volume, setVolume] = useState(defaultVolume);
  const [total, setTotal] = useState(price);
  const [cookies, setCookie] = useCookies(["cartItems"]);

  function getTotalPrice(quantity, price) {
    let totalPrice = quantity * price;
    setTotal(totalPrice);
    return totalPrice;
  }

  const handleAddToCart = () => {
    // if cartItems doesnt exist
    if (
      cookies.cartItems === undefined ||
      cookies.cartItems === null ||
      cookies.cartItems.length === 0
    ) {
      // set a new cookie
      setCookie(
        "cartItems",
        [
          {
            productId: product.productId,
            productName: product.productName,
            productImage: product.productImage,
            productPrice: price,
            productVolume: volume,
            quantity: quantity,
          },
        ],
        { path: "/" }
      );
    } else {
      // if cartItems exists check if product already exists
      let cartItems = cookies.cartItems;
      let newCartItem = cartItems.find(
        (item) => item.productId === product.productId
      );

      //if the product does not exist in the cart add it to cart.
      if (newCartItem === undefined || newCartItem === null) {
        cartItems.push({
          productId: product.productId,
          productName: product.productName,
          productImage: product.productImage,
          productPrice: price,
          productVolume: volume,
          quantity: quantity,
        });
      } else {
        //if product exists check all the products in the cart with the same productId
        let cartItemsWithSameProductId = cartItems.filter(
          (item) => item.productId === product.productId
        );
        //if there is only one product in the cart with the same productId
        if (cartItemsWithSameProductId.length === 1) {
          //check if the volume is the same
          if (cartItemsWithSameProductId[0].productVolume === volume) {
          newCartItem.quantity += quantity;
          }
          //if the volume is different
          else {
            //add new product to cart
            cartItems.push({
              productId: product.productId,
              productName: product.productName,
              productImage: product.productImage,
              productPrice: price,
              productVolume: volume,
              quantity: quantity,
            });
          }
        } else {
          //if there are more than one product with the same productId check if the new product volume is the same as the existing product volume
          let productWithSameVolume = cartItemsWithSameProductId.find(
            (item) => item.productVolume === volume
          );
          //if the product volume is the same as the existing product volume
          if (productWithSameVolume !== undefined) {
            //add the new quantity to the existing product
            productWithSameVolume.quantity += quantity;
          } else {
            //if the product volume is different add the new product to the cart
            cartItems.push({
              productId: product.productId,
              productName: product.productName,
              productImage: product.productImage,
              productPrice: price,
              productVolume: volume,
              quantity: quantity,
            });
          }
        }
      }
      setCookie("cartItems", cartItems, { path: "/" });
    }
    setIsOpen(false);
    toast.success("Added to Cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleVolumeChange = (value) => {
    //get value from radio group
    let selectedOption = value;
    console.log("Selected Option: " + selectedOption);
    //get the price of the selected option
    let selectedOptionPrice = productOptions.find(
      (option) => option.productOptionId === selectedOption
    ).productOptionPrice;
    //get the volume of the selected option
    let selectedOptionVolume = productOptions.find(
      (option) => option.productOptionId === selectedOption
    ).optionVolume;
    //set the price and volume
    setPrice(selectedOptionPrice);
    setVolume(selectedOptionVolume);
    getTotalPrice(quantity, selectedOptionPrice);
  };

  return (
    //modal background div with blurry effect
    <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center  bg-gray-900 bg-opacity-20">
      <div className="max-w-lg w-full bg-zinc-100 rounded-lg shadow-xl overflow-y-auto ">
        <div className=" flex justify-between p-3">
          <h3 className="text-base leading-6 font-bold text-gray-900 select-none">
            Add to Cart
          </h3>
          <div className="flex items-center justify-end">
            <button
              className="text-gray-500 hover:text-gray-400 focus:outline-none focus:text-gray-400 transition duration-150 ease-in-out"
              aria-label="Close"
              onClick={() => {
                console.log("clicked");
                setIsOpen(false);
              }}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col ml-4 p-3">
          <div className="flex flex-col">
            <h1 className="text-base font-medium">
              {product.productName} - {volume} @ KSH{" "}
              {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
            </h1>
            <RadioGroup
              value={volume}
              onChange={handleVolumeChange}
              className="mt-4 mx-2 sm:mx-4"
            >
              <RadioGroup.Label className=" mb-2 text-base select-none">
                Choose a size:
              </RadioGroup.Label>
              <div className="mt-1 grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {productOptions.map((option) => (
                  <RadioGroup.Option
                    key={option.productOptionId}
                    value={option.productOptionId}
                    className={({ active }) =>
                      classNames(
                        "bg-white shadow-sm text-gray-900 cursor-pointer",
                        active ? "ring-2 ring-red-800" : "",
                        "group relative border rounded-md py-3 px-6 flex items-center justify-center text-base font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-4"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label className=" px-4" as="p">
                          {option.optionVolume}
                        </RadioGroup.Label>
                        <div
                          className={classNames(
                            active ? "border" : "border-2",
                            checked ? "border-red-800 " : "border-transparent",
                            "absolute rounded-md pointer-events-none"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            <div className="flex flex-col mt-4 mx-1 sm:mx-4">
              <div className=" mb-2 text-base select-none">Quantity: </div>
              <div className="flex">
                <MinusIcon
                  onClick={() => {
                    if (quantity > 1) {
                      let newQuantity = quantity - 1;
                      setQuantity(newQuantity);
                      getTotalPrice(newQuantity, price);
                    }
                  }}
                  className="cursor-pointer px-2 h-5 text-red-800"
                />
                <div className="flex flex-col text-base font-semibold rounded-md bg-white w-11 text-center select-none">
                  <p className="my-auto">{quantity}</p>
                </div>
                <PlusIcon
                  onClick={() => {
                    let newQuantity = quantity + 1;
                    setQuantity(newQuantity);
                    getTotalPrice(newQuantity, price);
                  }}
                  className="cursor-pointer px-2 h-5 text-red-800"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" border-t-2 border-zinc-400 flex flex-col sm:flex-row py-4 mx-4 justify-between align-middle text-center">
          <div className=" self-center mb-3 sm:mb-0">
            <h1 className="text-base font-bold select-none">
              TOTAL:{" "}
              <span className="text-red-800">
                KSH{" "}
                {total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
              </span>
            </h1>
          </div>
          <div>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              type="button"
              className="select-none inline-block px-6 py-3 sm:py-2 border-2 border-red-800 text-red-800 hover:text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-red-800  hover:shadow-lg   transition duration-150 ease-in-out text-base"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
