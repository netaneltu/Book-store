import { Container } from "@chakra-ui/react";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import AddCategoryForm from "../../../components/Partial/categories/AddCategoryForm";

const AddCategory = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Category</title>
        <meta name="description" content="add category to panel" />
      </Helmet>

      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        <AddCategoryForm />
      </Container>
    </>
  );
};

export default AddCategory;
