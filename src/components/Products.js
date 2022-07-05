import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { useParams } from "react-router-dom";
import Example from "./Example";
import CartModal from "./CartModal";

export default function Products({ cat }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category] = useState(cat);
  const { pathCategory } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let res;
      if (category === "all") {
        res = await axios.get("https://bernyz.co.ke/api/products");
      } else {
        res = await axios.get(
          `https://bernyz.co.ke/api/products/categories/get?name=${pathCategory}`
        );
      }
      setProducts(res.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  //set selected product for modal from child component
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  //get current selected product
  const getSelectedProduct = (product) => {
    setSelectedProduct(product);
  }

  return (
    <div className=" sm:px-4 md:px-8 pt-16 grow bg-zinc-200">
      {/* <button onClick={() => (!isOpen ? setIsOpen(true) : setIsOpen(false))}>
        Open Modal
      </button> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 p-2 sm:p-4 md:p-8 bg-transparent">
        <Product getSelectedProduct={getSelectedProduct} isOpen={isOpen} setIsOpen={setIsOpen} products={products} loading={loading} />
      </div>
      {isOpen && <CartModal setIsOpen={setIsOpen} selectedProduct={selectedProduct} />}
    </div>

  );
}
