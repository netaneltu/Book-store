import React from "react";
import { useState } from "react";
import {
  FormLabel,
  Input,
  Button,
  Spinner,
  Heading,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

const EditCategoryForm = ( categoryData) => {
  console.log(categoryData.categoryId);
  const [categoryName, setCategoryName] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/managers/update-category/${categoryData.categoryId}`,
        { category_name: categoryName }
        );
        setMessage("שם הקטגוריה שונה")
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <Heading mb={"20px"}> ערוך קטגוריה</Heading>

      <Box onSubmit={handleSubmit} as="form">
        <FormLabel> {`שם הקטגוריה: ${categoryData.categoryData}`} </FormLabel>
        <Input
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
          id="category_name"
          my="20px"
          placeholder={categoryData.categoryData}
          aria-label="input for category name"
        />
        <Button type="submit" colorScheme="teal">
          ערוך קטגוריה
        </Button>
        { message && (<p>{message}</p>) }
      </Box>
    </>
  );
};

export default EditCategoryForm;
