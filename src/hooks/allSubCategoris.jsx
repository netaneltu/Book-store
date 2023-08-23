import React, { useState,useEffect } from "react";
import axios from "axios";

const allSubCategoris = () => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
   const getAllSubCategoris = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/allsub`
        );
console.log(data);
setSubCategories(data.subcategories);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSubCategoris()
  }, []);
  console.log(subCategories);
  return subCategories;
};

export default allSubCategoris;
