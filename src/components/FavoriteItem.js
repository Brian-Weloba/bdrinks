import React from "react";
import { PlaceholderImage } from "./PlaceholderImage";
import QuantitySelector from "./QuantitySelector";
import { ShoppingBagIcon, HeartIcon, XIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const FavoriteItem = ({ favorites, setFavorites }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["favorites"]);

  function removeFromFavorites(product) {
    console.log(cookies.favorites);
    let newFavorites = favorites.filter(
      (fav) => fav.productId !== product.productId
    );
    setFavorites(newFavorites);
    //get the product id of elements in new favorites
    let newFavoritesIds = newFavorites.map((fav) => fav.productId);
    removeCookie("favorites");
    setCookie("favorites", newFavoritesIds, { path: "/" });
  }

  return favorites.map(function (product, index) {
    const Options = product.productOptions;
    console.log("Opt", Options);

    const opt = Options.find(
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
      <div
        className="grid col-span-1 grid-cols-1 bg-white border-2 border-zinc-300"
        key={index}
      >
        <a href="#!" className="">
          {/* <PlaceholderImage /> */}
          <img
            src={process.env.PUBLIC_URL + "/assets/" + product.productImage}
            alt=""
          />
        </a>

        <div className="p-2 grid grid-rows-5 row-span-1">
          <h5 className=" truncate text-gray-900 text-base md:text-lg lg:text-base font-semibold mb-2 row-span-1">
            {product.productName} - {optionVolume()}
          </h5>

          <div className="row-span-3">
            <p className="text-red-700 text-base md:text-lg font-medium mb-4 ">
              {/* KES {optionPrice()}  */}
              {Options.map((option) => (
                <span key={option.productOptionId}>
                  {option.optionVolume} @ KES{" "}
                  {option.productOptionPrice
                    .toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}{" "}
                  <br />
                </span>
              ))}
            </p>
            {/* <div className="flex justify-evenly mb-4">
                   <ShoppingBagIcon
                    className=" h-6 w-6 pr-1 lg:pr-0  text-zinc-800 sm:hover:text-red-800"
                    onClick={() => {
                      getSelectedProduct(product);
                      //if isopen is false, open the modal
                      if (!isOpen) {
                        setIsOpen(true);
                      }else{
                        setIsOpen(false);
                      }
                    }}
                  ></ShoppingBagIcon> 

                </div> */}
          </div>
          <div className="grid grid-cols-2 row-span-1 ">
            <button
              type="button"
              className=" col-span-1  border-2 border-red-800 text-red-800 hover:text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-red-800  hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out text-base md:text-lg"
            >
              View
            </button>
            <Link
              className="grid grid-cols-1 col-span-1"
              to={{
                pathname: `/product/${product.productId}`,
              }}
            >
              <button
                type="button"
                className="col-span-1 border-2 border-red-800 text-red-800 hover:text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-red-800  hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out text-base md:text-lg"
              >
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  });
};
