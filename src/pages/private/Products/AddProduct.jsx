import { Container } from "@chakra-ui/react";
import React, { useState } from "react";
import AddProductForm from "../../../components/Partial/products/AddProductForm";
import { Helmet } from "react-helmet";

const AddProduct = () => {
  const [categories, setCategories] = useState();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Product</title>
        <meta name="description" content="add product to panel" />
      </Helmet>

      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <AddProductForm categories={categories} />
      </Container>
    </>
  );
};

export default AddProduct;
