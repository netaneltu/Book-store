import React, { useState,useEffect } from "react";
import axios from "axios";

const allProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   const getAllProducts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/managers/all`
        );
console.log(data);
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts()
  }, []);
  return products;
};

export default allProducts;
