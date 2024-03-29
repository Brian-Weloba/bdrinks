import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "./Product";
import { useState, useEffect } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { RadioGroup } from "@headlessui/react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [defaultOptionId, setdefaultOptionId] = useState([]);
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState([]);
  const [cookies, setCookie] = useCookies("cartItems");

  const { productId } = useParams();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let prod = await axios.get(
        "https://bernyz.co.ke/api/products/" + productId
      );
      setProduct(prod.data);
      setProductOptions(prod.data.productOptions);
      let prodct = prod.data;
      let productOpts = prod.data.productOptions;
      setPrice(
        productOpts.find(
          (option) => option.productOptionId === prodct.defaultOption
        ).productOptionPrice
      );
      setVolume(
        productOpts.find(
          (option) => option.productOptionId === prodct.defaultOption
        ).optionVolume
      );
      setLoading(false);
    };
    fetchProducts();
  }, [productId]);

  // console.log(product);
  // console.log(productOptions);

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
  };

  if (loading) {
    return (
      <div className="h-2/3 flex justify-center col-span-full ">
        <div className="h-80 flex content-center flex-col">
          <div className="m-auto">
            <svg
              role="status"
              className="inline mx-auto mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-zinc-600 fill-red-800"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="text-zinc-800 font-bold text-lg mx-auto">LOADING</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" select-none  h-max w-ful pt-24 pb-16 sm:px-10 bg-zinc-200">
        <div className="flex flex-col rounded-lg md:flex-row px-auto shadow-lg  bg-zinc-100">
          <div className=" m-1 w-screen md:h-max md:my-auto">
            <img
              className="rounded-lg md:m-4 "
              src={process.env.PUBLIC_URL + "/assets/" + product.productImage}
              alt={product.productName}
            />
          </div>
          <div className="m-1 bg-zinc-100 p-2 w-full md:w-full">
            <div className="flex flex-col md:pr-4">
              <div className="flex flex-col md:flex-row justify-between mx-1 sm:mx-10">
                <h1 className="text-lg font-semibold sm:text-2xl mt-1 md:mt-4">
                  {product.productName}-{volume}
                </h1>
                <h1 className="text-xl sm:text-2xl font-semibold mt-1 md:ml-2 md:mt-4">
                  KES{" "}
                  {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                </h1>
              </div>
              <RadioGroup
                value={volume}
                onChange={handleVolumeChange}
                className="mt-4 mx-1 sm:mx-10"
              >
                <RadioGroup.Label className=" mb-2 text-lg">
                  Choose a size:
                </RadioGroup.Label>
                <div className="mt-1 grid grid-cols-4 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                  {productOptions.map((option) => (
                    <RadioGroup.Option
                      key={option.productOptionId}
                      value={option.productOptionId}
                      className={({ active }) =>
                        classNames(
                          "bg-white shadow-sm text-gray-900 cursor-pointer",
                          active ? "ring-2 ring-red-800" : "",
                          "group relative border rounded-md py-3 px-4 flex items-center justify-center text-base font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-4"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="p">
                            {option.optionVolume}
                          </RadioGroup.Label>
                          <div
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-red-800 "
                                : "border-transparent",
                              "absolute -inset-px rounded-md pointer-events-none"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <div className="flex flex-col m-2 mx-1 sm:mx-10">
                <div className=" mb-2 text-lg ">Quantity: </div>
                <div className="flex">
                  <MinusIcon
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      } else {
                        setQuantity(1);
                      }
                    }}
                    className="cursor-pointer px-2 h-7 text-red-800"
                  />
                  <div className="flex flex-col text-lg font-semibold rounded-md bg-white w-11 text-center select-none">
                    <p className="my-auto">{quantity}</p>
                  </div>
                  <PlusIcon
                    onClick={() => {
                      if (quantity < 20) {
                        setQuantity(quantity + 1);
                      } else {
                        setQuantity(20);
                      }
                    }}
                    className="cursor-pointer px-2 h-7 text-red-800"
                  />
                </div>
              </div>
              <div className="mt-4 mx-1 sm:mx-10">
                <h1 className="text-base font-semibold select-none">Description</h1>
                <p className="text-base select-none">
                  {product.productDescription}
                </p>
              </div>
              <div className="w-full flex justify-center md:justify-end">
                <button
                  onClick={() => {
                    handleAddToCart();
                    setQuantity(1);
                  }}
                  type="submit"
                  className="select-none inline-block px-6 py-3 sm:py-2 border-2 border-red-800 text-red-800 hover:text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-red-800  hover:shadow-lg   transition duration-150 ease-in-out text-base"                >
                  Add to Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
