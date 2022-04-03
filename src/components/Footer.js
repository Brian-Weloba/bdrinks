import React from "react";
import ItemsContainer from "./ItemsContainer";

function Footnote() {
  return (
    <div className="text-center">
      <p className=" text-sm sm:text-base pb-2">© 2022 Berny'z Liquor Store All Rights Reserved.</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white h8">
      <ItemsContainer />
      <Footnote />
    </footer>
  );
}
