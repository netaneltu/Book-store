import React, { useState,useEffect } from "react";
import axios from "axios";

const allCategoris = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
   const getAllCategoris = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`
        );
console.log(data);
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategoris()
  }, []);
  return categories;
};

export default allCategoris;
