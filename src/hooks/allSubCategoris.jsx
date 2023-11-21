import React, { useState,useEffect } from "react";
import axios from "axios";

const allSubCategoris = () => {
  const [subCategories, setSubCategories] = useState([]);


const compare=(a,b)=>{
   if ( a.category_name < b.category_name ){
    return -1;
  }
  if ( a.category_name > b.category_name ){
    return 1;
  }
  return 0;

}
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
  
  subCategories.sort(compare)
  
  console.log(subCategories);

  return subCategories;
};

export default allSubCategoris;
