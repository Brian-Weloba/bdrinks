import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { useParams } from "react-router-dom";
import Example from "./Example";
import CartModal from "./CartModal";
import {ToastContainer, toast} from 'react-toastify';

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
        res = await axios.get("http://129.151.175.138:8081/products");
      } else {
        res = await axios.get(
          `http://129.151.175.138:8081/products/categories/get?name=${pathCategory}`
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

  function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    
    <div className=" sm:px-4 md:px-8 pt-24 grow bg-zinc-200">
      <h1 className="  text-white font-bold text-center sm:text-left px-6 py-2 text-2xl bg-gradient-to-r from-red-800 to-zinc-800 via-zinc-800  rounded-lg shadow-lg ">
        {category === "all" ? "All Products" : capitalizeFirstLetter(pathCategory)}
          </h1>
      
      {/* <button onClick={() => (!isOpen ? setIsOpen(true) : setIsOpen(false))}>
        Open Modal
      </button> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2 p-2 sm:p-4 md:p-8 bg-transparent">
        <Product getSelectedProduct={getSelectedProduct} isOpen={isOpen} setIsOpen={setIsOpen} products={products} loading={loading} />
      </div>
      {isOpen && <CartModal setIsOpen={setIsOpen} selectedProduct={selectedProduct} />}
    </div>

  );
}
