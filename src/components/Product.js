import {
  HeartIcon,
  ShoppingBagIcon,
  FavoriteIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { PlaceholderImage } from "./PlaceholderImage";
import { useCookies } from "react-cookie";

export default function Product({ products, loading }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const imageStyle = !imageLoaded ? { display: "none" } : {};
  const [show, setShow] = React.useState((state) => !state, true);
  //add cookies for favorites and cartItems
  const [cookies, setCookie] = useCookies(["favorites", "cartItems"]);

  const favorites = cookies.favorites;
  console.log(favorites);

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

      const addOrRemoveFavorites = (prod) => {
        //toggle favorite cookie
        const productId = prod.productId;
        //toggle favorite cookie
        const favorites = cookies.favorites;
        if (favorites === undefined) {
          setCookie("favorites", [productId], { path: "/" });
        } else {
          if (favorites.includes(productId)) {
            const newFavorites = favorites.filter((fav) => fav !== productId);
            setCookie("favorites", newFavorites, { path: "/" });
          }
          if (!favorites.includes(productId)) {
            const newFavorites = [...favorites, productId];
            setCookie("favorites", newFavorites, { path: "/" });
          }
        }
      };

      const addToCart = (prod) => {
        console.log(prod);
        if (cookies.cartItems === undefined || cookies.cartItems.length === 0) {
          setCookie(
            "cartItems",
            [
              {
                productName: prod.productName,
                productId: prod.productId,
                productOptionId: prod.defaultOption,
                productOptionPrice: optionPrice(),
                productOptionVolume: optionVolume(),
                productOptionQuantity: 1,
                productOptionImage: prod.productImage,
              },
            ],
            { path: "/" }
          );
        } else {
          const newCart = cookies.cartItems;
          const newProduct = newCart.find(
            (product) => product.productId === prod.productId
          );
          if (newProduct === undefined) {
            newCart.push({
              productName: prod.productName,
              productId: prod.productId,
              productOptionId: prod.defaultOption,
              productOptionPrice: optionPrice(),
              productOptionVolume: optionVolume(),
              productOptionQuantity: 1,
              productOptionImage: prod.productImage,
            });
          } else {
            newProduct.productOptionQuantity += 1;
          }
          setCookie("cartItems", newCart, { path: "/" });
        }
      };

      // if (cookies.cartItems === undefined || cookies.cartItems.length === 0) {
      //   setCookie(
      //     "cartItems",
      //     [
      //       {
      //         productId: product.productId,
      //         productOptionId: product.defaultOption,
      //         productOptionPrice: optionPrice(),
      //         productOptionVolume: optionVolume(),
      //         productOptionQuantity: 1,
      //       },
      //     ],
      //     { path: "/" }
      //   );
      // } else {
      //   const newCart = cookies.cartItems;
      //   newCart.push({
      //     productId: product.productId,
      //     productOptionId: product.defaultOption,
      //     productOptionPrice: optionPrice(),
      //     productOptionVolume: optionVolume(),
      //     productOptionQuantity: 1,
      //   });
      //   setCookie("cartItems", newCart, { path: "/" });
      // }

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
              <h5 className="truncate text-gray-900 text-base font-semibold mb-2 h-max">
                {product.productName} - {optionVolume()}
              </h5>
              <div className="flex flex-col xl:flex-row justify-between">
                <p className="text-red-700 text-base  font-medium mb-4 text-center">
                  KES {optionPrice()}
                </p>
                <div className="flex justify-evenly mb-4">
                  <ShoppingBagIcon
                    className=" h-6 w-6 pr-1 lg:pr-0  text-zinc-800 sm:hover:text-red-800"
                    onClick={() => {
                      addToCart(product);
                    }}
                  ></ShoppingBagIcon>
                  {cookies.favorites !== undefined &&
                    cookies.favorites.includes(product.productId) && (
                      <HeartIconSolid
                        className="h-6 w-6  lg:pl-0 text-red-800 sm:hover:text-red-800"
                        onClick={() => {
                          addOrRemoveFavorites(product);
                        }}
                      ></HeartIconSolid>
                    )}
                  {cookies.favorites !== undefined &&
                    cookies.favorites.includes(product.productId) === false && (
                      <HeartIcon
                        className="h-6 w-6  pl-1  lg:pl-0 text-zinc-800 sm:hover:text-red-800"
                        onClick={() => {
                          addOrRemoveFavorites(product);
                        }}
                      ></HeartIcon>
                    )}

                  {cookies.favorites === undefined && (
                    <HeartIcon
                      className="h-6 w-6  pl-1  lg:pl-0 text-zinc-800 sm:hover:text-red-800"
                      onClick={() => {
                        addOrRemoveFavorites(product);
                      }}
                    ></HeartIcon>
                  )}
                  {/* <HeartIcon
                    className="h-6 w-6 lg:h-7 pl-1 lg:w-7 lg:pl-0 text-zinc-800 sm:hover:text-red-800"
                    onClick={() => {
                      addOrRemoveFavorites(product);
                    }}
                  ></HeartIcon> */}
                </div>
              </div>
              <Link
                className=" flex flex-col"
                to={{
                  pathname: `/product/${product.productId}`,
                }}
              >
                <button
                  // to={`/product/${product.productId}`}
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-red-800 text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out text-base md:text-lg"
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
}
