import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormLabel,
  Input,
  Button,
  Spinner,
  Heading,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(categoryName);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/categories/managers/add-category`,
        { category_name: categoryName }
      );

      console.log("hi");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <Heading mb={"20px"}> הוסף קטגוריה</Heading>

      <Box onSubmit={handleSubmit} as="form">
        <FormLabel> שם הקטגוריה</FormLabel>
        <Input
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
          id="category_name"
          my="20px"
          placeholder="הכנס את שם הקטגוריה "
          aria-label="input for category name"
        />
        <Button type="submit" colorScheme="teal">
          הוסף קטגוריה
        </Button>
      </Box>
    </>
  );
};

export default AddCategoryForm;
