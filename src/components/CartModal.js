import React from "react";
import { RadioGroup } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useState } from "react";

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

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  function getTotalPrice(quantity, price) {
    let totalPrice = quantity * price;
    setTotal(totalPrice);
    return totalPrice;
  }

  const handleAddToCart = () => {
    console.log("Added to cart");
    setIsOpen(false);
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
    <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center  bg-gray-900 bg-opacity-50">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-y-auto">
        <div className=" flex justify-between border-b-2 border-red-800 p-3">
          <h3 className="text-lg leading-6 font-semibold text-gray-900">
            ADD TO CART
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
            <h1 className="text-lg font-medium">{product.productName} - {volume} @ KSH {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</h1>
            <RadioGroup
              value={volume}
              onChange={handleVolumeChange}
              className="mt-4 mx-2 sm:mx-4"
            >
              <RadioGroup.Label className=" mb-2 text-lg">
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
              <div className=" mb-2 text-lg ">Quantity: </div>
              <div className="flex">
                <MinusIcon
                  onClick={() => {
                    if (quantity > 1) {
                      let newQuantity = quantity - 1;
                      setQuantity(newQuantity);
                      getTotalPrice(newQuantity, price);
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
                    getTotalPrice(newQuantity, price);
                  }}
                  className="cursor-pointer px-2 h-7 text-red-800"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" border-t-2 border-red-800 flex flex-col sm:flex-row py-4 mx-4 justify-between align-middle text-center">
          <div className=" self-center mb-3 sm:mb-0">
            <h1 className="text-lg font-bold select-none">
              Total:{" "}
              <span className="text-red-800">
                KSH{" "}
                {total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
              </span>
            </h1>
          </div>
          <div>
            <Link
              className=" flex flex-col"
              to={
                {
                  // pathname: `/product/${product.productId}`,
                }
              }
            >
              <button
                // to={`/product/${product.productId}`}
                type="button"
                className="select-none inline-block px-6 py-3 sm:py-2 border-2 border-red-800 text-red-800 hover:text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-red-800  hover:shadow-lg   transition duration-150 ease-in-out text-base md:text-lg"
              >
                Add to cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
