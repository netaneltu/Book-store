import { Container } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AddProductForm from "../../../components/Partial/products/AddProductForm";
import { Helmet } from "react-helmet";
import axios from "axios";

const AddProduct = () => {
  <Helmet>
  <meta charSet="utf-8" />
  <title>Add Category</title>
  <meta name="description" content="add product to panel" />
</Helmet>



  const [categories, setCategories] = useState([]);
 
  
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`
        );
        setCategories(data.categories);
        console.log(data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Product</title>
        <meta name="description" content="add product to panel" />
      </Helmet>

      <Container
        maxW={["98%", "87%", "80%", "70%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <AddProductForm categoriesData={categories} />
      </Container>
    </>
  );
};

export default AddProduct;
