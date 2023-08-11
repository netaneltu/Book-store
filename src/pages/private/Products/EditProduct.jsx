import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Container } from "@chakra-ui/react";
import EditProductForm from "../../../components/Partial/products/EditProductForm ";

const EditProduct = () => {
  <Helmet>
  <meta charSet="utf-8" />
  <title>Edit Product</title>
  <meta name="description" content="edit product" />
</Helmet>

  const { state } = useLocation();
 
  

  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Product</title>
        <meta name="description" content="Edit product" />
      </Helmet>

      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <EditProductForm  productData={state} />
      </Container>
    </>
  );
};

export default EditProduct;
