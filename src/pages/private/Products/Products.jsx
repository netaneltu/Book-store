import React from "react";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import ProductsTable from "../../../components/Partial/products/ProductsTable";

const products = () => {
  <Helmet>
  <meta charSet="utf-8" />
  <title>Add Category</title>
  <meta name="description" content="products" />
</Helmet>

  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/managers/all`
        );
        setProducts(data.products);
        console.log(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);

  
  return (
    <>
      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <Heading mb="10px">רשימת מוצרים</Heading>
        <ProductsTable  productsData={products } />
      </Container>
    </>
  );
};

export default products;
