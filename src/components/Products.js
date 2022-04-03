import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./Product";
import { useParams } from "react-router-dom";

export default function Products({ cat }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category] = useState(cat);
  const {pathCategory} = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let res;
      if (category === "all") {
        res = await axios.get("https://bernyz.co.ke/api/products");
      } else {
        res = await axios.get(
          `http://localhost:8081/api/products/categories/get?name=${pathCategory}`
        );
      }
      setProducts(res.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className=" sm:p-4 md:p-8 grow bg-zinc-200">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 p-2 sm:p-4 md:p-8 bg-transparent">
        <Product products={products} loading={loading} />
      </div>
    </div>
  );
}
