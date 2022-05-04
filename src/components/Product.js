import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { PlaceholderImage } from "./PlaceholderImage";

export const Product = ({ products, loading }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const imageStyle = !imageLoaded ? { display: "none" } : {};
  const [show, setShow] = React.useState((state) => !state, true);

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
    return products.map(function (product, index) {
      const defaultOption = product.productOptions;

      const opt = defaultOption.find(
        (option) => option.productOptionId === product.defaultOption
      );

      const optionPrice = () => {
        if (opt === undefined) {
          return "1500".replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        } else {
          return opt.productOptionPrice
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
      };

      const optionVolume = () => {
        if (opt === undefined) {
          return " ";
        } else {
          return opt.optionVolume;
        }
      };

      return (
        <div className=" justify-center h-max" key={index}>
          <div className="bg-white max-w-sm border-zinc-300 border-2">
            <Suspense fallback={<PlaceholderImage />}>
              <a href="#!">
                {!imageLoaded && <PlaceholderImage />}
                <img
                  className="rounded-t-lg"
                  style={imageStyle}
                  onLoad={() => setImageLoaded(true)}
                  src={
                    process.env.PUBLIC_URL + "/assets/" + product.productImage
                  }
                  alt={product.productName}
                />
              </a>
            </Suspense>

            <div className="p-6 col-span-1 flex flex-col">
              <h5 className="text-gray-900 text-sm md:text-sm lg:text-base font-semibold mb-2 h-14 md:h-20">
                {product.productName} - {optionVolume()}
              </h5>
              <div className="text-sm md:text-base lg:text-base flex flex-col xl:flex-row justify-between">
                <p className="text-red-700 text-base font-medium mb-4 text-center">
                  KES {optionPrice()}
                </p>
                <div className="flex justify-evenly mb-4">
                  <ShoppingBagIcon className="h-5 w-5 lg:h-6 lg:w-6 pr-1 lg:pr-0  text-zinc-800 sm:hover:text-red-800"></ShoppingBagIcon>
                  <HeartIcon className="h-5 w-5 lg:h-6 pl-1 lg:w-6 lg:pl-0 text-zinc-800 sm:hover:text-red-800"></HeartIcon>
                </div>
              </div>
              <Link
                to={{
                  pathname: `/product/${product.productId}`,
                }}
              >
                <button
                  // to={`/product/${product.productId}`}
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
};
