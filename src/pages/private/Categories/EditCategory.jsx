import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Container } from "@chakra-ui/react";
import EditCategoryForm from "../../../components/Partial/categories/EditCategoryForm ";

const EditCategory = () => {
  <Helmet>
  <meta charSet="utf-8" />
  <title>Add Category</title>
  <meta name="description" content="edit category  " />
</Helmet>

  const { state } = useLocation();

  const [categoryData, setCategoryData] = useState(null);

  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Category</title>
        <meta name="description" content="Edit category" />
      </Helmet>

      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <EditCategoryForm categoryId={state} categoryData={categoryData} />
      </Container>
    </>
  );
};

export default EditCategory;
