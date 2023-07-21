import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FormLabel,
  VStack,
  Container,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  Input,
  Button,
  Spinner,
  Image,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const AddProductForm = ({ categories }) => {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();

  const [values, setValues] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: "",
    categories: [],
  });
  const handleChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    console.log("hi");
    reader.onloadend = () => {
      const base64String = reader.result;
      setValues({ ...values, product_image: base64String });
    };
    reader.readAsDataURL(file);
    console.log(reader.result);
  };
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/products/managers/add`,
        {product_name: values.product_name,
          product_description: values.product_description,
          product_price: values.product_price,
          product_image: values.product_image,
          categories: JSON.stringify(values.categories) }
      );

      console.log("success");
    } catch (error) {
      console.log(error.response);
      console.log(values);
    }
  };
  return (
    <>
      <Container borderRadius={20} mt={20} p={15}>
        <VStack
          rowGap={5}
          borderRadius={20}
          // w="90%"
          h="90%"
          bg="gray.200"
          alignItems="self-center"
          p={10}
        >
          <VStack>
            <Heading>הוסף מוצר</Heading>
          </VStack>
          <FormControl>
            <form>
              <SimpleGrid rowGap={6}>
                <GridItem colSpan={1}>
                  <FormLabel>שם המוצר</FormLabel>
                  <Input
                    onChange={handleChangeInput}
                    type="text"
                    id="product_name"
                    name="product_name"
                    variant="filled"
                    placeholder="הזן את שם המוצר"
                    // isInvalid={emailIsError}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormLabel>תיאור המוצר</FormLabel>
                  <Input
                    onChange={handleChangeInput}
                    type="text"
                    id="product_description"
                    name="product_description"
                    variant="filled"
                    placeholder="הזן תיאור המוצר"
                    // isInvalid={emailIsError}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormLabel>מחיר המוצר</FormLabel>
                  <Input
                    onChange={handleChangeInput}
                    type="number"
                    id="product_price"
                    name="product_price"
                    variant="filled"
                    placeholder="הזן מחיר המוצר"
                  />
                </GridItem>
                
                <GridItem colSpan={1}>
                  {values.product_image && (
                    <Image boxSize="80px" src={values.product_image} />
                  )}
                  <FormLabel> תמונה של המוצר</FormLabel>
                  <Input
                    id="product_image"

                    my="20px"
                    type="file"
                    variant="filled"
                    aria-label="input for product image"
                    onChange={handleFileChange}
                  />
                </GridItem>

                <GridItem colSpan={1}>
                  <FormLabel> בחר קטגוריות של המוצר </FormLabel>
                </GridItem>

                <Button
                  onClick={submithandler}
                  maxW={["70%", "80%", "90%", "100%"]}
                  bg="lightblue"
                  type="submit"
                >
                  הוסף מוצר
                </Button>

                <Text fontSize="md" color="red">
                  {message}
                </Text>

                {loading && (
                  <Spinner
                    alignSelf="center"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="md"
                  />
                )}
              </SimpleGrid>
            </form>
          </FormControl>
        </VStack>
      </Container>
    </>
  );
};

export default AddProductForm;
