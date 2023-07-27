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
import CategoriesTable from "../../../components/Partial/categories/CtegoriesTable";

const Categories = () => {
  <Helmet>
  <meta charSet="utf-8" />
  <title>Add Category</title>
  <meta name="description" content="categoris" />
</Helmet>

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`
        );
        setCategories(data.categories);
        
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);
  return (
    <>
      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <Heading mb="10px">רשימת קטגוריות</Heading>
        <CategoriesTable categoriesData={categories} />
      </Container>
    </>
  );
};

export default Categories;
