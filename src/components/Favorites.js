import React from "react";
import { FavoriteItem } from "./FavoriteItem";
import Product from "./Product";

export const Favorites = () => {
  return (
    <div className=" sm:px-4 md:px-8 pt-16 grow bg-zinc-200">
      <h1 className="  text-red-800 font-bold text-center sm:text-left ml-6 text-4xl py-10  bg-transparent">
        Favorites
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2 p-2 sm:p-4 md:p-8 bg-transparent">
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
      </div>
    </div>
  );
};
